# 🎉 Squad Event Management Platform

Welcome to the **Squad Event Management** project! This is a full-stack web application for discovering, creating, and managing events. It features a modern React frontend and a secure Node.js/Express backend with JWT authentication.

---

## 🚀 Project Overview

Squad Event Management is designed to help users:
- Discover upcoming and trending events
- Create and manage their own events
- Register and log in securely
- Enjoy a beautiful, responsive, and user-friendly interface

---

## ✨ Features

- 🔒 **Authentication**: Secure JWT-based login & registration
- 🏠 **Homepage**: Browse by category, see current and trending events
- 📅 **Event Management**: Create, view, and manage events
- 👤 **User Dashboard**: Personalized dashboard for users
- 🔍 **Event Discovery**: Search and filter events
- 🛡️ **Protected Routes**: Private pages accessible only to authenticated users
- 🎨 **Modern UI**: Responsive, accessible, and visually appealing design

---

## 🛠️ Tech Stack

**Frontend:**
- React (with Hooks)
- react-router-dom v6
- CSS Modules & custom styles
- Vite (for fast development)

**Backend:**
- Node.js & Express
- PostgreSQL (via pg)
- JWT for authentication
- bcrypt for password hashing

---

## 📂 Folder Structure

```
Event-Management/
  squad-management/
    BackEnd/         # Node.js/Express backend
      Controller/
      Database/
      Middleware/
      Models/
      Routes/
      server.js
      ...
    FrontEnd/        # React frontend
      src/
        Authentication/
        Private/
        public/
        assets/
        App.jsx
        main.jsx
        ...
      public/
      index.html
      ...
```

---

## 🔑 Authentication Flow

- Users register and log in via the frontend.
- On successful login, a JWT token is stored in `localStorage`.
- Private pages (Dashboard, Create Events, Find Events) are protected by a `PrivateRoute` component.
- If the token is missing or invalid, users are redirected to `/login`.
- Backend APIs require the JWT in the `Authorization` header for protected routes.

---

## 🖥️ Local Setup & Installation

### 1. **Clone the Repository**
```bash
git clone <your-repo-url>
cd Event-Management/squad-management
```

### 2. **Backend Setup**
```bash
cd BackEnd
npm install
# Configure your .env file for DB and JWT_SECRET
npm run dev
```

### 3. **Frontend Setup**
```bash
cd ../FrontEnd
npm install
npm run dev
```

- Frontend runs on [http://localhost:5173](http://localhost:5173)
- Backend runs on [http://localhost:5000](http://localhost:5000)

---

## 📝 Usage

- Register a new account or log in.
- Browse events on the homepage or dashboard.
- Create new events from the dashboard.
- Only authenticated users can access private pages.
- Remove your token from localStorage to test route protection (you'll be redirected to login).

---

## 🧩 Contribution Guidelines

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 💡 Customization & Theming

- Colors and fonts are easily customizable in the CSS files.
- All private routes are managed in `App.jsx` using the `PrivateRoute` component.
- Message boxes and event cards are fully styled and responsive.

---

## 📣 Credits

- Developed by [Your Name/Team]
- Inspired by modern event platforms

---

## 📬 Contact

For questions, suggestions, or support, please open an issue or contact the maintainer.

---

> _"Connect, create, and celebrate with Squad Event Management!"_
