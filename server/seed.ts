import { db } from './database';
import { interestAreas, skills } from '@shared/schema';

const sampleInterestAreas = [
  'AI for UI/UX Designer',
  'AI in Marketing',
  'AI Agent Development',
  'AI Data Labeling',
  'Salesforce CX',
  'Oracle Solutions',
  'Cloud Computing',
  'Full Stack Development'
];

const sampleSkills: Record<string, string[]> = {
  'Technical Skills': [
    'JavaScript', 'Python', 'React', 'Node.js', 'HTML/CSS', 'SQL', 
    'TypeScript', 'PostgreSQL', 'MongoDB', 'Docker', 'Git', 'AWS',
    'Salesforce', 'Oracle', 'Azure', 'Google Cloud', 'Vue.js', 'Angular'
  ],
  'Soft Skills': [
    'Communication', 'Leadership', 'Problem Solving', 'Team Work',
    'Critical Thinking', 'Adaptability', 'Time Management', 'Creativity',
    'Collaboration', 'Presentation Skills'
  ],
  'Industry Knowledge': [
    'Digital Marketing', 'Data Analysis', 'Project Management',
    'Business Analysis', 'Customer Relations', 'Quality Assurance',
    'Agile Methodology', 'DevOps', 'Cybersecurity', 'UI/UX Design'
  ]
};

async function seed() {
  try {
    console.log('🌱 Starting database seeding...');

    // Insert interest areas
    for (const area of sampleInterestAreas) {
      await db.insert(interestAreas)
        .values({ name: area })
        .onConflictDoNothing();
    }
    console.log('✅ Interest areas seeded');

    // Insert skills
    for (const [category, skillList] of Object.entries(sampleSkills)) {
      for (const skill of skillList) {
        await db.insert(skills)
          .values({ name: skill, category })
          .onConflictDoNothing();
      }
    }
    console.log('✅ Skills seeded');

    console.log('🌱 Database seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seed();
