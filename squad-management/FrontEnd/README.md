# Squad Event Management - Full Stack Web Application

A full stack event management platform built with **React (Vite)** for the frontend and **Node.js/Express + PostgreSQL** for the backend.  
Features include user authentication, event creation, admin dashboard, event listing, and more.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [API Endpoints](#api-endpoints)
- [License](#license)

---

## Features

- User registration, login, and password reset (with email)
- Admin and regular user roles
- Event creation, listing, and deletion
- Admin dashboard with analytics (total events, revenue, etc.)
- Responsive UI with modern design
- Secure authentication (JWT)
- PostgreSQL database

---

## Project Structure

```
Event-Management--siddhartha/
  squad-management/
    BackEnd/      # Node.js/Express backend
      Controller/
      Database/
      Middleware/
      Models/
      Routes/
      Test/
      server.js
      package.json
    FrontEnd/     # React (Vite) frontend
      src/
        Authentication/
        Private/
        public/
        assets/
        App.jsx
      public/
      index.html
      package.json
```

---

## Prerequisites

- **Node.js** (v16+ recommended)
- **npm** (v8+ recommended)
- **PostgreSQL** (v12+ recommended)
- (Optional) **Git**

---

## Environment Variables

### Backend (`BackEnd/.env`)

Create a `.env` file in the `BackEnd` directory with the following variables:

```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=EventMgm
DB_USER=postgres
DB_PASSWORD=Sur@j98026r@n@
CORS_ORIGIN=http://localhost:5173
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

- `EMAIL_USER` and `EMAIL_PASS` are used for sending password reset emails.

### Frontend

- If you need to override the API URL, create a `.env` file in `FrontEnd`:
  ```
  VITE_API_URL=http://localhost:5000/api
  ```

---

## Backend Setup

1. **Install dependencies:**
   ```sh
   cd squad-management/BackEnd
   npm install
   ```

2. **Set up the database:**
   - Ensure PostgreSQL is running.
   - Create a database named `squad_management` (or as per your `.env`).

3. **Start the backend server:**
   ```sh
   npm run dev
   ```
   - The server will auto-create tables if they do not exist.

4. **Run backend tests:**
   ```sh
   npm test
   ```

---

## Frontend Setup

1. **Install dependencies:**
   ```sh
   cd squad-management/FrontEnd
   npm install
   ```

2. **Start the frontend dev server:**
   ```sh
   npm run dev
   ```
   - The app will be available at [http://localhost:5173](http://localhost:5173) by default.

---

## Running the Application

- **Backend:** [http://localhost:5000](http://localhost:5000)
- **Frontend:** [http://localhost:5173](http://localhost:5173)

Make sure both servers are running for full functionality.

---

## API Endpoints

### User Routes (`/api/users`)
- `POST /register` - Register a new user
- `POST /login` - Login
- `GET /profile` - Get user profile (auth required)
- `GET /` - List all users (admin)
- `GET /:id` - Get user by ID
- `PUT /:id` - Update user
- `DELETE /:id` - Delete user
- `POST /forgot-password` - Request password reset
- `POST /reset-password/:token` - Reset password

### Event Routes (`/api/events`)
- `POST /` - Create event
- `GET /` - List all events
- `DELETE /:id` - Delete event

---

## Testing

- **Backend:** Uses Jest and Supertest. See `BackEnd/Test/userController.test.js`.
- **Frontend:** (Add your preferred testing setup if needed.)

---

## Notes

- The backend uses JWT for authentication and bcrypt for password hashing.
- Password reset is handled via email (configure SMTP in `.env`).
- The frontend uses React, React Router, React Hook Form, and React Icons.
- All environment variables should be set before running the servers.

---

## License

This project is licensed under the ISC License.










This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
