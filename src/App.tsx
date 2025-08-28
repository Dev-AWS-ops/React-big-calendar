import React, { useMemo } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import { startOfWeek } from "date-fns/startOfWeek";
import { getDay } from "date-fns/getDay";
import { addWeeks} from "date-fns/addWeeks";
import { enUS } from "date-fns/locale/en-US";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar-theme.css";
import "./App.css";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

type CalEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color?: string;
};

const nextWeekday = (start: Date, weekday: number) => {
  const date = new Date(start);
  const diff = (weekday + 7 - date.getDay()) % 7;
  date.setDate(date.getDate() + diff);
  date.setHours(0, 0, 0, 0);
  return date;
};

const App: React.FC = () => {
  const events: CalEvent[] = useMemo(() => {
    const today = new Date();

    // Recurring weekly meeting templates
    const meetingTemplates = [
      { id: "m1", title: "Strategy Call", weekday: 1, hour: 10, durationH: 1, color: "#7FB3D5" }, 
      { id: "m2", title: "Growth Review", weekday: 2, hour: 14, durationH: 1, color: "#A9DFBF" }, 
      { id: "m3", title: "Client Sync", weekday: 3, hour: 9, durationH: 1, color: "#F9E79F" },   
      { id: "m4", title: "Team Standup", weekday: 5, hour: 16, durationH: 1, color: "#D7BDE2" },  
    ];

    const weeksToGenerate = 8; // generate 8 weeks of recurring meetings
    const out: CalEvent[] = [];

    meetingTemplates.forEach((t) => {
      const first = nextWeekday(today, t.weekday);
      for (let i = 0; i < weeksToGenerate; i++) {
        const base = addWeeks(first, i);
        const start = new Date(base);
        start.setHours(t.hour, 0, 0, 0);
        const end = new Date(start);
        end.setHours(start.getHours() + t.durationH);
        out.push({
          id: `${t.id}-${i}`,
          title: t.title,
          start,
          end,
          color: t.color,
        });
      }
    });

    // Add 5 one-time project discussion meetings
    const projectColor = "#AED6F1"; // pastel light blue
    out.push(
      {
        id: "p1",
        title: "Project Discussion #1",
        start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 11, 0),
        end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 12, 0),
        color: projectColor,
      },
      {
        id: "p2",
        title: "Project Discussion #2",
        start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3, 15, 0),
        end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3, 16, 0),
        color: projectColor,
      },
      {
        id: "p3",
        title: "Project Discussion #3",
        start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5, 10, 0),
        end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5, 11, 0),
        color: projectColor,
      },
      {
        id: "p4",
        title: "Project Discussion #4",
        start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7, 14, 0),
        end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7, 15, 0),
        color: projectColor,
      },
      {
        id: "p5",
        title: "Project Discussion #5",
        start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10, 9, 0),
        end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10, 10, 0),
        color: projectColor,
      }
    );

    return out;
  }, []);

  // Style events by their assigned color
  const eventStyleGetter = (event: any) => {
    const bg = event.color || "#3174ad";
    const style: React.CSSProperties = {
      backgroundColor: bg,
      borderRadius: 6,
      opacity: 0.98,
      color: "#1b1b1b",
      border: "none",
      padding: "3px 6px",
      boxShadow: "0 1px 0 rgba(0,0,0,0.06)",
    };
    return { style };
  };

  return (
    <div className="calendar-fullscreen">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "90vh", width: "95vw", backgroundColor: "#ffffff" }}
        eventPropGetter={eventStyleGetter}
        views={["month", "week", "day", "agenda"]}
        defaultView={"month"}
        popup
      />
    </div>
  );
};

export default App;
