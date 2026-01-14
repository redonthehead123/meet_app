import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';
import App from '../App';

/**
 * Unit Tests for NumberOfEvents Component
 * Tests input validation, state management, and parent callbacks
 */
describe('<NumberOfEvents /> component', () => {
    let input;
    let renderResult;
    let defaultValue;

    beforeAll(() => {
        defaultValue = '32';
    });

    beforeEach(() => {
        renderResult = render(<NumberOfEvents />);
        input = renderResult.getByRole('spinbutton');
    });

    test('contains a textbox input', () => {
        expect(input).toBeInTheDocument();
    });

    test('has default value of 32', () => {
        expect(input.value).toBe(defaultValue);
    });

    test('has an id of number-of-events for App-level querying', () => {
        expect(input.id).toBe('number-of-events');
    });

    test('updates value when user types', async () => {
        await userEvent.type(input, '{backspace}{backspace}10');
        expect(input.value).toBe('10');
    });

    test('calls setCurrentNOE prop when user types a numeric value', async () => {
        const mockSet = jest.fn();
        renderResult.rerender(<NumberOfEvents setCurrentNOE={mockSet} />);
        const numInput = renderResult.getByRole('spinbutton');
        await userEvent.type(numInput, '{backspace}{backspace}10');
        expect(mockSet).toHaveBeenCalledWith(10);
    });

    test('does not call setCurrentNOE when input is non-numeric', async () => {
        const mockSet = jest.fn();
        renderResult.rerender(<NumberOfEvents setCurrentNOE={mockSet} />);
        const numInput = renderResult.getByRole('spinbutton');
        await userEvent.clear(numInput);
        await userEvent.type(numInput, 'ab');
        expect(mockSet).not.toHaveBeenCalled();
    });
});

/**
 * Integration Tests for NumberOfEvents with App Component
 * Tests component interaction with full application state management
 */
describe('<NumberOfEvents /> integration', () => {
    test('when the user changes the number of events in the input, the number of rendered events changes accordingly', async () => {
        const { container } = render(<App />);

        await waitFor(() => expect(container.querySelectorAll('.event').length).toBeGreaterThan(0));

        const numberInput = container.querySelector('#number-of-events');
        expect(numberInput).toBeInTheDocument();

        await userEvent.type(numberInput, '{backspace}{backspace}6');

        await waitFor(() => expect(container.querySelectorAll('.event').length).toBe(6));
    });
});