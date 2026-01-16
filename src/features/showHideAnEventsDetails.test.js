/* eslint-env jest */
import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import mockEvents from '../mock-data';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
    test('Expand an event to view details', ({ given, when, then }) => {
        let AppComponent;
        let firstEvent;

        given('the user is viewing the events list', async () => {
            AppComponent = render(<App />);
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBeGreaterThan(0);
                firstEvent = EventListItems[0];
            });
        });

        when('the user clicks on an event to expand it', async () => {
            const user = userEvent.setup();
            const btn = within(firstEvent).getByRole('button');
            await user.click(btn);
        });

        then('the event should expand and display full details (description, location, time, etc.)', () => {
            expect(within(firstEvent).getByText('About event:')).toBeTruthy();
            const sample = mockEvents[0];
            expect(within(firstEvent).getByText(/Have you wondered how you can ask Google/i)).toBeTruthy();
            expect(within(firstEvent).getByText(sample.location)).toBeTruthy();
            const btn = within(firstEvent).getByRole('button');
            expect(btn.textContent).toBe('hide details');
        });
    });

    test('Collapse an event to hide details', ({ given, when, then }) => {
        let AppComponent;
        let firstEvent;

        given('an event is expanded and showing full details', async () => {
            AppComponent = render(<App />);
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBeGreaterThan(0);
                firstEvent = EventListItems[0];
            });
            
            const user = userEvent.setup();
            const btn = within(firstEvent).getByRole('button');
            await user.click(btn);
            expect(within(firstEvent).getByText('About event:')).toBeTruthy();
        });

        when('the user clicks to collapse the event', async () => {
            const user = userEvent.setup();
            const btn = within(firstEvent).getByRole('button');
            await user.click(btn);
        });

        then('the event should collapse and hide the additional information', () => {
            expect(within(firstEvent).queryByText('About event:')).toBeNull();
            const btn = within(firstEvent).getByRole('button');
            expect(btn.textContent).toBe('show details');
        });
    });
});