import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import Home from './components/Home';
import User from './components/User';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/user/:id" element={<User />} />
      </Routes>
    </>
  );
}

export default App;
