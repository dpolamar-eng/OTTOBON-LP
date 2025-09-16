
import { Client } from 'pg';
import * as fs from 'fs';
import * as path from 'path';

async function runMigrations() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  const client = new Client({
    connectionString: databaseUrl,
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL database');

    // Read and execute the migration file
    const migrationPath = path.join(__dirname, 'migrations', 'create-applications-table.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    
    await client.query(migrationSQL);
    console.log('Applications table created successfully');
    
    // Verify the table exists
    const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'applications'
    `);
    
    if (result.rows.length > 0) {
      console.log('✅ Applications table verified');
    } else {
      console.log('❌ Applications table not found');
    }
    
  } catch (error) {
    console.error('Migration error:', error);
    throw error;
  } finally {
    await client.end();
  }
}

// Check if this file is being run directly
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (process.argv[1] === __filename) {
  runMigrations()
    .then(() => {
      console.log('Migration completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Migration failed:', error);
      process.exit(1);
    });
}

export { runMigrations };
