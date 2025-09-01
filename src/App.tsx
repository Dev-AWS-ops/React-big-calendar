import { useCallback, useMemo, useState } from "react";
import {
  Calendar,
  dateFnsLocalizer,
  Views,
  type DateLocalizer,
  type Event as RBCEvent,
} from "react-big-calendar";
import type { Locale } from "date-fns";
import type { View } from "react-big-calendar";
import withDragAndDrop, {
  type withDragAndDropProps,
} from "react-big-calendar/lib/addons/dragAndDrop";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "./App.css";

const locales: Record<string, Locale> = { "en-US": enUS };
const localizer: DateLocalizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export type CalendarEvent = RBCEvent & {
  id: number | string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  resource?: any;
};

const initialEvents: CalendarEvent[] = [
  {
    id: 1,
    title: "Project Sync",
    start: new Date(2025, 7, 5, 11, 0),
    end: new Date(2025, 7, 5, 12, 0),
  },
  {
    id: 2,
    title: "Brainstorm Workshop",
    start: new Date(2025, 7, 12, 14, 0),
    end: new Date(2025, 7, 12, 15, 30),
  },
  {
    id: 3,
    title: "Team Meeting",
    start: new Date(2025, 7, 25, 10, 0),
    end: new Date(2025, 7, 25, 11, 0),
  },
  {
    id: 4,
    title: "Client Call",
    start: new Date(2025, 7, 27, 14, 0),
    end: new Date(2025, 7, 27, 15, 0),
  },
  {
    id: 5,
    title: "Project Kickoff",
    start: new Date(2025, 8, 5, 9, 30),
    end: new Date(2025, 8, 5, 11, 0),
  },
  {
    id: 6,
    title: "Design Review",
    start: new Date(2025, 9, 12, 15, 0),
    end: new Date(2025, 9, 12, 16, 30),
  },
  {
    id: 7,
    title: "Year-End Planning",
    start: new Date(2025, 11, 3, 13, 0),
    end: new Date(2025, 11, 3, 14, 30),
  },
];

const DnDCalendar = withDragAndDrop<CalendarEvent, withDragAndDropProps<CalendarEvent>>(Calendar as any);

export default function App() {
  const [view, setView] = useState<View>(Views.MONTH as View);

  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);

  const handleSelectSlot = useCallback((slotInfo: any) => {
    const title = window.prompt("New event title?");
    if (!title) return;

    const newEvent: CalendarEvent = {
      id: Math.random().toString(36).slice(2),
      title,
      start: slotInfo.start,
      end: slotInfo.end,
      allDay: slotInfo.action === "select" && view === Views.MONTH ? true : false,
    };
    setEvents((prev) => [...prev, newEvent]);
  }, [view]);

  const handleEventDrop = useCallback((data: any) => {
    const { event, start, end, isAllDay } = data;
    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === event.id
          ? { ...ev, start, end, allDay: isAllDay ?? ev.allDay }
          : ev
      )
    );
  }, []);

  const handleEventResize = useCallback((data: any) => {
    const { event, start, end } = data;
    setEvents((prev) =>
      prev.map((ev) => (ev.id === event.id ? { ...ev, start, end } : ev))
    );
  }, []);

  const components = useMemo(() => ({
  }), []);

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
      <DnDCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%", width: "100%", background: "white" }}
        views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
        view={view}
        date={date}
        onView={(newView: View) => setView(newView)}
        onNavigate={(newDate) => setDate(newDate)}
        onEventDrop={handleEventDrop}
        onEventResize={handleEventResize}
        resizable
        selectable
        onSelectSlot={handleSelectSlot}
        step={15}
        timeslots={4}
        popup
        draggableAccessor={() => true}
        components={components}
        messages={{
          today: "Today",
          previous: "Back",
          next: "Next",
        }}
      />
    </div>
  );
}
