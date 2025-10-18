// Dashboard.tsx
import React, { useEffect, useState, lazy, Suspense } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import type { User } from "firebase/auth";

import { Gantt, Willow, WillowDark } from "wx-react-gantt";
import "wx-react-gantt/dist/gantt.css";
import "./Dashboard.css";

// Lazy-loaded components
const Dhx = lazy(() => import("../Dhx/Dhx"));
const Matematuk = lazy(() => import("../Matematuk Gannt/Matematuk"));

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [theme, setTheme] = useState<"willow" | "dark">("willow");
  const navigate = useNavigate();

  // Authentication check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const menuItems = [
    "Dashboard",
    "DHX Gannt Chart",
    "Matematuk Gannt Chart",
    "Tasks",
    "Reports",
    "Settings",
  ];

  // Sample Gantt tasks
  const [tasks, setTasks] = useState([
    { id: 1, text: "Project Kickoff", start: new Date(2025, 8, 1), duration: 2, type: "summary", progress: 0.1, open: true },
    { id: 2, text: "Requirement Gathering", start: new Date(2025, 8, 2), duration: 3, parent: 1, progress: 0.3, type: "task" },
    { id: 3, text: "Feasibility Study", start: new Date(2025, 8, 4), duration: 2, parent: 1, progress: 0.2, type: "task" },
    { id: 4, text: "Planning Phase", start: new Date(2025, 8, 6), duration: 4, type: "milestone", progress: 0.2, open: true },
    { id: 5, text: "Project Plan", start: new Date(2025, 8, 6), duration: 2, parent: 4, progress: 0.5, type: "task" },
    { id: 6, text: "Resource Allocation", start: new Date(2025, 8, 7), duration: 3, parent: 4, progress: 0.2, type: "task" },
    { id: 7, text: "Design Phase", start: new Date(2025, 8, 10), duration: 5, type: "task", progress: 0.1, open: true },
    { id: 8, text: "UI/UX Design", start: new Date(2025, 8, 10), duration: 3, parent: 7, progress: 0.4, type: "task" },
    { id: 9, text: "Architecture Design", start: new Date(2025, 8, 12), duration: 4, parent: 7, progress: 0.2, type: "task" },
    { id: 10, text: "Development Phase", start: new Date(2025, 8, 15), duration: 15, type: "task", progress: 0.05, open: true },
    { id: 11, text: "Frontend Development", start: new Date(2025, 8, 15), duration: 10, parent: 10, progress: 0.2, type: "task" },
    { id: 12, text: "Backend Development", start: new Date(2025, 8, 17), duration: 12, parent: 10, progress: 0.15, type: "task" },
    { id: 13, text: "Testing Phase", start: new Date(2025, 8, 30), duration: 7, type: "task", progress: 0, open: true },
    { id: 14, text: "Unit Testing", start: new Date(2025, 8, 30), duration: 3, parent: 13, progress: 0, type: "task" },
    { id: 15, text: "Integration Testing", start: new Date(2025, 9, 2), duration: 4, parent: 13, progress: 0, type: "task" },
    { id: 16, text: "Deployment", start: new Date(2025, 9, 5), duration: 2, type: "task", progress: 0, open: true },
    { id: 17, text: "Staging Deployment", start: new Date(2025, 9, 5), duration: 1, parent: 16, progress: 0, type: "task" },
    { id: 18, text: "Production Deployment", start: new Date(2025, 9, 6), duration: 1, parent: 16, progress: 0, type: "task" },
    { id: 19, text: "Maintenance & Support", start: new Date(2025, 9, 7), duration: 10, type: "task", progress: 0, open: true },
    { id: 20, text: "Bug Fixing", start: new Date(2025, 9, 7), duration: 5, parent: 19, progress: 0, type: "task" },
    { id: 21, text: "Performance Monitoring", start: new Date(2025, 9, 8), duration: 7, parent: 19, progress: 0, type: "task" },
  ]);

  const [links, setLinks] = useState([
    { id: 1, source: 2, target: 3, type: "e2s" },
    { id: 2, source: 5, target: 6, type: "e2s" },
    { id: 3, source: 8, target: 9, type: "e2s" },
    { id: 4, source: 11, target: 12, type: "e2s" },
    { id: 5, source: 14, target: 15, type: "e2s" },
    { id: 6, source: 17, target: 18, type: "e2s" },
    { id: 7, source: 3, target: 4, type: "e2s" },
  ]);

  const scales = [
    { unit: "month", step: 1, format: "MMM yyyy" },
    { unit: "day", step: 1, format: "d" },
  ];

  const handleTaskChange = (updatedTasks: any[]) => setTasks(updatedTasks);
  const handleLinkChange = (updatedLinks: any[]) => setLinks(updatedLinks);

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
        <button
          className="toggle-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {sidebarOpen ? "◀" : "▶"}
        </button>

        {sidebarOpen && (
          <div className="sidebar-content">
            <div className="sidebar-header">
              <h2 className="brand-title">Project</h2>
            </div>

            <nav className="menu">
              <h4 className="menu-title">Navigation</h4>
              <ul>
                {menuItems.map((item) => (
                  <li
                    key={item}
                    className={activeMenu === item ? "active" : ""}
                    onClick={() => {
                      setActiveMenu(item);
                      if (item === "DHX Gannt Chart") navigate("/dashboard/dhx");
                      else if (item === "Matematuk Gannt Chart") navigate("/dashboard/matematuk");
                      else navigate("/dashboard");
                    }}
                  >
                    <span className="menu-icon">●</span>
                    {item}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="theme-switcher">
              <button
                className={`theme-btn ${theme === "willow" ? "active" : ""}`}
                onClick={() => setTheme("willow")}
              >
                Willow
              </button>
              <button
                className={`theme-btn ${theme === "dark" ? "active" : ""}`}
                onClick={() => setTheme("dark")}
              >
                Dark
              </button>
            </div>

            {user && (
              <div className="user-info">
                <img src={user.photoURL || "/image.png"} alt="User Avatar" className="avatar" />
                <div className="user-details">
                  <h3>{user.displayName || "User"}</h3>
                  <p>{user.email}</p>
                </div>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Container */}
      <div className="main-container">
        <div className="header-section">
          <h2 className="gantt-title">{activeMenu}</h2>
          <div className="header-info">
            <span className="theme-indicator">
              Theme: {theme === "willow" ? "Willow" : "Dark"}
            </span>
          </div>
        </div>

        <div className="main-content">
          <Suspense fallback={<div>Loading...</div>}>
            {activeMenu === "Dashboard" && (
              <div className="gantt-wrapper">
                {theme === "willow" ? (
                  <Willow key="willow">
                    <Gantt
                      key="gantt-willow"
                      tasks={tasks}
                      links={links}
                      scales={scales}
                      autoSchedule
                      editable
                      dragMove
                      dragResize
                      showLinks
                      showToday
                      showTaskEditor
                      onTasksChange={handleTaskChange}
                      onLinksChange={handleLinkChange}
                    />
                  </Willow>
                ) : (
                  <WillowDark key="dark">
                    <Gantt
                      key="gantt-dark"
                      tasks={tasks}
                      links={links}
                      scales={scales}
                      autoSchedule
                      editable
                      dragMove
                      dragResize
                      showLinks
                      showToday
                      showTaskEditor
                      onTasksChange={handleTaskChange}
                      onLinksChange={handleLinkChange}
                    />
                  </WillowDark>
                )}
              </div>
            )}

            {/* Nested routes render here */}
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
