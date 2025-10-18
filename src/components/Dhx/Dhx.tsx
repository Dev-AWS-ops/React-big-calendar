// src/components/Dhx/Dhx.tsx
import React, { useEffect, useState, useRef } from "react";
import gantt from "dhtmlx-gantt"; // DHTMLX Gantt library
import "dhtmlx-gantt/codebase/dhtmlxgantt.css"; // DHTMLX Gantt styles
import "./Dhx.css"; // Custom styles for the Gantt chart

const Dhx: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current) {
      // Gantt configuration (columns, drag, etc.)
      gantt.config.columns = [
        { name: "text", label: "Task Name", width: "*" },
        { name: "start_date", label: "Start", align: "center", width: 90 },
        { name: "duration", label: "Duration", align: "center", width: 90 },
        { name: "add", label: "", width: 44 },
      ];

      gantt.config.grid_width = 600;
      gantt.config.row_height = 35;
      gantt.config.scale_unit = "month";
      gantt.config.date_scale = "%F %Y";
      gantt.config.subscales = [{ unit: "day", step: 1, date: "%d" }];
      gantt.config.readonly = false;
      gantt.config.drag_move = true;
      gantt.config.drag_progress = true;
      gantt.config.drag_links = true;
      gantt.config.autoscroll = true;
      gantt.config.duration_unit = "hour"; // Adjust duration unit to hour

      // Initialize Gantt in the container div
      gantt.init(container.current);

      // Example data (you can replace this with your actual project data)
      gantt.parse({
        data: [
          { id: 1, text: "Construction plans", start_date: "2025-05-01", duration: 220, progress: 0.4 },
          { id: 2, text: "Johnson's house", start_date: "2025-05-01", duration: 160, parent: 1 },
          { id: 3, text: "Contract", start_date: "2025-05-01", duration: 32, parent: 2 },
          { id: 4, text: "Design", start_date: "2025-05-30", duration: 32, parent: 2 },
          { id: 5, text: "Obtain permits", start_date: "2025-07-19", duration: 10, parent: 2 },
          { id: 6, text: "Joplin's House", start_date: "2025-10-08", duration: 60 },
        ],
        links: [
          { id: 1, source: 1, target: 2, type: "0" },
          { id: 2, source: 2, target: 3, type: "0" },
          { id: 3, source: 3, target: 4, type: "0" },
        ],
      });
    }

    // Cleanup on unmount
    return () => {
      gantt.clearAll();
    };
  }, []);

  return <div className="dhx-gantt-container" ref={container} />;
};

export default Dhx;
