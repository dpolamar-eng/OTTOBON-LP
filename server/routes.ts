
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import * as fs from 'fs';
import * as path from 'path';
import { insertEnrollment, getAllEnrollments, insertApplication, getApplicationByEmail, getAllApplications } from './database';
import type { InsertEnrollment, InsertApplication } from '../shared/schema';

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

// Predefined data for the new API endpoints
const INTEREST_AREAS = [
  "AI for UI/UX Designer",
  "AI in Marketing", 
  "AI Agent Development",
  "AI Data Labeling"
];

const SKILLS_BY_CATEGORY = {
  "Technical Skills": ["JavaScript", "Python", "React", "Node.js", "HTML/CSS", "TypeScript"],
  "Soft Skills": ["Communication", "Leadership", "Problem Solving"],
  "Industry Knowledge": ["Digital Marketing", "Data Analysis"]
};

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
  // NEW API ENDPOINTS FOR APPLICATIONS

  // GET /api/interest-areas - Return predefined interest areas
  app.get('/api/interest-areas', (req, res) => {
    try {
      res.json({
        success: true,
        data: INTEREST_AREAS
      });
    } catch (error) {
      console.error('Error fetching interest areas:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching interest areas'
      });
    }
  });

  // GET /api/skills - Return predefined skills grouped by category
  app.get('/api/skills', (req, res) => {
    try {
      res.json({
        success: true,
        data: SKILLS_BY_CATEGORY
      });
    } catch (error) {
      console.error('Error fetching skills:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching skills'
      });
    }
  });

  // POST /api/submit-application - Submit application to PostgreSQL
  app.post('/api/submit-application', async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        phone,
        currentRole,
        educationBackground,
        yearsExperience,
        areasOfInterest,
        skills
      } = req.body;

      // Input validation
      if (!firstName || !lastName || !email || !currentRole || !educationBackground || !yearsExperience) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields: firstName, lastName, email, currentRole, educationBackground, yearsExperience'
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid email format'
        });
      }

      // Validate arrays
      if (!Array.isArray(areasOfInterest) || areasOfInterest.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'At least one area of interest must be selected'
        });
      }

      if (!Array.isArray(skills) || skills.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'At least one skill must be selected'
        });
      }

      // Check for duplicate email
      const existingApplication = await getApplicationByEmail(email);
      if (existingApplication) {
        return res.status(409).json({
          success: false,
          message: 'An application with this email already exists'
        });
      }

      // Prepare application data
      const applicationData: InsertApplication = {
        firstName,
        lastName,
        email,
        phone: phone || null,
        currentRole,
        educationBackground,
        yearsExperience,
        areasOfInterest,
        skills
      };

      // Insert into database
      const savedApplication = await insertApplication(applicationData);

      res.status(201).json({
        success: true,
        message: 'Application submitted successfully',
        applicationId: savedApplication.id,
        data: savedApplication
      });

    } catch (error) {
      console.error('Error submitting application:', error);
      res.status(500).json({
        success: false,
        message: 'An error occurred while submitting your application. Please try again.'
      });
    }
  });

  // GET /api/applications - Get all applications (admin endpoint)
  app.get('/api/applications', async (req, res) => {
    try {
      const applications = await getAllApplications();
      res.json({
        success: true,
        data: applications,
        count: applications.length
      });
    } catch (error) {
      console.error('Error fetching applications:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching applications'
      });
    }
  });

  // EXISTING ENDPOINTS (kept for backwards compatibility)

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
      
      // Prepare data for database insertion
      const dbData: InsertEnrollment = {
        firstName: enrollmentData.firstName,
        lastName: enrollmentData.lastName,
        email: enrollmentData.email,
        phone: enrollmentData.phone || null,
        currentRole: enrollmentData.currentRole,
        education: enrollmentData.education,
        experience: enrollmentData.experience,
        interests: enrollmentData.interests,
        referral: enrollmentData.referral || null,
        consent: enrollmentData.consent,
        assessmentResults: enrollmentData.assessmentResults || null,
      };

      // Save to PostgreSQL database
      const savedEnrollment = await insertEnrollment(dbData);
      
      // Also save to CSV file as backup
      await appendToCSV(enrollmentData);
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return res.status(200).json({ 
        message: 'Enrollment submitted successfully',
        success: true,
        enrollmentId: savedEnrollment.id,
        csvFilePath: CSV_FILE_PATH,
        message2: 'Data saved to PostgreSQL database and local CSV file'
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

  // API endpoint to get all enrollments from database
  app.get('/api/enrollments', async (req, res) => {
    try {
      const enrollments = await getAllEnrollments();
      return res.status(200).json({
        success: true,
        enrollments: enrollments,
        count: enrollments.length,
        message: 'Enrollments retrieved successfully from PostgreSQL database'
      });
    } catch (error) {
      console.error('Error getting enrollments:', error);
      return res.status(500).json({ 
        message: 'An error occurred while retrieving enrollments',
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
