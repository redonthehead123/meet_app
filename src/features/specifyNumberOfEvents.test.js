import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
    test('Display default number of events', ({ given, when, then }) => {
        let AppComponent;

        given('the app is first loaded', () => {
            AppComponent = render(<App />);
        });

        when('no custom event count has been specified', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBeGreaterThan(0);
            });
        });

        then(/^the app should display (\d+) events by default$/, async (arg0) => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(Number(arg0));
            });
        });
    });

    test('Change the number of displayed events', ({ given, when, then }) => {
        let AppComponent;
        let NumberOfEventsInput;

        given('the user is viewing the events list', async () => {
            AppComponent = render(<App />);
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBeGreaterThan(0);
            });
            NumberOfEventsInput = AppDOM.querySelector('#number-of-events');
        });

        when('the user specifies a different number of events to display', async () => {
            const user = userEvent.setup();
            await user.clear(NumberOfEventsInput);
            await user.type(NumberOfEventsInput, '10');
        });

        then('the app should update and show the requested number of events', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(10);
            });
        });
    });
});