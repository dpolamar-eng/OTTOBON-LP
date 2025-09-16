CREATE TABLE "enrollments" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"current_role" text NOT NULL,
	"education" text NOT NULL,
	"experience" text NOT NULL,
	"interests" json NOT NULL,
	"referral" text,
	"consent" boolean NOT NULL,
	"assessment_results" json,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
