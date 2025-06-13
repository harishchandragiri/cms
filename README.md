# Simple Custom CMS – Full Version

## Tech Stack
- Frontend: React (Vite), Tailwind CSS
- Backend: Express.js, MongoDB, JWT Auth, Multer
- Styling: Black/White theme, Blue buttons, Responsive design

## Setup

### Backend
1. cd backend
2. npm install
3. create `.env` with values
4. npm run dev

### Frontend
1. cd frontend
2. npm install
3. npm run dev
4. Visit http://localhost:5173

## Admin Credentials
- Email: john@example.com
- Password: password123

## Features
- Login/logout with JWT 
- CRUD posts with optional image uploads
- Posts stored in MongoDB with timestamps
- Uploaded images served from `/public`
- Responsive UI with Tailwind

## Notes
- Use HTTPS, secure secrets, handle CSRF in production
- Edit expiry, storage paths
