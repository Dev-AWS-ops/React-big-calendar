import React, { useEffect, useRef } from "react";
import gantt from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import "./Dhx.css";

// Optional: import Material icons for nicer toolbar icons (match your screenshot)
import "material-design-icons-iconfont/dist/material-design-icons.css";

const Dhx: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current) {
      // Fix date format for start dates
      gantt.config.date_format = "%Y-%m-%d";
      // Setup columns like your screenshot
      gantt.config.columns = [
        { name: "text", label: "Task name", width: "*", tree: true },
        { name: "start_date", label: "Start", align: "center", width: 110, template: task => gantt.templates.date_grid(task.start_date) },
        { name: "duration", label: "Duration", align: "center", width: 90, template: gantt.templates.duration },
        { name: "duration_hours", label: "Duration (hours)", align: "center", width: 110, template: task => (task.duration * 24) + "h" },
        { name: "predecessors", label: "Predecessor", width: 110, template: task => (task.$target ? task.$target.map(l => gantt.getLink(l).source).join(", ") : "") },
        { name: "add", label: "", width: 44 }
      ];

      gantt.config.grid_width = 650;
      gantt.config.row_height = 35;
      gantt.config.scale_unit = "month";
      gantt.config.date_scale = "%M %Y";
      gantt.config.subscales = [{ unit: "day", step: 1, date: "%d" }];
      gantt.config.readonly = false;
      gantt.config.drag_move = true;
      gantt.config.drag_progress = true;
      gantt.config.drag_links = true;
      gantt.config.autoscroll = true;
      gantt.config.duration_unit = "day";
      gantt.config.highlight_critical_path = false;
      gantt.config.undo = true;

      // Make sure the chart starts at a real date, not year 1900+
      gantt.config.start_date = new Date(2025, 3, 1); // April 2025
      gantt.config.end_date = new Date(2025, 11, 31); // Dec 2025

      // Initialize and parse your tasks
      gantt.init(container.current);
      gantt.parse({
        data: [
          { id: 1, text: "Construction plans", start_date: "2025-05-01", duration: 218.71, progress: 0.4, open: true },
          { id: 2, text: "Johnson's house", start_date: "2025-05-01", duration: 160, parent: 1, open: true },
          { id: 3, text: "Contract", start_date: "2025-05-01", duration: 30, parent: 2, open: true },
          { id: 4, text: "Supply construction agreement", start_date: "2025-05-01", duration: 15, parent: 3 },
          { id: 5, text: "Estimation construction costs", start_date: "2025-05-16", duration: 11, parent: 3 },
          { id: 6, text: "Sign contract", start_date: "2025-05-27", duration: 4, parent: 3 },
          { id: 7, text: "Design", start_date: "2025-05-30", duration: 32, parent: 2, open: true },
          { id: 8, text: "Outline design", start_date: "2025-05-30", duration: 16, parent: 7 },
          { id: 9, text: "Scheme design", start_date: "2025-06-15", duration: 16, parent: 7 },
          { id: 10, text: "Obtain permits", start_date: "2025-07-01", duration: 10, parent: 2 },
          { id: 11, text: "Secure financing", start_date: "2025-07-18", duration: 5, parent: 2 },
          { id: 12, text: "Site works", start_date: "2025-07-23", duration: 20, parent: 2 },
          { id: 13, text: "Foundation", start_date: "2025-07-31", duration: 26, parent: 2 },
          { id: 14, text: "Roof", start_date: "2025-08-26", duration: 13, parent: 2 },
          { id: 15, text: "Inspection", start_date: "2025-09-08", duration: 30, parent: 2 },
          { id: 16, text: "Move in", start_date: "2025-10-08", duration: 0, parent: 2 },
          { id: 17, text: "Joplin's House", start_date: "2025-10-08", duration: 58.71, parent: 1, open: true },
          { id: 18, text: "Tender", start_date: "2025-10-08", duration: 21, parent: 17, open: true },
          { id: 19, text: "Issue tender documentation", start_date: "2025-10-08", duration: 11, parent: 18 },
          { id: 20, text: "Tender interviews", start_date: "2025-10-19", duration: 10, parent: 18 },
          { id: 21, text: "Contract", start_date: "2025-10-28", duration: 37.71, parent: 17 },
        ],
        links: [
          { id: 1, source: 1, target: 2, type: "0" },
          { id: 2, source: 2, target: 3, type: "0" },
          { id: 3, source: 4, target: 5, type: "0" },
          { id: 4, source: 5, target: 6, type: "0" },
          { id: 5, source: 3, target: 7, type: "0" },
          { id: 6, source: 8, target: 9, type: "0" },
          { id: 7, source: 10, target: 11, type: "0" },
          { id: 8, source: 11, target: 12, type: "0" },
          { id: 9, source: 12, target: 13, type: "0" },
          { id: 10, source: 14, target: 15, type: "0" },
          { id: 11, source: 15, target: 16, type: "0" },
          { id: 12, source: 17, target: 18, type: "0" },
          { id: 13, source: 19, target: 20, type: "0" },
          { id: 14, source: 18, target: 21, type: "0" }
        ],
      });
    }
    return () => {
      gantt.clearAll();
    };
  }, []);

  // Native DHTMLX toolbar behaviors
  const trigger = (action: string) => {
  switch (action) {
    case "expand":
      (gantt as any).eachTask((task: any) => task.$open = true);
      (gantt as any).render();
      break;
    case "collapse":
      (gantt as any).eachTask((task: any) => task.$open = false);
      (gantt as any).render();
      break;
    case "undo":
      (gantt as any).undo();
      break;
    case "redo":
      (gantt as any).redo();
      break;
    case "autoSchedule":
      // autoSchedule may be part of an extension or plugin — confirm it's loaded or use standalone code
      if ((gantt as any).autoSchedule) (gantt as any).autoSchedule();
      break;
    case "critical":
      gantt.config.highlight_critical_path = !gantt.config.highlight_critical_path;
      gantt.render();
      break;
    case "zoomToFit":
      if ((gantt as any).zoomToFit) (gantt as any).zoomToFit();
      break;
    case "fullscreen":
      if ((gantt as any).expand) (gantt as any).expand();
      break;
    case "pdf":
      if ((gantt as any).exportToPDF) (gantt as any).exportToPDF();
      break;
    case "png":
      if ((gantt as any).exportToPNG) (gantt as any).exportToPNG();
      break;
    case "excel":
      if ((gantt as any).exportToExcel) (gantt as any).exportToExcel();
      break;
  }
};


  // Bottom/toolbar row as in screenshot (you can further style in Dhx.css)
  return (
    <div className="dhx-gantt-root">
      <div className="dhx-gantt-container" style={{ minHeight: 540 }} ref={container} />
      <div className="dhx-gantt-toolbar" style={{
        display: "flex", flexWrap: "wrap", justifyContent: "start",
        alignItems: "center", borderTop: "1px solid #eee", gap: 14, padding: "14px 0", background: "#f7f7f7"
      }}>
        <label style={{marginRight:10}}>
          <input type="checkbox" onChange={e => trigger(e.target.checked ? "collapse" : "expand")} />
          Collapse Rows
        </label>
        <button className="material-icons" style={{marginRight:6}} onClick={() => trigger("undo")}>undo</button>
        <button className="material-icons" style={{marginRight:6}} onClick={() => trigger("redo")}>redo</button>
        <button style={{marginRight:8}} onClick={() => trigger("autoSchedule")}>Auto Scheduling</button>
        <button style={{marginRight:8}} onClick={() => trigger("critical")}>Critical Path</button>
        <button style={{marginRight:8}} onClick={() => trigger("zoomToFit")}>Zoom to Fit</button>
        <select style={{marginRight:8}} onChange={e => {
          gantt.config.scale_unit = e.target.value as any;
          gantt.render();
        }}>
          <option value="month">Quarters</option>
          <option value="year">Years</option>
          <option value="day">Days</option>
        </select>
        <button style={{marginRight:8}} onClick={() => trigger("fullscreen")}>Fullscreen</button>
        <button style={{marginRight:8}} onClick={() => trigger("pdf")}>Export to PDF</button>
        <button style={{marginRight:8}} onClick={() => trigger("png")}>Export to PNG</button>
        <button style={{marginRight:8}} onClick={() => trigger("excel")}>Export to Excel</button>
      </div>
    </div>
  );
};

export default Dhx;
