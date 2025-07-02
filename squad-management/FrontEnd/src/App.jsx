import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from './pages/public/Homepage.jsx';
import Login from './pages/Authentication/Login.jsx';
import Register from './pages/Authentication/Register.jsx';
import Mission from './pages/public/Mission.jsx';
import './App.css';
import Feature from "./pages/public/Features.jsx";
import Dashboard from "./pages/Private/Dashboard.jsx";
import FindEvent from "./pages/Private/FindEvents.jsx";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
           <Route path="/mission" element={<Mission />} />
           <Route path="/features" element={<Feature />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/find-events" element={<FindEvent/>}/>

      </Routes>
    </Router>
  );
}

export default App;