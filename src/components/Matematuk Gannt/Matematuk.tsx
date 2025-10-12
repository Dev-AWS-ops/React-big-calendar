import React, { useState } from "react";
import { Gantt, type Task, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import "./Matematuk.css";

export default function Matematuk() {
  const [view, setView] = useState(ViewMode.Day);
  const [showTaskList, setShowTaskList] = useState(true);

  const tasks: Task[] = [
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
  ];

  return (
    <div className="gantt-container">
      <div className="toolbar">
        <button
          onClick={() => setView(ViewMode.Hour)}
          className={view === ViewMode.Hour ? "active" : ""}
        >
          Hour
        </button>
        <button
          onClick={() => setView(ViewMode.QuarterDay)}
          className={view === ViewMode.QuarterDay ? "active" : ""}
        >
          Quarter of Day
        </button>
        <button
          onClick={() => setView(ViewMode.HalfDay)}
          className={view === ViewMode.HalfDay ? "active" : ""}
        >
          Half of Day
        </button>
        <button
          onClick={() => setView(ViewMode.Day)}
          className={view === ViewMode.Day ? "active" : ""}
        >
          Day
        </button>
        <button
          onClick={() => setView(ViewMode.Week)}
          className={view === ViewMode.Week ? "active" : ""}
        >
          Week
        </button>
        <button
          onClick={() => setView(ViewMode.Month)}
          className={view === ViewMode.Month ? "active" : ""}
        >
          Month
        </button>
        <button
          onClick={() => setView(ViewMode.Year)}
          className={view === ViewMode.Year ? "active" : ""}
        >
          Year
        </button>
        <label className="checkbox">
          <input
            type="checkbox"
            checked={showTaskList}
            onChange={() => setShowTaskList(!showTaskList)}
          />
          Show Task List
        </label>
      </div>

       <Gantt
    tasks={tasks}
    viewMode={view}
    listCellWidth={showTaskList ? "155px" : ""}
    columnWidth={65}
  />
</div>
  );
}