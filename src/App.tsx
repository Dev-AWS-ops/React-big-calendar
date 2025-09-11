import { useCallback, useMemo, useState } from "react";
import {
  Calendar,
  dateFnsLocalizer,
  type DateLocalizer,
  type Event as RBCEvent,
} from "react-big-calendar";
import { Views, type View } from "react-big-calendar";

import withDragAndDrop, {
  type withDragAndDropProps,
} from "react-big-calendar/lib/addons/dragAndDrop";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "./App.css";

const locales = { "en-US": enUS };
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
  category: string;
};

const categories: Record<string, { bg: string; strip: string }> = {
  Hotel: { bg: "#e8f5e9", strip: "#2e7d32" },    // light green + dark green
  Client: { bg: "#e3f2fd", strip: "#1565c0" },  // light blue + dark blue
  Internal: { bg: "#fff3e0", strip: "#ef6c00" } // light orange + dark orange
};

const initialEvents: CalendarEvent[] = [
  { id: 1, title: "Hotel Booking Review", start: new Date(2025, 8, 9, 18), end: new Date(2025, 8, 9, 20), category: "Hotel" },
  { id: 2, title: "Hotel Partner Call", start: new Date(2025, 8, 9, 14), end: new Date(2025, 8, 9, 15), category: "Hotel" },
  { id: 3, title: "Client Presentation", start: new Date(2025, 8, 10, 15), end: new Date(2025, 8, 10, 16), category: "Client" },
  { id: 4, title: "Client Feedback Call", start: new Date(2025, 8, 11, 16), end: new Date(2025, 8, 11, 17), category: "Client" },
  { id: 5, title: "Team Sync", start: new Date(2025, 8, 12, 10), end: new Date(2025, 8, 12, 11), category: "Internal" },
  { id: 6, title: "Product Roadmap", start: new Date(2025, 8, 13, 13), end: new Date(2025, 8, 13, 15), category: "Internal" },

  // Long day events
  { id: 7, title: "Breakfast Meeting", start: new Date(2025, 8, 8, 9), end: new Date(2025, 8, 8, 12), category: "Internal" },
  { id: 8, title: "Lunch & Learn", start: new Date(2025, 8, 8, 11), end: new Date(2025, 8, 8, 14), category: "Client" },
  { id: 9, title: "Strategy Session", start: new Date(2025, 8, 8, 14), end: new Date(2025, 8, 8, 18), category: "Hotel" },

  // Multi-day events
  { id: 10, title: "Client Summit", start: new Date(2025, 8, 15, 9), end: new Date(2025, 8, 19, 17), category: "Client" },
  { id: 11, title: "Internal Training Week", start: new Date(2025, 8, 22, 9), end: new Date(2025, 8, 26, 17), category: "Internal" },
];

const DnDCalendar = withDragAndDrop<CalendarEvent, withDragAndDropProps<CalendarEvent>>(Calendar as any);

export default function App() {
  const [view, setView] = useState<View>(Views.WEEK);

  const [date, setDate] = useState(new Date(2025, 8, 8));
  const [events, setEvents] = useState(initialEvents);
  const [activeCategories, setActiveCategories] = useState<string[]>(Object.keys(categories));

  const filteredEvents = useMemo(
    () => events.filter((e) => activeCategories.includes(e.category)),
    [events, activeCategories]
  );

  const toggleCategory = (category: string) => {
    setActiveCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

const moveEvent: withDragAndDropProps<CalendarEvent>["onEventDrop"] = ({ event, start, end }) => {
  setEvents((prev) =>
    prev.map((e) =>
      e.id === event.id
        ? ({
            ...e,
            start: start as Date, // ensure Date type
            end: end as Date,
          } as CalendarEvent)
        : e
    )
  );
};

const resizeEvent: withDragAndDropProps<CalendarEvent>["onEventResize"] = ({ event, start, end }) => {
  setEvents((prev) =>
    prev.map((e) =>
      e.id === event.id
        ? ({
            ...e,
            start: start as Date,
            end: end as Date,
          } as CalendarEvent)
        : e
    )
  );
};


  const eventStyleGetter = useCallback(
    (event: CalendarEvent) => {
      const { bg, strip } =
        categories[event.category] || { bg: "#f5f5f5", strip: "#757575" };

      return {
        style: {
          backgroundColor: bg,
          color: strip, // left strip color
          border: "none",
        },
      };
    },
    []
  );

  return (
    <div className="calendar-container">
      <div className="calendar-sidebar">
        <h3>Filters</h3>
        {Object.entries(categories).map(([cat, { strip }]) => (
          <label key={cat} className="filter-option">
            <input
              type="checkbox"
              checked={activeCategories.includes(cat)}
              onChange={() => toggleCategory(cat)}
            />
            <span className="filter-color" style={{ background: strip }} />
            {cat}
          </label>
        ))}
      </div>

      <div className="calendar-main">
        <DnDCalendar
          localizer={localizer}
          events={filteredEvents}
          startAccessor="start"
          endAccessor="end"
          view={view}
          date={date}
          onView={setView}
          onNavigate={setDate}
          eventPropGetter={eventStyleGetter}
          resizable
          selectable
          draggableAccessor={() => true}
          popup
          onEventDrop={moveEvent}
          onEventResize={resizeEvent}
          style={{ height: "90vh", width: "100%" }}
          messages={{
            today: "Today",
            previous: "Back",
            next: "Next",
          }}
        />
      </div>
    </div>
  );
}
