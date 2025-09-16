
import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const enrollments = pgTable("enrollments", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  currentRole: text("current_role").notNull(),
  education: text("education").notNull(),
  experience: text("experience").notNull(),
  interests: json("interests").$type<string[]>().notNull(),
  referral: text("referral"),
  consent: boolean("consent").notNull(),
  assessmentResults: json("assessment_results").$type<{
    courseMatches?: Record<string, number>;
    discountEligibility?: number;
    suggestedCourses?: string[];
    traits?: Record<string, number>;
  }>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// New applications table schema matching your PostgreSQL structure
export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  currentRole: text("currentrole").notNull(), // Match actual PostgreSQL column name
  educationBackground: text("education_background").notNull(),
  yearsExperience: text("years_experience").notNull(),
  areasOfInterest: text("areas_of_interest").array().notNull(), // Use text array instead of JSON
  skills: text("skills").array().notNull(), // Use text array instead of JSON
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertEnrollmentSchema = createInsertSchema(enrollments).omit({
  id: true,
  createdAt: true,
});

export const insertApplicationSchema = createInsertSchema(applications).omit({
  id: true,
  submittedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertEnrollment = z.infer<typeof insertEnrollmentSchema>;
export type Enrollment = typeof enrollments.$inferSelect;
export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export type Application = typeof applications.$inferSelect;
