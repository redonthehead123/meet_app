import React from 'react';
import Event from "./Event";

/**
 * EventList Component
 * 
 * Renders a list of Event components from the provided events array.
 * 
 * @param {Array} events - Array of event objects to display
 * @returns {JSX.Element} Unordered list of Event components
 */
const EventList = ({ events }) => {
 return (
   <ul id="event-list">
     {events ?
       events.map(event => <Event key={event.id} event={event} />) :
       null}
   </ul>
 );
}


export default EventList;