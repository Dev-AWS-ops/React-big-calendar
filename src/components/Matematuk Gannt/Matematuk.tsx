import { useState } from "react";
import { Gantt, type Task, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";

export default function Matematuk() {
  const [view, setView] = useState(ViewMode.Day);
  const [showTaskList, setShowTaskList] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([
    {
      start: new Date(2025, 8, 30),
      end: new Date(2025, 9, 15),
      name: "Some Project",
      id: "ProjectSample",
      progress: 50,
      type: "project",
      hideChildren: false,
    },
    {
      start: new Date(2025, 8, 30),
      end: new Date(2025, 9, 2),
      name: "Idea",
      id: "Task 0",
      progress: 45,
      type: "task",
      project: "ProjectSample",
    },
    {
      start: new Date(2025, 9, 2),
      end: new Date(2025, 9, 8),
      name: "Research",
      id: "Task 1",
      progress: 25,
      type: "task",
      project: "ProjectSample",
      dependencies: ["Task 0"],
    },
    {
      start: new Date(2025, 9, 4),
      end: new Date(2025, 9, 6),
      name: "Discussion with team",
      id: "Task 2",
      progress: 30,
      type: "task",
      project: "ProjectSample",
      dependencies: ["Task 1"],
    },
    {
      start: new Date(2025, 9, 8),
      end: new Date(2025, 9, 9),
      name: "Developing",
      id: "Task 3",
      progress: 60,
      type: "task",
      project: "ProjectSample",
      dependencies: ["Task 2"],
    },
    {
      start: new Date(2025, 9, 8),
      end: new Date(2025, 9, 10),
      name: "Review",
      id: "Task 4",
      progress: 10,
      type: "task",
      project: "ProjectSample",
      dependencies: ["Task 3"],
    },
    {
      start: new Date(2025, 9, 15),
      end: new Date(2025, 9, 15),
      name: "Release",
      id: "Task 5",
      progress: 0,
      type: "milestone",
      project: "ProjectSample",
      dependencies: ["Task 4"],
    },
    {
      start: new Date(2025, 9, 18),
      end: new Date(2025, 9, 19),
      name: "Party Time 🎉",
      id: "Task 6",
      progress: 0,
      type: "task",
      project: "ProjectSample",
      dependencies: ["Task 5"],
    },
  ]);

  const handleTaskChange = (task: Task) => {
    setTasks(tasks.map(t => t.id === task.id ? task : t));
  };

  const handleProgressChange = (task: Task) => {
    setTasks(tasks.map(t => t.id === task.id ? task : t));
  };

  const handleExpanderClick = (task: Task) => {
    setTasks(tasks.map(t => t.id === task.id ? { ...t, hideChildren: !t.hideChildren } : t));
  };

  return (
    <div style={{
      width: "100%",
      height: "100vh",
      overflow: "hidden",
      backgroundColor: "#ffffff",
      display: "flex",
      flexDirection: "column",
      padding: "10px",
      boxSizing: "border-box"
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "0px",
        marginBottom: "12px",
        flexWrap: "wrap",
        justifyContent: "flex-end"
      }}>
        <button
          onClick={() => setView(ViewMode.Hour)}
          style={{
            background: view === ViewMode.Hour ? "#e0e0e0" : "#f5f5f5",
            color: "#333",
            border: "1px solid #ccc",
            borderRight: "none",
            padding: "8px 16px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: view === ViewMode.Hour ? "500" : "normal"
          }}
        >
          Hour
        </button>
        <button
          onClick={() => setView(ViewMode.QuarterDay)}
          style={{
            background: view === ViewMode.QuarterDay ? "#e0e0e0" : "#f5f5f5",
            color: "#333",
            border: "1px solid #ccc",
            borderRight: "none",
            padding: "8px 16px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: view === ViewMode.QuarterDay ? "500" : "normal"
          }}
        >
          Quarter of Day
        </button>
        <button
          onClick={() => setView(ViewMode.HalfDay)}
          style={{
            background: view === ViewMode.HalfDay ? "#e0e0e0" : "#f5f5f5",
            color: "#333",
            border: "1px solid #ccc",
            borderRight: "none",
            padding: "8px 16px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: view === ViewMode.HalfDay ? "500" : "normal"
          }}
        >
          Half of Day
        </button>
        <button
          onClick={() => setView(ViewMode.Day)}
          style={{
            background: view === ViewMode.Day ? "#e0e0e0" : "#f5f5f5",
            color: "#333",
            border: "1px solid #ccc",
            borderRight: "none",
            padding: "8px 16px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: view === ViewMode.Day ? "500" : "normal"
          }}
        >
          Day
        </button>
        <button
          onClick={() => setView(ViewMode.Week)}
          style={{
            background: view === ViewMode.Week ? "#e0e0e0" : "#f5f5f5",
            color: "#333",
            border: "1px solid #ccc",
            borderRight: "none",
            padding: "8px 16px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: view === ViewMode.Week ? "500" : "normal"
          }}
        >
          Week
        </button>
        <button
          onClick={() => setView(ViewMode.Month)}
          style={{
            background: view === ViewMode.Month ? "#e0e0e0" : "#f5f5f5",
            color: "#333",
            border: "1px solid #ccc",
            borderRight: "none",
            padding: "8px 16px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: view === ViewMode.Month ? "500" : "normal"
          }}
        >
          Month
        </button>
        <button
          onClick={() => setView(ViewMode.Year)}
          style={{
            background: view === ViewMode.Year ? "#e0e0e0" : "#f5f5f5",
            color: "#333",
            border: "1px solid #ccc",
            padding: "8px 16px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: view === ViewMode.Year ? "500" : "normal"
          }}
        >
          Year
        </button>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginLeft: "16px",
          cursor: "pointer"
        }}
        onClick={() => setShowTaskList(!showTaskList)}
        >
          <div style={{
            width: "50px",
            height: "30px",
            backgroundColor: "#1e90ff",
            display: "flex",
            alignItems: "center",
            justifyContent: showTaskList ? "flex-start" : "flex-end",
            padding: "4px",
            transition: "justify-content 0.3s"
          }}>
            <div style={{
              width: "20px",
              height: "25px",
              backgroundColor: "white",
              transition: "transform 0.3s"
            }} />
          </div>
          <span style={{
            color: "black",
            fontSize: "14px",
            fontWeight: "normal"
          }}>Show Task List</span>
        </div>
      </div>

      <Gantt
        tasks={tasks}
        viewMode={view}
        listCellWidth={showTaskList ? "155px" : ""}
        columnWidth={65}
        onDateChange={handleTaskChange}
        onProgressChange={handleProgressChange}
        onExpanderClick={handleExpanderClick}
      />
    </div>
  );
}