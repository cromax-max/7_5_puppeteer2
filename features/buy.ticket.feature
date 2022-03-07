Feature: Buy ticket
  Scenario: Should book a movie ticket
    Given user is on "qamid" page
    When user user is booking a movie ticket
    Then user sees the booking confirmation

  Scenario: Should book multiple movie tickets
    Given user is on "qamid" page
    When user user is booking multiple tickets
    Then user sees the booking confirmation

  Scenario: Should not re-booking a booked movie ticket
    Given user is on "qamid" page
    When user re-booking a booked movie ticket
    Then user sees disabled button