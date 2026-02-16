---
name: event-catering-domain-model
description: Defines the standard domain model and business logic structures for event catering systems. Use when designing data structures, API contracts, or core business logic for handling quotes, events, menus, and costs.
---

# Event Catering Domain Model

This skill defines the canonical domain model for the event catering industry. Adhere to these definitions to ensure consistency across pricing engines, quota generators, and operational tools.

## Core Principles

1.  **Domain First**: Define the domain entities (Event, Quote, Menu) BEFORE implementing UI or API endpoints. The domain drives the interface, not vice versa.
2.  **Strong Typing**: Use strict TypeScript interfaces or Zod schemas for all domain entities. Avoid `any`.
3.  **Separation of Concerns**:
    *   **Data**: Pure structural definitions (e.g., `Event` object).
    *   **Pricing Logic**: Pure functions that accept Data and return Costs (e.g., `calculateQuote(event, menu)`).
    *   **Presentation**: UI components that display Data/Costs.
4.  **Flexibility**: The system must support diverse event types:
    *   Complex Weddings (multi-stage, high customization).
    *   Corporate Coffee Breaks (fixed packages, speed).
    *   Intimate Birthdays/BBQs (variable guest counts, specific rules).

## Domain Entities

Always model the following core objects. See `references/types.ts` for exact specifications.

### 1. Customer
Represents the client requesting the service.
*   Must track contact info and preferences.

### 2. Event
The core context for any quote.
*   **Required**: `date`, `location` (distance is critical for logistics), `numberOfGuests`, `eventType`, `durationHours`.
*   **Logistics**: Should account for location-based logistics (travel time, fuel).

### 3. MenuPackage
A standard offering (e.g., "Premium Wedding Dinner", "Corporate Breakfast").
*   Properties: `name`, `category`, `basePricePerPerson`, `costPerPerson`.

### 4. AddOn
Optional items or services added to a base package.
*   **Types**: `drinks`, `decoration`, `staff` (waiters, chefs), `equipment` (tables, chairs, tents).
*   **Pricing Models**:
    *   **Per Person**: (e.g., extra drink option).
    *   **Per Event**: (e.g., DJ, tent rental).
    *   **Tiered/Conditional**: (e.g., "1 Grill Master per 50 guests").

### 5. CostBreakdown & Quote
*   **CostBreakdown**: Internal view. Tracks `foodCost`, `laborCost`, `fixedCosts`, `variableCosts`, and calculated `margin`.
*   **Quote**: Client view. Tracks line items, `subtotal`, `discount`, `tax`, and `totalPrice`.
*   **Note**: Never expose raw costs to the client Quote.

## Logic Implementation Guide

### Pricing Engine
Implement pricing as a standalone service or module.
*   **Input**: `Event`, `MenuPackage`, `AddOn[]`.
*   **Output**: `Quote`, `CostBreakdown`.
*   **Rule**: Handle "Tiered" logic (e.g., BBQ Master rule) inside the pricing engine, not the UI.

### Customization
*   Always allow for "Custom Item" line items in a Quote to handle edge cases (e.g., "Extra long extension cord").
*   Allow manual overrides on final prices with a reasoned note (e.g., "Friendship discount").

## References
*   [Domain Types (TypeScript)](references/types.ts)
