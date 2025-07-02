import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css';
import Login from './Authentication/page/Login.jsx';
import Register from './Authentication/page/Register.jsx';
import Dashboard from "./Private/page/Dashboard.jsx";
import FindEvent from "./Private/page/FindEvents.jsx";
import Feature from "./public/page/Features.jsx";
import Homepage from './public/page/Homepage.jsx';
import Mission from './public/page/Mission.jsx';


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