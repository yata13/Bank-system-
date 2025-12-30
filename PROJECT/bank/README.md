# Bank Management System - Portfolio Version

A full-stack Bank Management System built with React, Node.js (Express), and MySQL. This version is DevOps-ready and secured against common vulnerabilities like SQL Injection.

## 🚀 Quick Start (with Docker)

The easiest way to run the entire system is using Docker Compose.

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/yata13/Bank-system-.git
    cd Bank-system-
    ```

2.  **Start the services**:
    ```bash
    docker-compose up --build
    ```

3.  **Access the application**:
    - Frontend: [http://localhost](http://localhost)
    - Backend: [http://localhost:3000](http://localhost:3000)

## 🛠 Tech Stack

- **Database**: PostgreSQL (Supabase recommended).
- **Backend hosting**: Render (or similar).
- **Frontend hosting**: Netlify.

## 🔒 Security Enhancements

- **SQL Injection Prevention**: All dynamic queries are now validated against whitelisted column names.
- **CORS Configuration**: Securely handle cross-origin requests.

## 📁 Repository Structure

- `/frontend`: React application.
- `/backend`: Express API and MySQL models.
- `docker-compose.yml`: Orchestration for the whole system.
- `.github/workflows`: CI pipeline for automated checks.

## 🛠 Local Development (Manual)

### Database Setup (Supabase)
1.  Create a new project on Supabase.
2.  Go to the SQL Editor and paste the contents of `backend/seed.sql`.
3.  Copy your Connection String (URI) from Project Settings -> Database.

### Backend Setup
1. `cd backend`
2. `npm install`
3. Create `.env` from `.env.example` and set `DATABASE_URL`.
4. `npm start`

### Frontend
1. `cd frontend`
2. `npm install`
3. Create `.env` from `.env.example`.
4. `npm run dev`

---
*Created by [Yared](https://github.com/yata13) - Ready for Portfolio Deployment.*
