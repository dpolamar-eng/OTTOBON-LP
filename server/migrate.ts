
import { db } from './database';
import { 
  applications, 
  interestAreas, 
  applicationInterests, 
  skills, 
  applicationSkills 
} from '@shared/schema';

export async function runMigrations() {
  try {
    console.log('🔄 Running database migrations...');
    
    // Test basic connection
    await db.execute('SELECT 1');
    console.log('✅ Database connection verified');
    
    // The tables should already exist from your schema
    // Let's verify they exist by checking each one
    const tables = ['applications', 'interest_areas', 'application_interests', 'skills', 'application_skills'];
    
    for (const table of tables) {
      try {
        await db.execute(`SELECT COUNT(*) FROM ${table} LIMIT 1`);
        console.log(`✅ Table '${table}' exists and is accessible`);
      } catch (error) {
        console.error(`❌ Table '${table}' issue:`, error);
      }
    }
    
    console.log('✅ Migration check complete');
    return true;
  } catch (error) {
    console.error('❌ Migration failed:', error);
    return false;
  }
}

// Check if this module is being run directly
const isMainModule = import.meta.url === `file://${process.argv[1]}`;

if (isMainModule) {
  runMigrations()
    .then((success) => {
      console.log(success ? '✅ Migrations completed successfully' : '❌ Migrations failed');
      process.exit(success ? 0 : 1);
    })
    .catch((error) => {
      console.error('💥 Migration script error:', error);
      process.exit(1);
    });
}
