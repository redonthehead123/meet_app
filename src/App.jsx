import React, { useState, useEffect } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { getEvents } from './api';

/**
 * Main App Component
 * 
 * Manages global state for events and number of events to display.
 * Coordinates data fetching and communication between CitySearch, 
 * NumberOfEvents, and EventList components.
 * 
 * @returns {JSX.Element} App container with integrated components
 */
const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);

  useEffect(() => {
    getEvents().then(data => setEvents(data));
  }, []);

  const displayedEvents = events.slice(0, currentNOE);

  return (
    <div>
      <CitySearch />
      <NumberOfEvents currentNOE={currentNOE} setCurrentNOE={setCurrentNOE} />
      <EventList events={displayedEvents} />
    </div>
  );
}


export default App;