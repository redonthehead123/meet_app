Feature: Specify Number of Events
  Scenario: Display default number of events
    Given the app is first loaded
    When no custom event count has been specified
    Then the app should display 32 events by default
  Scenario: Change the number of displayed events
    Given the user is viewing the events list
    When the user specifies a different number of events to display
    Then the app should update and show the requested number of events