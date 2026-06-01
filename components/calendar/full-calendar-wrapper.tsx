"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";
import "./calendar.css";
import { Video, AlertTriangle, Clock } from "lucide-react";

export default function FullCalendarWrapper() {
  const [events, setEvents] = useState([
    {
      id: "1",
      title: "Md Tajuddin",
      start: "2026-05-11T09:30:00",
      end: "2026-05-11T10:00:00",
      extendedProps: { type: "consultation", room: "Room 101" },
    },
    {
      id: "2",
      title: "Sophie Laurent",
      start: "2026-05-11T10:30:00",
      end: "2026-05-11T11:00:00",
      extendedProps: { type: "video", room: "Telehealth Hub" },
    },
    {
      id: "3",
      title: "Marc Aubert",
      start: "2026-05-11T14:00:00",
      end: "2026-05-11T15:00:00",
      extendedProps: { type: "urgent", room: "Room 205 (OR)" },
    },
    {
      id: "4",
      title: "Julie Martin",
      start: "2026-05-12T11:00:00",
      end: "2026-05-12T11:30:00",
      extendedProps: { type: "consultation", room: "Room 102" },
    }
  ]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden p-6 transition-colors">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        initialDate="2026-05-11"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        nowIndicator={true}
        slotMinTime="08:00:00"
        slotMaxTime="20:00:00"
        allDaySlot={false}
        height="750px"
        eventContent={(eventInfo) => {
          const { type, room } = eventInfo.event.extendedProps;
          return (
            <div className={`w-full h-full p-2 border-l-4 rounded-r-lg overflow-hidden flex flex-col justify-between ${
              type === 'urgent' ? 'bg-rose-500/10 border-rose-500 text-rose-700' :
              type === 'video' ? 'bg-indigo-500/10 border-indigo-500 text-indigo-700' :
              'bg-teal-500/10 border-teal-500 text-teal-700'
            }`}>
              <div className="flex items-center justify-between gap-1">
                 <span className="text-[10px] font-black truncate">{eventInfo.event.title}</span>
                 {type === 'video' ? <Video className="w-2.5 h-2.5" /> : 
                  type === 'urgent' ? <AlertTriangle className="w-2.5 h-2.5" /> : 
                  <Clock className="w-2.5 h-2.5" />}
              </div>
              <div className="text-[8px] font-bold opacity-60 truncate">
                 {room}
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}
