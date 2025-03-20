import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

// This is a simple interface for enrollment data
interface EnrollmentData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  currentRole: string;
  education: string;
  experience: string;
  interests: string[];
  referral: string;
  consent: boolean;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint to handle enrollment form submissions
  app.post('/api/enroll', async (req, res) => {
    try {
      const enrollmentData: EnrollmentData = req.body;
      
      // Validate required fields
      if (!enrollmentData.firstName || !enrollmentData.lastName || !enrollmentData.email) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
      
      // In a real app, we would store this in a database
      // For this example, we'll just log it and return success
      console.log('Enrollment submission received:', enrollmentData);
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return res.status(200).json({ 
        message: 'Enrollment submitted successfully',
        success: true
      });
    } catch (error) {
      console.error('Error processing enrollment:', error);
      return res.status(500).json({ 
        message: 'An error occurred while processing your request',
        success: false
      });
    }
  });

  // API endpoint to handle assessment submissions 
  app.post('/api/assessment', async (req, res) => {
    try {
      const assessmentData = req.body;
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Return mock assessment results
      return res.status(200).json({
        success: true,
        results: {
          technicalAptitude: 82,
          problemSolving: 75,
          clientCommunication: 68,
          recommendedPaths: [
            { name: 'AI Consulting – Generative AI Solutions', type: 'primary' },
            { name: 'Business Applications – Salesforce CX', type: 'secondary' }
          ],
          scholarshipEligible: true,
          scholarshipAmount: '25%'
        }
      });
    } catch (error) {
      console.error('Error processing assessment:', error);
      return res.status(500).json({ 
        message: 'An error occurred while processing your request',
        success: false
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
