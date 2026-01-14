import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Event from '../components/Event';
import { getEvents } from '../api';

describe('<Event /> component', () => {
    let event;
    let renderResult;

    beforeAll(async () => {
        const allEvents = await getEvents();
        event = allEvents[0];
    });

    beforeEach(() => {
        renderResult = render(<Event event={event} />);
    });

    test('renders event title (summary)', () => {
        expect(renderResult.queryByText(event.summary)).toBeInTheDocument();
    });

    test('renders event start time', () => {
        const startText = event.start && event.start.dateTime ? event.start.dateTime : event.start;
        expect(renderResult.queryByText(startText)).toBeInTheDocument();
    });

    test('renders event start when start.dateTime is present (object)', () => {
        const ev = {
            summary: 'React is Fun',
            start: { dateTime: '2020-05-20T14:00:00+02:00' },
            location: 'Berlin, Germany',
        };
        const { queryByText: q } = render(<Event event={ev} />);
        expect(q('2020-05-20T14:00:00+02:00')).toBeInTheDocument();
    });

    test('renders event start when start is a string (fallback)', () => {
        const ev = {
            summary: 'Local meetup',
            start: '2020-05-20',
            location: 'London, UK',
        };
        const { queryByText: q } = render(<Event event={ev} />);
        expect(q('2020-05-20')).toBeInTheDocument();
    });

    test('renders event location', () => {
        expect(renderResult.queryByText(event.location)).toBeInTheDocument();
    });

    test("event details are hidden by default", () => {
        const detailsSection = renderResult.container.querySelector('.event-details');
        expect(detailsSection).not.toBeInTheDocument();
    });

    test('renders event details button with the title (show details)', () => {
        expect(renderResult.queryByText('show details')).toBeInTheDocument();
    });

    test('shows event details when user clicks "show details"', async () => {
        const button = renderResult.queryByText('show details');
        await userEvent.click(button);
        const detailsSection = renderResult.container.querySelector('.event-details');
        expect(detailsSection).toBeInTheDocument();
        expect(renderResult.queryByText('hide details')).toBeInTheDocument();
    });

    test('hides event details when user clicks "hide details"', async () => {
        const openButton = renderResult.queryByText('show details');
        await userEvent.click(openButton);
        const hideButton = renderResult.queryByText('hide details');
        await userEvent.click(hideButton);
        const detailsSection = renderResult.container.querySelector('.event-details');
        expect(detailsSection).not.toBeInTheDocument();
        expect(renderResult.queryByText('show details')).toBeInTheDocument();
    });
});