// App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Registration/Registration";
import CustomCalendar from "./components/big-calendar/custom-calendar";
import "./App.css";
import Dashboard from "./components/Dashboard/dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CustomCalendar />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
