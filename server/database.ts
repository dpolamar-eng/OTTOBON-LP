
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import { enrollments, applications, type InsertEnrollment, type InsertApplication } from '../shared/schema';
import { eq } from 'drizzle-orm';

let db: ReturnType<typeof drizzle> | null = null;

export async function getDatabase() {
  if (!db) {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error('DATABASE_URL environment variable is not set');
    }

    const client = new Client({
      connectionString: databaseUrl,
    });

    await client.connect();
    db = drizzle(client);
  }
  return db;
}

export async function insertEnrollment(enrollmentData: InsertEnrollment) {
  const database = await getDatabase();
  
  try {
    const [result] = await database
      .insert(enrollments)
      .values(enrollmentData)
      .returning();
    
    console.log('Successfully inserted enrollment:', result.id);
    return result;
  } catch (error) {
    console.error('Error inserting enrollment:', error);
    throw error;
  }
}

export async function getAllEnrollments() {
  const database = await getDatabase();
  
  try {
    const results = await database.select().from(enrollments);
    return results;
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    throw error;
  }
}

// New functions for applications table
export async function insertApplication(applicationData: InsertApplication) {
  const database = await getDatabase();
  
  try {
    const [result] = await database
      .insert(applications)
      .values(applicationData)
      .returning();
    
    console.log('Successfully inserted application:', result.id);
    return result;
  } catch (error) {
    console.error('Error inserting application:', error);
    throw error;
  }
}

export async function getApplicationByEmail(email: string) {
  const database = await getDatabase();
  
  try {
    const [result] = await database
      .select()
      .from(applications)
      .where(eq(applications.email, email));
    
    return result;
  } catch (error) {
    console.error('Error fetching application by email:', error);
    throw error;
  }
}

export async function getAllApplications() {
  const database = await getDatabase();
  
  try {
    const results = await database.select().from(applications);
    return results;
  } catch (error) {
    console.error('Error fetching applications:', error);
    throw error;
  }
}
