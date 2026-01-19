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

        const num = Number(next);

        // Validate: error if not a number or <= 0 or > 250
        if (isNaN(num) || num <= 0 || num > 250) {
            setErrorAlert('Please enter a number between 1 and 250');
        } else {
            setErrorAlert('');
            setCurrentNOE(num);
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