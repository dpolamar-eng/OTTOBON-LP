import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Test database connection at startup
async function testDatabaseConnection() {
  try {
    console.log('🔍 Testing database connection...');
    
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is missing');
    }
    
    console.log('✅ DATABASE_URL is set');
    
    // Import and test database connection
    const { db } = await import("./database");
    
    // Simple test query
    await db.execute('SELECT 1 as test');
    console.log('✅ Database connection successful');
    
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    console.error('📝 Available environment variables:', Object.keys(process.env).filter(key => key.includes('PG') || key.includes('DATABASE')));
    return false;
  }
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  try {
    console.log('🚀 Starting Ottobon Academy server...');
    
    // Test database connection first
    const dbConnected = await testDatabaseConnection();
    if (!dbConnected) {
      console.warn('⚠️ Database connection failed, but continuing startup...');
    }

    // Add health check endpoint before other routes
    app.get('/health', async (req, res) => {
      try {
        const { db } = await import("./database");
        await db.execute('SELECT 1 as health_check');
        res.json({ 
          status: 'healthy', 
          database: 'connected',
          timestamp: new Date().toISOString(),
          environment: process.env.NODE_ENV || 'development'
        });
      } catch (error) {
        res.status(503).json({ 
          status: 'unhealthy', 
          database: 'disconnected',
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString()
        });
      }
    });

    const server = await registerRoutes(app);
    console.log('✅ Routes registered successfully');

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      
      console.error('💥 Server error:', {
        status,
        message,
        stack: err.stack,
        url: _req.url,
        method: _req.method
      });

      res.status(status).json({ message });
    });

    // importantly only setup vite in development and after
    // setting up all the other routes so the catch-all route
    // doesn't interfere with the other routes
    if (app.get("env") === "development") {
      await setupVite(app, server);
      console.log('✅ Vite development server configured');
    } else {
      serveStatic(app);
      console.log('✅ Static files configured for production');
    }

    // ALWAYS serve the app on port 5000
    // this serves both the API and the client.
    // It is the only port that is not firewalled.
    const port = 5000;
    server.listen({
      port,
      host: "0.0.0.0",
      reusePort: true,
    }, () => {
      console.log('🎉 Server startup complete!');
      console.log(`📡 Server listening on http://0.0.0.0:${port}`);
      console.log(`🔗 Health check: http://0.0.0.0:${port}/health`);
      console.log(`🌐 Public URL: https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`);
      log(`serving on port ${port}`);
    });

  } catch (error) {
    console.error('💥 Failed to start server:', error);
    process.exit(1);
  }
})();
