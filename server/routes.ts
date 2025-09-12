import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import * as fs from 'fs';
import * as path from 'path';

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
  // Assessment results
  assessmentResults?: {
    courseMatches?: Record<string, number>;
    discountEligibility?: number;
    suggestedCourses?: string[];
    traits?: Record<string, number>;
  };
}

// Local CSV file configuration
const CSV_FILE_PATH = path.join(process.cwd(), 'enrollment-data.csv');
const HEADERS = [
  'Timestamp',
  'First Name',
  'Last Name', 
  'Email',
  'Phone',
  'Current Role',
  'Education',
  'Experience',
  'Interests',
  'Referral Source',
  'Discount Eligibility (%)',
  'Suggested Courses',
  'Top Course Matches',
  'Assessment Traits'
];

// Helper function to ensure CSV file exists with headers
function ensureCSVFile() {
  try {
    if (!fs.existsSync(CSV_FILE_PATH)) {
      // Create file with headers
      fs.writeFileSync(CSV_FILE_PATH, HEADERS.join(',') + '\n', 'utf8');
      console.log('Created new enrollment data CSV file');
    }
  } catch (error) {
    console.error('Error creating CSV file:', error);
  }
}

// Helper function to escape CSV values
function escapeCSVValue(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

// Helper function to append data to CSV file
async function appendToCSV(enrollmentData: EnrollmentData) {
  try {
    // Ensure CSV file exists
    ensureCSVFile();
    
    // Prepare row data
    const timestamp = new Date().toISOString();
    const interests = enrollmentData.interests.join('; ');
    const suggestedCourses = enrollmentData.assessmentResults?.suggestedCourses?.join('; ') || 'N/A';
    const topCourseMatches = enrollmentData.assessmentResults?.courseMatches 
      ? Object.entries(enrollmentData.assessmentResults.courseMatches)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 3)
          .map(([course, score]) => `${course}: ${score}%`)
          .join('; ')
      : 'N/A';

    const rowData = [
      escapeCSVValue(timestamp),
      escapeCSVValue(enrollmentData.firstName),
      escapeCSVValue(enrollmentData.lastName),
      escapeCSVValue(enrollmentData.email),
      escapeCSVValue(enrollmentData.phone || 'N/A'),
      escapeCSVValue(enrollmentData.currentRole),
      escapeCSVValue(enrollmentData.education),
      escapeCSVValue(enrollmentData.experience),
      escapeCSVValue(interests),
      escapeCSVValue(enrollmentData.referral || 'N/A'),
      escapeCSVValue(String(enrollmentData.assessmentResults?.discountEligibility || 'N/A')),
      escapeCSVValue(suggestedCourses),
      escapeCSVValue(topCourseMatches),
      escapeCSVValue(JSON.stringify(enrollmentData.assessmentResults?.traits || {}))
    ];

    // Append the new row to CSV file
    const csvRow = rowData.join(',') + '\n';
    fs.appendFileSync(CSV_FILE_PATH, csvRow, 'utf8');

    console.log('Successfully added enrollment data to CSV file');
  } catch (error) {
    console.error('Error updating CSV file:', error);
  }
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
      
      // Log enrollment data
      console.log('Enrollment submission received:', enrollmentData);
      
      // Add to CSV file
      await appendToCSV(enrollmentData);
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return res.status(200).json({ 
        message: 'Enrollment submitted successfully',
        success: true,
        csvFilePath: CSV_FILE_PATH,
        message2: 'Data saved to local CSV file in project root directory'
      });
    } catch (error) {
      console.error('Error processing enrollment:', error);
      return res.status(500).json({ 
        message: 'An error occurred while processing your request',
        success: false
      });
    }
  });

  // API endpoint to get CSV file info
  app.get('/api/csv-file-info', async (req, res) => {
    try {
      ensureCSVFile();
      return res.status(200).json({
        success: true,
        csvFilePath: CSV_FILE_PATH,
        relativePath: './enrollment-data.csv',
        message: 'This CSV file contains all enrollment data with assessment results'
      });
    } catch (error) {
      console.error('Error getting CSV file info:', error);
      return res.status(500).json({ 
        message: 'An error occurred while getting CSV file info',
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
