import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import './App.css';
import { mockEvents } from './data/mockEvents';

// TypeScript interfaces
interface Event {
  id: string;
  name: string;
  date: string;
  category: string;
  location: string;
}

const App: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterDate, setFilterDate] = useState<string>('');

  // Fetch events (replace with real API call)
  useEffect(() => {
    // Example: axios.get('https://www.eventbriteapi.com/v3/events/search?location.address=Seattle')
    setEvents(mockEvents);
  }, []);

  // Filter events
  const filteredEvents = events.filter(event => 
    (filterCategory === 'All' || event.category === filterCategory) &&
    (!filterDate || event.date.includes(filterDate))
  );

  // Unique categories for filter
  const categories = ['All', ...new Set(events.map(event => event.category))];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">Seattle Eastside Event Finder</h1>
        <p className="text-gray-600">Find local events in Bellevue, Redmond, and Kirkland</p>
      </header>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-3xl mx-auto">
        <div className="flex-1">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select
            id="category"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            aria-label="Select event category"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
          <input
            id="date"
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            aria-label="Select event date"
          />
        </div>
      </div>

      {/* Event List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <div
              key={event.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
              role="article"
            >
              <h2 className="text-xl font-semibold text-blue-500">{event.name}</h2>
              <p className="text-gray-600">Date: {event.date}</p>
              <p className="text-gray-600">Category: {event.category}</p>
              <p className="text-gray-600">Location: {event.location}</p>
              <button
                className="mt-2 text-blue-600 hover:underline"
                onClick={() => alert(`Saved ${event.name} to favorites`)}
                aria-label={`Save ${event.name} to favorites`}
              >
                Save to Favorites
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">No events found.</p>
        )}
      </div>
    </div>
  );
};

export default App;