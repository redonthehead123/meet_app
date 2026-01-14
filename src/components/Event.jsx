import React, { useState } from 'react';

/**
 * Event Component
 * 
 * Displays a single event with collapsible details section.
 * Shows event summary, date/time, location, and optional description.
 * 
 * @param {Object} event - Event object containing summary, start, location, description, etc.
 * @returns {JSX.Element} List item with event information and toggle for details
 */
const Event = ({ event }) => {
    const [showDetails, setShowDetails] = useState(false);
    const toggleDetails = () => setShowDetails((s) => !s);
    const detailsId = event && event.id ? `event-details-${event.id}` : undefined;

    return (
        <li className="event" aria-labelledby={event && event.id ? `event-title-${event.id}` : undefined}>
            <h2 id={event && event.id ? `event-title-${event.id}` : undefined} className="event-summary">{event && event.summary}</h2>
            <p className="event-start">
                {event && (event.start && event.start.dateTime ? event.start.dateTime : event.start)}
                {event && event.start && (event.start.timeZone || event.start.timezone) ? (
                    <span className="event-timezone">{` ${event.start.timeZone || event.start.timezone}`}</span>
                ) : null}
            </p>
            <p className="event-location">{event && event.location}</p>

            <button
                className="details-toggle"
                onClick={toggleDetails}
                aria-expanded={showDetails}
                aria-controls={detailsId}
            >
                {showDetails ? 'hide details' : 'show details'}
            </button>

            {showDetails && event && event.description ? (
                <div id={detailsId} className="event-details" role="region" aria-labelledby={event && event.id ? `event-title-${event.id}` : undefined}>
                    <h3 className="about-title">About event:</h3>
                    {event.htmlLink ? (
                        <p><a className="event-link" href={event.htmlLink} target="_blank" rel="noopener noreferrer">See details on Google Calendar</a></p>
                    ) : null}
                    <p className="event-description">{event.description}</p>
                </div>
            ) : null}
        </li>
    );
};

export default Event;