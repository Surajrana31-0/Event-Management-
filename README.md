# Event Management Platform

A full-stack web application for event management, built with React (Vite), Node.js, Express, and PostgreSQL.

## Features

### For Event Participants
- Register and log in securely
- Browse and view current events
- View event details and features
- User profile management

### For Event Organizers (Future Enhancements)
- Create, update, and delete events
- Manage user registrations
- Dashboard with event statistics

## Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **React Router** (if used) - Client-side routing
- **CSS Modules** - Scoped styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Relational database
- **pg** - PostgreSQL client for Node.js
- **JWT** - Token-based authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **express-rate-limit** - Rate limiting
- **dotenv** - Environment variable management

### Database
- **PostgreSQL** - Relational database for storing users and events

## Project Structure

```
Event-Management--development/
  squad-management/
    BackEnd/
      Controller/         # Route handlers (controllers)
        UserController.js
      Database/           # Database connection
        db.js
      Middleware/         # Authentication and other middleware
        auth.js
      Models/             # Database models
        Users.js
      Routes/             # API routes
        Routes.js
      server.js           # Express server entry point
      package.json
    FrontEnd/
      src/
        pages/            # Page components (Authentication, Private, Public)
        App.jsx           # Main React component
        main.jsx          # Entry point
        ...
      public/
      package.json
      vite.config.js
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm
- PostgreSQL (running locally or remotely)

### 1. Database Setup

1. Create a PostgreSQL database (e.g., `EventManagement`).
2. Ensure your PostgreSQL server is running.
3. The users table will be created automatically on server start.

### 2. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd Event-Management--development/squad-management/BackEnd
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the BackEnd directory:
   ```env
   PORT=3000
   PGUSER=db_user
   PGPASSWORD=db_password
   PGHOST=localhost
   PGDATABASE=EventManagement
   PGPORT=5432
   JWT_SECRET=your_jwt_secret
   CORS_ORIGIN=http://localhost:5173
   ```
4. Start the backend server:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000` by default.

### 3. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd Event-Management--development/squad-management/FrontEnd
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. (Optional) Create a `.env` file for frontend config:
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173` by default.

## API Endpoints

### Authentication
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get current user profile (protected)

### Users
- `GET /api/users` - Get all users (protected)
- `GET /api/users/:id` - Get user by ID (protected)
- `PUT /api/users/:id` - Update user (protected)
- `DELETE /api/users/:id` - Delete user (protected)

### Health Check
- `GET /api/health` - Check if server is running

## Key Features Implementation

### CRUD Operations
- ✅ **Create**: Register new users
- ✅ **Read**: Get user(s) info
- ✅ **Update**: Update user info
- ✅ **Delete**: Remove users

### Authentication & Authorization
- ✅ JWT-based authentication
- ✅ Protected routes
- ✅ Secure password hashing

### User Experience
- ✅ Responsive design (frontend)
- ✅ Error handling
- ✅ Form validation (frontend)

## Roadmap

### MVP (Minimum Viable Product)
- [x] User registration and login (JWT authentication)
- [x] User profile management
- [x] View current events (static or basic list)
- [x] Basic event details page
- [x] PostgreSQL integration for users

### Short-Term Goals
- [ ] Event creation (organizer role)
- [ ] Event update and delete (organizer role)
- [ ] List all events from database
- [ ] Protect event management routes (role-based access)
- [ ] Improved error handling and validation (backend & frontend)
- [ ] Responsive and accessible UI

### Mid-Term Goals
- [ ] User registration for events (RSVP)
- [ ] Email notifications (registration, reminders)
- [ ] User avatars/profile pictures
- [ ] Pagination and search for events
- [ ] Dashboard for organizers (event stats)
- [ ] Unit and integration tests (backend & frontend)

### Long-Term Goals
- [ ] Admin panel for user and event management
- [ ] Event comments/discussion
- [ ] Calendar integration (Google/Outlook)
- [ ] Analytics and reporting
- [ ] Multi-language support
- [ ] Mobile app (React Native or Flutter)

## Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 3000)
- `PGUSER` - PostgreSQL username
- `PGPASSWORD` - PostgreSQL password
- `PGHOST` - PostgreSQL host
- `PGDATABASE` - Database name
- `PGPORT` - PostgreSQL port (default: 5432)
- `JWT_SECRET` - Secret key for JWT tokens
- `CORS_ORIGIN` - Allowed origin for CORS

### Frontend (.env)
- `VITE_API_URL` - Backend API URL

## Deployment

### Backend Deployment
1. Set up environment variables on your hosting platform
2. Install dependencies: `npm install --production`
3. Start the server: `npm start`

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `dist` folder to your hosting platform
3. Set up environment variables

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
