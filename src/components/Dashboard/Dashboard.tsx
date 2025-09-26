import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import type { User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

import { Gantt, Willow } from "wx-react-gantt";
import "wx-react-gantt/dist/gantt.css";

function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

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

  // ✅ Sample project with 10 main tasks, each with children
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Project Kickoff",
      start: new Date(2025, 8, 1),
      duration: 2,
      type: "summary",
      progress: 0.1,
      open: true,
    },
    { id: 2, text: "Requirement Gathering", start: new Date(2025, 8, 2), duration: 3, parent: 1, progress: 0.3, type: "task" },
    { id: 3, text: "Feasibility Study", start: new Date(2025, 8, 4), duration: 2, parent: 1, progress: 0.2, type: "task" },

    {
      id: 4,
      text: "Planning Phase",
      start: new Date(2025, 8, 6),
      duration: 4,
      type: "milestone",
      progress: 0.2,
      open: true,
    },
    { id: 5, text: "Project Plan", start: new Date(2025, 8, 6), duration: 2, parent: 4, progress: 0.5, type: "task" },
    { id: 6, text: "Resource Allocation", start: new Date(2025, 8, 7), duration: 3, parent: 4, progress: 0.2, type: "task" },

    {
      id: 7,
      text: "Design Phase",
      start: new Date(2025, 8, 10),
      duration: 5,
      type: "task",
      progress: 0.1,
      open: true,
    },
    { id: 8, text: "UI/UX Design", start: new Date(2025, 8, 10), duration: 3, parent: 7, progress: 0.4, type: "task" },
    { id: 9, text: "Architecture Design", start: new Date(2025, 8, 12), duration: 4, parent: 7, progress: 0.2, type: "task" },

    {
      id: 10,
      text: "Development Phase",
      start: new Date(2025, 8, 15),
      duration: 15,
      type: "task",
      progress: 0.05,
      open: true,
    },
    { id: 11, text: "Frontend Development", start: new Date(2025, 8, 15), duration: 10, parent: 10, progress: 0.2, type: "task" },
    { id: 12, text: "Backend Development", start: new Date(2025, 8, 17), duration: 12, parent: 10, progress: 0.15, type: "task" },

    {
      id: 13,
      text: "Testing Phase",
      start: new Date(2025, 8, 30),
      duration: 7,
      type: "task",
      progress: 0,
      open: true,
    },
    { id: 14, text: "Unit Testing", start: new Date(2025, 8, 30), duration: 3, parent: 13, progress: 0, type: "task" },
    { id: 15, text: "Integration Testing", start: new Date(2025, 9, 2), duration: 4, parent: 13, progress: 0, type: "task" },

    {
      id: 16,
      text: "Deployment",
      start: new Date(2025, 9, 5),
      duration: 2,
      type: "task",
      progress: 0,
      open: true,
    },
    { id: 17, text: "Staging Deployment", start: new Date(2025, 9, 5), duration: 1, parent: 16, progress: 0, type: "task" },
    { id: 18, text: "Production Deployment", start: new Date(2025, 9, 6), duration: 1, parent: 16, progress: 0, type: "task" },

    {
      id: 19,
      text: "Maintenance & Support",
      start: new Date(2025, 9, 7),
      duration: 10,
      type: "task",
      progress: 0,
      open: true,
    },
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

  const handleTaskChange = (updatedTasks: any[]) => {
    setTasks(updatedTasks);
  };

  const handleLinkChange = (updatedLinks: any[]) => {
    setLinks(updatedLinks);
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
   <div className={`sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
  <button
    className="toggle-btn"
    onClick={() => setSidebarOpen(!sidebarOpen)}
  >
    {sidebarOpen ? "«" : "»"}
  </button>

  {sidebarOpen && (
    <div className="sidebar-content">
      {/* Navigation Menu */}
      <nav className="menu">
        <h4 className="menu-title">My Profile </h4>
        <ul>
          <li>Menu 1 </li>
          <li>Menu 2</li>
          <li>Menu 3</li>
          <li>Menu 4</li>
          <li>Menu 5</li>
           </ul>
      </nav>

      {/* User Info at Bottom */}
      {user && (
        <div className="user-info">
          <img
            src={user.photoURL || "/image.png"}
            alt="User Avatar"
            className="avatar"
          />
          <h3>{user.displayName || user.email}</h3>
          <p>{user.email}</p>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      )}
    </div>
  )}
</div>
{/* Main */}
      <div className="main-container">
        <h2 className="gantt-title">Project Timeline</h2>
        <div className="gantt-wrapper">
          <Willow>
            <Gantt
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
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
