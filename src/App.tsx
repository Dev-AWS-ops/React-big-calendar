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

// Example events (2 meetings only)
const events = [
  {
    title: "Team Meeting",
    start: new Date(2025, 7, 25, 10, 0), // Aug 25, 2025 10:00
    end: new Date(2025, 7, 25, 11, 0),
  },
  {
    title: "Client Call",
    start: new Date(2025, 7, 27, 14, 0), // Aug 27, 2025 2:00 PM
    end: new Date(2025, 7, 27, 15, 0),
  },
];

export default function App() {
  const [view, setView] = useState<View>("month"); // ✅ fixed type
  const [date, setDate] = useState(new Date());

  return (
    <div
      style={{
        height: "90vh", // 90% of screen height
        width: "90vw",  // 90% of screen width
        margin: "auto", // center
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
