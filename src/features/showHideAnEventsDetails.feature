Feature: Show / Hide Event Details
  Scenario: Expand an event to view details
    Given the user is viewing the events list
    When the user clicks on an event to expand it
    Then the event should expand and display full details (description, location, time, etc.)
  Scenario: Collapse an event to hide details
    Given an event is expanded and showing full details
    When the user clicks to collapse the event
    Then the event should collapse and hide the additional information