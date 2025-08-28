import { useState } from "react";
import {
  Calendar,
  dateFnsLocalizer,
type View,
} from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS }from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./App.css";

// Setup localizer
const locales = {
  "en-US": enUS,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "Project Sync",
    start: new Date(2025, 7, 5, 11, 0), 
    end: new Date(2025, 7, 5, 12, 0),
  },
  {
    title: "Brainstorm Workshop",
    start: new Date(2025, 7, 12, 14, 0), 
    end: new Date(2025, 7, 12, 15, 30),
  },
  {
    title: "Team Meeting",
    start: new Date(2025, 7, 25, 10, 0),
    end: new Date(2025, 7, 25, 11, 0),
  },
  {
    title: "Client Call",
    start: new Date(2025, 7, 27, 14, 0),
    end: new Date(2025, 7, 27, 15, 0),
  },
  {
    title: "Project Kickoff",
    start: new Date(2025, 8, 5, 9, 30),
    end: new Date(2025, 8, 5, 11, 0),
  },
  {
    title: "Design Review",
    start: new Date(2025, 9, 12, 15, 0),
    end: new Date(2025, 9, 12, 16, 30),
  },
  {
    title: "Year-End Planning",
    start: new Date(2025, 11, 3, 13, 0),
    end: new Date(2025, 11, 3, 14, 30),
  },
];

export default function App() {
  const [view, setView] = useState<View>("month"); 
  const [date, setDate] = useState(new Date());

  return (
    <div
      style={{
        height: "90vh",
        width: "90vw",
        margin: "auto",
        background: "white",
        padding: "10px",
        boxSizing: "border-box",
      }}
    >
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%", width: "100%", background: "white" }}
        views={["month", "week", "day", "agenda"]}
        view={view}
        date={date}
        onView={(newView) => setView(newView)}
        onNavigate={(newDate) => setDate(newDate)}
      />
    </div>
  );
}
