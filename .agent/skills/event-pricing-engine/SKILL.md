---
name: event-pricing-engine
description: Defines best practices and steps for implementing a pricing engine for event catering. Use when implementing cost calculations, margins, discounts, and custom pricing rules.
---

# Event Pricing Engine Skill

This skill guides the implementation of a robust, testable, and flexible pricing engine for catering events.

## Core Concepts

1.  **Separation of Concerns**:
    *   **Cost Engine**: Pure functions. `(Data) => Cost`. Deterministic.
    *   **Pricing Rules**: Configuration. `(Context) => Modifiers`. Configurable by business.
    *   **Presentation**: Formatting. `(Price) => String`. UI concern.

2.  **Calculation Requirements**:
    *   **Base Cost per Person**: Derived from Menu + Staff + Equipment.
    *   **Margin**: A target percentage applied to costs to determine price.
    *   **Volume Discounts**: Rules triggered by `numberOfGuests`.
    *   **Demand Supplements**: Rules triggered by `date` (holidays, weekends).
    *   **Logistics Check**: Rules triggered by `location` (distance from base).

## Required Functions

Implement these as pure functions where possible.

### `calculateBaseCost(quote: Quote): CostBreakdown`
*   **Input**: A raw Quote object with items.
*   **Logic**: Sums up `unitCost * quantity` for all items.
*   **Output**: High-level breakdown (`food`, `labor`, `equipment`).

### `applyBusinessRules(costs: CostBreakdown, context: EventContext, rules: RuleSet): PricingResult`
*   **Input**: The calculated costs, the event context (date, guests, distance), and the active Business Rules.
*   **Logic**:
    1.  Apply `margin` to get `basePrice`.
    2.  Apply `seasonalityMultiplier` based on date.
    3.  Apply `logisticsSurcharge` based on distance.
    4.  Apply `volumeDiscount` based on guest count.
*   **Output**: Final `totalPrice` and applied modifiers.

## File Structure recommendation

```text
src/domain/pricing/
├── engine.ts           # Pure calculation functions
├── rules.ts            # Rule evaluation logic
├── types.ts            # Pricing specific types
└── __tests__/          # Unit tests
```

## Configuration (JSON)

Store pricing rules in a JSON to allow multi-tenant reuse.

```json
{
  "baseMargin": 0.30,
  "logistics": {
    "pricePerKm": 1500,
    "freeRadiusKm": 20
  },
  "seasonality": {
    "highSeasonMonths": [11, 12, 1],
    "weekendSurcharge": 0.10
  },
  "volumeDiscounts": [
    { "minGuests": 100, "discount": 0.05 },
    { "minGuests": 200, "discount": 0.10 }
  ]
}
```

## Testing Strategy

Write unit tests for the engine. Do not rely on manual QA for pricing.

### Example Test Cases
*   **Small Event**: 20 guests. Verify BBQ Master fixed cost applies correctly (high per-head cost).
*   **Large Event**: 200 guests. Verify Volume Discount applies. Verify Assistant BBQ Master is added.
*   **Remote Event**: 100km away. Verify fuel/logistics surcharge is accurate.
*   **Premium Date**: Verify weekend surcharge is applied on top of base.
