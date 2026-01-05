# 📅 Meet App

A React-based event management application that allows users to filter events by city, view event details, manage offline access, and visualize event data with interactive charts.

---

## 🎯 Features

| Feature | Description |
|---------|-------------|
| 🌍 **Filter Events by City** | Browse events from all cities or filter by specific location with autocomplete suggestions |
| 📋 **Show / Hide Event Details** | Expand and collapse events to view or hide additional information |
| 🔢 **Specify Number of Events** | View 32 events by default or customize the number displayed |
| 📱 **Offline Support** | Access cached events when offline with notification warnings |
| 🏠 **App Shortcut** | Install the app as a home screen shortcut for quick access |
| 📊 **Event Charts** | Visual representation of upcoming events per city |

---

## 🛠 Tech Stack

- **React** — Component-based UI library
- **Vite** — Fast, modern build tool with HMR (Hot Module Replacement)
- **ESLint** — Code quality and style enforcement
- **Babel / SWC** — JavaScript transformation for Fast Refresh

### Build Tools

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) — Uses Babel for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) — Uses SWC for Fast Refresh

---

## 📖 User Stories & Acceptance Criteria

### Feature 1: Filter Events by City

- As a user, I should be able to see upcoming events from all cities by default so that I can browse events without applying any filters.
- As a user, I should be able to see a list of suggested cities when I start typing so that I can quickly find events in a specific location.
- As a user, I should be able to select a city from the suggestions so that I can view events happening in that city.

### Feature 2: Show / Hide Event Details

- As a user, I should be able to expand an event so that I can see more details.
- As a user, I should be able to collapse an event so that I can hide unnecessary information.

### Feature 3: Specify Number of Events

- As a user, I should be able to see 32 events by default so that I have a broad overview.
- As a user, I should be able to change the number of events displayed.

### Feature 4: Use the App When Offline

- As a user, I should be able to see cached events when offline.
- As a user, I should be notified if I try to change settings while offline.

### Feature 5: Add an App Shortcut

- As a user, I should be able to install the app on my home screen.

### Feature 6: Display Charts

- As a user, I should be able to see a chart showing the number of upcoming events per city.



## 📝 Gherkin Scenarios

Converted from User Stories to Given-When-Then Format

### Feature 1: Filter Events by City

```gherkin
Feature: Filter Events by City

  Scenario: View all events by default
    Given the app is loaded
    When no city filter has been applied
    Then the user should see upcoming events from all cities

  Scenario: Display city suggestions while typing
    Given the user is on the events page
    When the user starts typing in the city input field
    Then the app should display a list of suggested cities

  Scenario: Filter events by selecting a city
    Given the app is displaying city suggestions
    When the user selects a city from the suggestions
    Then the app should display only events happening in that city
```

### Feature 2: Show / Hide Event Details

```gherkin
Feature: Show / Hide Event Details

  Scenario: Expand an event to view details
    Given the user is viewing the events list
    When the user clicks on an event to expand it
    Then the event should expand and display full details (description, location, time, etc.)

  Scenario: Collapse an event to hide details
    Given an event is expanded and showing full details
    When the user clicks to collapse the event
    Then the event should collapse and hide the additional information
```

### Feature 3: Specify Number of Events

```gherkin
Feature: Specify Number of Events

  Scenario: Display default number of events
    Given the app is first loaded
    When no custom event count has been specified
    Then the app should display 32 events by default

  Scenario: Change the number of displayed events
    Given the user is viewing the events list
    When the user specifies a different number of events to display
    Then the app should update and show the requested number of events
```

### Feature 4: Use the App When Offline

```gherkin
Feature: Use the App When Offline

  Scenario: Display cached events when offline
    Given the user has previously loaded events while online
    When the user loses internet connection
    Then the app should display the cached events

  Scenario: Notify user when attempting to change settings offline
    Given the user is offline
    When the user tries to change app settings (filter, event count, etc.)
    Then the app should display a notification warning that changes cannot be made while offline
```

### Feature 5: Add an App Shortcut

```gherkin
Feature: Add an App Shortcut

  Scenario: Install the app on home screen
    Given the user is using the meet app
    When the user chooses to install the app on their home screen
    Then the app should be installed as a shortcut on the user's device home screen
```

### Feature 6: Display Charts

```gherkin
Feature: Display Charts

  Scenario: View chart of upcoming events per city
    Given the user is on the events page
    When the user navigates to the charts section
    Then the app should display a chart showing the number of upcoming events for each city
```
