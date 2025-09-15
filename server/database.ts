
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { 
  applications, 
  interestAreas, 
  applicationInterests, 
  skills, 
  applicationSkills 
} from '@shared/schema';
import { eq, inArray } from 'drizzle-orm';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

const client = postgres(process.env.DATABASE_URL);
export const db = drizzle(client);

export interface ApplicationSubmission {
  basicInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };
  experience: {
    currentRole?: string;
    educationBackground?: string;
    yearsExperience?: string;
  };
  preferences: {
    areasOfInterest: string[];
    howHeardAboutUs?: string;
    privacyConsent: boolean;
  };
  skills: string[];
}

export async function submitApplication(data: ApplicationSubmission) {
  return await db.transaction(async (tx) => {
    // Insert main application
    const [application] = await tx.insert(applications).values({
      firstName: data.basicInfo.firstName,
      lastName: data.basicInfo.lastName,
      email: data.basicInfo.email,
      phone: data.basicInfo.phone,
      currentRole: data.experience.currentRole,
      educationBackground: data.experience.educationBackground,
      yearsExperience: data.experience.yearsExperience,
      howHeardAboutUs: data.preferences.howHeardAboutUs,
      privacyConsent: data.preferences.privacyConsent,
    }).returning();

    // Handle interest areas
    if (data.preferences.areasOfInterest.length > 0) {
      const existingInterests = await tx.select()
        .from(interestAreas)
        .where(inArray(interestAreas.name, data.preferences.areasOfInterest));

      const interestInserts = existingInterests.map(interest => ({
        applicationId: application.id,
        interestAreaId: interest.id,
      }));

      if (interestInserts.length > 0) {
        await tx.insert(applicationInterests).values(interestInserts);
      }
    }

    // Handle skills
    if (data.skills.length > 0) {
      const existingSkills = await tx.select()
        .from(skills)
        .where(inArray(skills.name, data.skills));

      const skillInserts = existingSkills.map(skill => ({
        applicationId: application.id,
        skillId: skill.id,
      }));

      if (skillInserts.length > 0) {
        await tx.insert(applicationSkills).values(skillInserts);
      }
    }

    return application;
  });
}

export async function getAllInterestAreas() {
  return await db.select().from(interestAreas);
}

export async function getAllSkills() {
  const allSkills = await db.select().from(skills);
  
  // Group by category
  const skillsByCategory: Record<string, typeof allSkills> = {};
  allSkills.forEach(skill => {
    if (!skillsByCategory[skill.category]) {
      skillsByCategory[skill.category] = [];
    }
    skillsByCategory[skill.category].push(skill);
  });
  
  return skillsByCategory;
}
