# Portfolio Web Application

A modern, multi-part portfolio platform built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and an Express.js backend. The project now includes a public portfolio experience, a visitor registration flow, and an admin dashboard for updating content and viewing visitor records.

## What this project includes

- A polished landing page for entering the portfolio experience
- A visitor registration page before accessing the portfolio
- A public portfolio page with sections for hero, about, skills, projects, education, and contact
- An admin dashboard for editing portfolio content and viewing visitor records
- A backend API that stores portfolio content and visitor submissions
- A one-command startup script for running frontend and backend together

## Main features

### Public portfolio experience
- Visitors first register on the registration page
- Once registered, they can open the portfolio and view the content
- The portfolio page is designed to feel modern and professional with responsive layouts and smooth visuals

### Admin panel
- Admin can log in with a password
- Admin can edit portfolio content directly from the dashboard
- Admin can view visitor records and track who accessed the portfolio
- Changes are saved through the backend and reflected in the portfolio UI

### Backend
- Express.js server with REST endpoints
- Portfolio content is stored and updated through JSON data files
- Visitor registration data is also stored for admin review

## Tech stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React

### Backend
- Node.js
- Express.js
- TypeScript

## Project structure

- frontend/ - Next.js frontend application
- frontend/app/ - routes for welcome, register, portfolio, and admin pages
- frontend/components/ - reusable UI sections and layout components
- frontend/lib/ - shared portfolio and visitor data models
- backend/ - Express.js server and API logic
- backend/src/ - backend source code
- start-dev.js - script to start frontend and backend together

## Getting started

### 1) Install dependencies

```bash
cd frontend
npm install

cd ../backend
npm install
```

### 2) Run the project

From the project root, run:

```bash
npm run dev
```

This starts both applications together.

### 3) Open the app

- Frontend: http://localhost:3000
- Backend health check: http://localhost:5000/api/health
- Portfolio API: http://localhost:5000/api/profile

## Current progress

The project is now in a strong MVP stage with:
- a working public portfolio experience
- visitor registration and storage
- admin editing support
- backend persistence for portfolio content and visitors

## Upcoming improvements

- Add stronger authentication and role-based access
- Add image upload support for portfolio media
- Add database integration instead of JSON file storage
- Add richer admin features such as drag-and-drop section editing
- Deploy the app to a live hosting platform
