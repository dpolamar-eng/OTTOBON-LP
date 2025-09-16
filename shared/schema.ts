import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  currentRole: text("current_role"),
  educationBackground: text("education_background"),
  yearsExperience: text("years_experience"),
  howHeardAboutUs: text("how_heard_about_us"),
  privacyConsent: boolean("privacy_consent").notNull(),
  submittedAt: timestamp("submitted_at", { withTimezone: true }).defaultNow(),
});

export const interestAreas = pgTable("interest_areas", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
});

export const applicationInterests = pgTable("application_interests", {
  id: serial("id").primaryKey(),
  applicationId: integer("application_id").references(() => applications.id, { onDelete: "cascade" }).notNull(),
  interestAreaId: integer("interest_area_id").references(() => interestAreas.id).notNull(),
});

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  category: text("category").notNull(),
});

export const applicationSkills = pgTable("application_skills", {
  id: serial("id").primaryKey(),
  applicationId: integer("application_id").references(() => applications.id, { onDelete: "cascade" }).notNull(),
  skillId: integer("skill_id").references(() => skills.id).notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertApplicationSchema = createInsertSchema(applications);

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Application = typeof applications.$inferSelect;
export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export type InterestArea = typeof interestAreas.$inferSelect;
export type Skill = typeof skills.$inferSelect;
