import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from './pages/public/Homepage.jsx';
import Login from './pages/Authentication/Login.jsx';
import Register from './pages/Authentication/Register.jsx';
import Mission from './pages/public/Mission.jsx';
import './App.css';
import Feature from "./pages/public/Features.jsx";
import ProtectedRoute from './components/ProtectedRoute';
import CreateEvent from './pages/Private/CreateEvent.jsx';
import CreateEvents from './pages/Private/CreateEvents.jsx';
import Dashboard from './pages/Private/Dashboard.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/features" element={<Feature />} />
        <Route path="/create-event" element={
          <ProtectedRoute>
            <CreateEvent />
          </ProtectedRoute>
        } />
        <Route path="/create-events" element={
          <ProtectedRoute>
            <CreateEvents />
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;