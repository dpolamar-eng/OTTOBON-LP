
-- Create applications table
CREATE TABLE IF NOT EXISTS applications (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    currentrole TEXT NOT NULL,
    education_background TEXT NOT NULL,
    years_experience TEXT NOT NULL,
    areas_of_interest TEXT[] NOT NULL,
    skills TEXT[] NOT NULL,
    submitted_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_applications_email ON applications(email);
