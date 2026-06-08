import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus, Clock, Phone, Users } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface Event {
  id: string;
  date: number;
  title: string;
  type: 'meeting' | 'call' | 'discussion';
  time: string;
  attendees?: string;
}

interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
  events: Event[];
}

export default function CalendarPage() {
  const { dark } = useTheme();
  const [currentMonth, setCurrentMonth] = useState(5); // June (0-indexed)
  const [currentYear, setCurrentYear] = useState(2026);
  const [selectedDate, setSelectedDate] = useState<number | null>(1);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', type: 'meeting' as Event['type'], time: '10:00 AM' });

  // Fake events for June 2026
  const [events, setEvents] = useState<Event[]>([
    { id: '1', date: 3, title: 'Priya & Arjun Meeting', type: 'meeting', time: '10:00 AM' },
    { id: '2', date: 5, title: 'Follow-up Call - Sarah', type: 'call', time: '2:30 PM' },
    { id: '3', date: 8, title: 'Family Discussion Group', type: 'discussion', time: '6:00 PM' },
    { id: '4', date: 12, title: 'Anjali & Rohan Meeting', type: 'meeting', time: '11:00 AM' },
    { id: '5', date: 15, title: 'Compatibility Review Call', type: 'call', time: '3:00 PM' },
    { id: '6', date: 18, title: 'Client Success Sync', type: 'meeting', time: '4:00 PM' },
    { id: '7', date: 22, title: 'Preferences Alignment Call', type: 'call', time: '2:00 PM' },
    { id: '8', date: 25, title: 'Match Feedback Session', type: 'discussion', time: '5:30 PM' },
    { id: '9', date: 28, title: 'Relationship Milestone Check', type: 'meeting', time: '10:30 AM' },
  ]);

  const handleAddEvent = () => {
    if (!newEvent.title.trim() || !selectedDate) return;
    const addedEvent: Event = {
      id: Date.now().toString(),
      date: selectedDate,
      title: newEvent.title,
      type: newEvent.type,
      time: newEvent.time,
    };
    setEvents([...events, addedEvent]);
    setIsAddEventModalOpen(false);
    setNewEvent({ title: '', type: 'meeting', time: '10:00 AM' });
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendarDays = (): CalendarDay[] => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const daysInPrevMonth = getDaysInMonth(currentMonth - 1, currentMonth === 0 ? currentYear - 1 : currentYear);
    const days: CalendarDay[] = [];

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        date: daysInPrevMonth - i,
        isCurrentMonth: false,
        events: [],
      });
    }

    // Current month days
    for (let date = 1; date <= daysInMonth; date++) {
      const dayEvents = events.filter((e) => e.date === date);
      days.push({
        date,
        isCurrentMonth: true,
        events: dayEvents,
      });
    }

    // Next month days
    const remainingDays = 42 - days.length; // 6 weeks * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: i,
        isCurrentMonth: false,
        events: [],
      });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const selectedDateEvents = events.filter((e) => e.date === selectedDate);

  const getEventColor = (type: string) => {
    switch (type) {
      case 'meeting':
        return 'bg-charcoal text-gold-200 border border-gold-400/30';
      case 'call':
        return 'bg-gold-100 text-gold-900 border border-gold-300';
      case 'discussion':
        return 'bg-[#d9ccb2] text-charcoal border border-black/10';
      default:
        return 'bg-gray-200 text-charcoal border border-black/10';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'call':
        return <Phone className="w-3 h-3" />;
      case 'discussion':
        return <Users className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
    }
  };

  return (
    <div className="page-shell">
      <div className="flex flex-col justify-between gap-5 border-b border-black/10 pb-7 sm:flex-row sm:items-end dark:border-white/10">
        <div>
          <span className="page-kicker">Private appointments</span>
          <h1 className={`editorial-title ${dark ? 'text-white' : 'text-charcoal'}`}>
            Calendar
          </h1>
          <p className={`mt-3 text-sm ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
            A considered view of every introduction, call, and consultation
          </p>
        </div>
        <button 
          className="btn-gold self-start sm:self-auto"
          onClick={() => {
            if (!selectedDate) setSelectedDate(1);
            setIsAddEventModalOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <motion.div className={`lg:col-span-2 card-premium ${dark ? 'bg-gray-800' : 'bg-white'} p-6`}>
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <h2 className={`font-display text-2xl font-bold ${dark ? 'text-white' : 'text-charcoal'}`}>
              {monthNames[currentMonth]} {currentYear}
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (currentMonth === 0) {
                    setCurrentMonth(11);
                    setCurrentYear(currentYear - 1);
                  } else {
                    setCurrentMonth(currentMonth - 1);
                  }
                }}
                className={`p-2 rounded-lg ${
                  dark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                } transition-colors`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  if (currentMonth === 11) {
                    setCurrentMonth(0);
                    setCurrentYear(currentYear + 1);
                  } else {
                    setCurrentMonth(currentMonth + 1);
                  }
                }}
                className={`p-2 rounded-lg ${
                  dark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                } transition-colors`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Day Names */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {dayNames.map((day) => (
              <div
                key={day}
                className={`text-center text-sm font-semibold py-2 ${
                  dark ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, index) => (
              <motion.button
                key={index}
                onClick={() => setSelectedDate(day.isCurrentMonth ? day.date : null)}
                className={`aspect-square p-2 rounded-lg transition-all text-sm font-medium relative flex flex-col items-center justify-center ${
                  !day.isCurrentMonth
                    ? dark
                      ? 'bg-gray-700 text-gray-500'
                      : 'bg-gray-100 text-gray-400'
                    : selectedDate === day.date
                      ? 'bg-gold-400 text-white'
                      : dark
                        ? 'hover:bg-gray-700 text-white'
                        : 'hover:bg-gray-100 text-charcoal'
                }`}
              >
                <span>{day.date}</span>
                {day.events.length > 0 && (
                  <div className="flex gap-0.5 mt-1">
                    {day.events.slice(0, 3).map((_, i) => (
                      <div
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full ${
                          selectedDate === day.date ? 'bg-white' : 'bg-gold-400'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Events Sidebar */}
        <motion.div className={`card-premium ${dark ? 'bg-gray-800' : 'bg-white'} p-6`}>
          <h3 className={`font-semibold mb-4 ${dark ? 'text-white' : 'text-charcoal'}`}>
            {selectedDate
              ? `${monthNames[currentMonth]} ${selectedDate}, ${currentYear}`
              : 'Select a Date'}
          </h3>

          {selectedDate ? (
            <div className="space-y-3">
              {selectedDateEvents.length > 0 ? (
                selectedDateEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    className={`p-3 rounded-lg ${getEventColor(event.type)} space-y-1`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex items-start gap-2">
                      {getEventIcon(event.type)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold">{event.title}</p>
                        <p className="text-xs opacity-90">{event.time}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                  No events scheduled
                </p>
              )}
              <button 
                className="btn-gold w-full py-2 mt-4 flex items-center justify-center gap-2 text-sm"
                onClick={() => setIsAddEventModalOpen(true)}
              >
                <Plus className="w-4 h-4" />
                Add Event
              </button>
            </div>
          ) : (
            <p className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
              Select a date to view events
            </p>
          )}

          {/* Upcoming Events */}
          <div className={`mt-6 pt-6 border-t ${dark ? 'border-gray-700' : 'border-gold-400/20'}`}>
            <h4 className={`font-semibold text-sm mb-3 ${dark ? 'text-white' : 'text-charcoal'}`}>
              Upcoming
            </h4>
            <div className="space-y-2">
              {events.slice(0, 4).map((event) => (
                <div
                  key={event.id}
                  className={`text-xs p-2 rounded ${dark ? 'bg-gray-700' : 'bg-gray-100'}`}
                >
                  <p className={dark ? 'text-white' : 'text-charcoal'}>{event.title}</p>
                  <p className={dark ? 'text-gray-400' : 'text-gray-600'}>
                    {monthNames[currentMonth]} {event.date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {isAddEventModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`w-full max-w-md p-6 rounded-xl border shadow-xl ${dark ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-200 text-charcoal'}`}
          >
            <h2 className="text-xl font-bold mb-4">Add Event on {monthNames[currentMonth]} {selectedDate}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase mb-1">Event Title</label>
                <input
                  type="text"
                  className="input-premium w-full"
                  placeholder="e.g., Follow-up call with Arjun"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase mb-1">Time</label>
                  <input
                    type="time"
                    className="input-premium w-full"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase mb-1">Type</label>
                  <select
                    className="input-premium w-full"
                    value={newEvent.type}
                    onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as Event['type'] })}
                  >
                    <option value="meeting">Meeting</option>
                    <option value="call">Call</option>
                    <option value="discussion">Discussion</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  className="flex-1 py-2 text-sm border border-gray-500 rounded-lg"
                  onClick={() => setIsAddEventModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 btn-gold py-2 text-sm rounded-lg"
                  onClick={handleAddEvent}
                >
                  Add Event
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
