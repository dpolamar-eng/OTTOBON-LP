
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import { enrollments, type InsertEnrollment } from '../shared/schema';

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
    const result = await database
      .insert(enrollments)
      .values([enrollmentData as typeof enrollments.$inferInsert])
      .returning();
    
    console.log('Successfully inserted enrollment:', result[0].id);
    return result[0];
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
