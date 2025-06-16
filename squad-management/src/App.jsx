import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from './pages/public/Homepage.jsx';
import Login from './pages/Authentication/Login.jsx';
import Register from './pages/Authentication/Register.jsx';
import Mission from './pages/public/Mission.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
           <Route path="/mission" element={<Mission />} />
      </Routes>
    </Router>
  );
}

export default App;