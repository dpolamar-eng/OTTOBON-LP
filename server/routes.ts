import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { google } from 'googleapis';

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

// Google Sheets configuration
const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID || '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms';
const SHEET_NAME = 'EnrollmentData';

// Helper function to authenticate with Google Sheets
async function getGoogleSheetsAuth() {
  try {
    // Use service account key from environment variable
    const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
    if (!serviceAccountKey) {
      console.warn('Google Service Account Key not found. Using demo spreadsheet.');
      return null;
    }

    const credentials = JSON.parse(serviceAccountKey);
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    return await auth.getClient();
  } catch (error) {
    console.error('Error authenticating with Google Sheets:', error);
    return null;
  }
}

// Helper function to append data to Google Sheets
async function appendToGoogleSheets(enrollmentData: EnrollmentData) {
  try {
    const auth = await getGoogleSheetsAuth();
    if (!auth) {
      console.log('Google Sheets authentication failed, skipping sheet update');
      return;
    }

    const sheets = google.sheets({ version: 'v4', auth });
    
    // Prepare row data
    const timestamp = new Date().toISOString();
    const interests = enrollmentData.interests.join(', ');
    const suggestedCourses = enrollmentData.assessmentResults?.suggestedCourses?.join(', ') || 'N/A';
    const topCourseMatches = enrollmentData.assessmentResults?.courseMatches 
      ? Object.entries(enrollmentData.assessmentResults.courseMatches)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 3)
          .map(([course, score]) => `${course}: ${score}%`)
          .join(', ')
      : 'N/A';

    const rowData = [
      timestamp,
      enrollmentData.firstName,
      enrollmentData.lastName,
      enrollmentData.email,
      enrollmentData.phone || 'N/A',
      enrollmentData.currentRole,
      enrollmentData.education,
      enrollmentData.experience,
      interests,
      enrollmentData.referral || 'N/A',
      enrollmentData.assessmentResults?.discountEligibility || 'N/A',
      suggestedCourses,
      topCourseMatches,
      JSON.stringify(enrollmentData.assessmentResults?.traits || {})
    ];

    // Check if sheet exists, if not create it with headers
    try {
      await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A1`,
      });
    } catch (error) {
      // Sheet doesn't exist, create it with headers
      const headers = [
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

      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A1:N1`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [headers],
        },
      });
    }

    // Append the new data
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:N`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [rowData],
      },
    });

    console.log('Successfully added enrollment data to Google Sheets');
  } catch (error) {
    console.error('Error updating Google Sheets:', error);
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
      
      // Add to Google Sheets
      await appendToGoogleSheets(enrollmentData);
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return res.status(200).json({ 
        message: 'Enrollment submitted successfully',
        success: true,
        spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}`
      });
    } catch (error) {
      console.error('Error processing enrollment:', error);
      return res.status(500).json({ 
        message: 'An error occurred while processing your request',
        success: false
      });
    }
  });

  // API endpoint to get spreadsheet URL
  app.get('/api/spreadsheet-url', async (req, res) => {
    try {
      return res.status(200).json({
        success: true,
        spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}`,
        message: 'This spreadsheet contains all enrollment data with assessment results'
      });
    } catch (error) {
      console.error('Error getting spreadsheet URL:', error);
      return res.status(500).json({ 
        message: 'An error occurred while getting spreadsheet URL',
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
