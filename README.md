# JobTracker Walkthrough

JobTracker is a full-stack job application tracker built with Next.js, Prisma, and PostgreSQL.

## Features Implemented

### 1. Authentication
- **Login & Register**: Secure user authentication using NextAuth.js with Credentials provider.
- **Protected Routes**: Dashboard and job management pages are protected.

### 2. Dashboard
- **Overview**: View key statistics (Total Applications, Interviews, Offers, Rejections).
- **Analytics**: Visual bar chart showing monthly application trends.

### 3. Job Management
- **List View**: View all job applications in a table with filtering and search.
- **Add Job**: Form to add new job applications with details like position, company, status, etc.
- **Job Details**: Detailed view of a specific job application.
- **Edit & Delete**: Update job details or remove applications.
- **Status Management**: Quickly update job status (Applied -> Interview -> Offer -> Rejected).

### 4. Notes System
- **Timeline**: Add and view notes for each job application to track progress and details.

## Getting Started

### Prerequisites
- Node.js installed
- PostgreSQL database (e.g., Neon)

### Setup

1. **Configure Database**: Update the `.env` file with your PostgreSQL connection string:
   ```env
   DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"
   ```

2. **Run Migrations**: Initialize the database schema:
   ```bash
   npx prisma migrate dev --name init
   ```

3. **Start the App**: Run the development server:
   ```bash
   npm run dev
   ```

4. **Access the App**: Open http://localhost:3000 in your browser.

## Verification

1. **Register**: Create a new account at `/register`.
2. **Login**: Log in with your credentials.
3. **Dashboard**: Check the dashboard for empty stats initially.
4. **Add Job**: Go to "Jobs" -> "Add Job" and create a new entry.
5. **View Job**: Click on the new job to see details.
6. **Add Note**: Add a note to the job.
7. **Update Status**: Change the status and verify the dashboard stats update.
