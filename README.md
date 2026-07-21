# Portfolio Web Application

A modern, professional portfolio website built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and an Express.js backend. This project is being developed as a production-ready personal brand platform for showcasing experience, projects, skills, and contact information.

## What We Built So Far

- Modern landing page with a polished hero section
- Professional profile overview and experience summary
- Responsive layout for desktop and mobile
- Reusable layout structure with navigation and footer
- Dark-themed portfolio UI with animated transitions
- Profile image support on the homepage
- Frontend and backend foundations ready for future expansion

## Tech Stack

### Frontend
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React

### Backend
- Node.js
- Express.js
- TypeScript

## Project Structure

- frontend/ - Next.js frontend application
- backend/ - Express.js API server
- docs/ - Architecture and project notes

## Getting Started

### 1) Install dependencies

```bash
cd frontend
npm install

cd ../backend
npm install
```

### 2) Run the project

From the project root, start both apps together:

```bash
cd ..
npm run dev
```

This will launch:
- Frontend: http://localhost:3000 (or the next available port shown in the terminal)
- Backend: http://localhost:5000

Useful endpoints:

```bash
http://localhost:5000/api/health
http://localhost:5000/api/profile
```

You can also run them separately:

```bash
npm run dev:frontend
npm run dev:backend
```

## Project Progress

Overall completion: about 85% of the initial portfolio MVP is done.

### Completed
- Modern portfolio landing page with polished sections
- About, skills, projects, education, and contact sections
- Responsive UI with animations and improved visuals
- Express backend with health and profile API routes
- Frontend connected to backend data for the main portfolio content
- One-command startup script for local development

### In Progress / Next Up
- An admin dashboard and content management web app are now being developed so portfolio content can be updated easily from one place
- Database integration for dynamic portfolio updates
- Authentication and role-based access
- Deployment to cloud hosting

## Current Milestones

1. Build a clean and modern portfolio foundation
2. Create a responsive landing page experience
3. Add reusable UI components and animations
4. Prepare frontend and backend architecture for future features
5. Extend into admin dashboard, CMS, and database integration

## What We Learned During Development

- How to scaffold a modern Next.js TypeScript app
- How to structure a responsive UI with Tailwind CSS
- How to use Framer Motion for smooth animations
- How to configure a TypeScript-based Express backend
- How to serve local images correctly in a web app
- How to organize a professional project structure for future scaling

## Future Plans

- Add multiple portfolio pages such as About, Projects, Experience, and Contact
- Implement admin dashboard and authentication
- Connect MongoDB for dynamic content
- Add resume upload and blog features
- Deploy to Vercel and Render
