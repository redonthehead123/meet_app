import React, { useState, useEffect } from 'react';

/**
 * NumberOfEvents Component
 * 
 * Controlled input component for specifying how many events to display.
 * Maintains local state for rendering standalone in tests, while notifying
 * parent of numeric changes via setCurrentNOE callback.
 * 
 * @param {number} currentNOE - Current number of events to show (default: 32)
 * @param {Function} setCurrentNOE - Callback to notify parent of value changes
 * @param {Function} setErrorAlert - Callback to set error messages
 * @returns {JSX.Element} Input component with label
 */
const NumberOfEvents = ({ currentNOE = 32, setCurrentNOE = () => {}, setErrorAlert = () => {} }) => {
    const [value, setValue] = useState(String(currentNOE));

    useEffect(() => {
        setValue(String(currentNOE));
    }, [currentNOE]);

    const handleChange = (e) => {
        const next = e.target.value;
        setValue(next);

        // Trim whitespace and parse to number once for validation
        const trimmed = next.trim();
        const num = trimmed === '' ? NaN : Number(trimmed);

        // Only notify parent with valid numeric input to prevent transient updates
        if (/^\d+$/.test(trimmed) && typeof setCurrentNOE === 'function') {
            setCurrentNOE(Number(trimmed));
        }

        // Validate input range (1-250)
        const errorText = trimmed === '' || Number.isNaN(num) || num < 1 || num > 250
            ? 'Please enter a number between 1 and 250'
            : '';
        
        if (typeof setErrorAlert === 'function') {
            setErrorAlert(errorText);
        }
    };

    return (
        <div>
            <label htmlFor="number-of-events" className="noe-label">Number of events</label>
            <input
                id="number-of-events"
                role="spinbutton"
                type="number"
                min="1"
                max="250"
                value={value}
                onChange={handleChange}
                aria-label="Number of events to show"
            />
        </div>
    );
};

export default NumberOfEvents;