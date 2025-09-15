
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

const sampleSkills = {
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

export async function seedDatabase() {
  try {
    console.log('Starting database seeding...');

    // Insert interest areas
    for (const area of sampleInterestAreas) {
      await db.insert(interestAreas)
        .values({ name: area })
        .onConflictDoNothing();
    }
    console.log('Interest areas seeded successfully');

    // Insert skills
    for (const [category, skillList] of Object.entries(sampleSkills)) {
      for (const skill of skillList) {
        await db.insert(skills)
          .values({ name: skill, category })
          .onConflictDoNothing();
      }
    }
    console.log('Skills seeded successfully');

    console.log('Database seeding completed!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

// Run seeding if called directly
if (require.main === module) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
