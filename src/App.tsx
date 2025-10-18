// App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Registration/Registration";
import CustomCalendar from "./components/big-calendar/custom-calendar";
import Dashboard from "./components/Dashboard/Dashboard";
import Dhx from "./components/Dhx/Dhx";
import Matematuk from "./components/Matematuk Gannt/Matematuk";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CustomCalendar />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboard parent route */}
      <Route path="/dashboard" element={<Dashboard />}>
        {/* Nested routes */}
        <Route path="dhx" element={<Dhx />} />
        <Route path="matematuk" element={<Matematuk />} />
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
