---
name: event-quote-ux
description: Standardizes the UX/UI design for public quote forms and internal management dashboards in event catering applications.
---

# Event Quote UX Skill

This skill defines the standard user experience and interface patterns for the catering quotation system.

## Public Quote Flow (Client Facing)

The goal is conversion and clarity. Avoid overwhelming the user.

### Step 1: Event Basics
*   **Fields**: Date, Start Time, Duration, Guest Count, Location (Address + Google Maps Autocomplete).
*   **Validation**: Block dates in the past. Warn about dates < 48h away.

### Step 2: Experience Selection
*   **UI**: Cards with images representing "Event Types" (Wedding, Corporate, BBQ).
*   **Action**: Selecting a type loads the relevant "Menu Packages".
*   **Selection**: User picks a base Menu Package (e.g., "Premium BBQ").

### Step 3: Customization (Extras)
*   **UI**: Accordions or Tabs for categories: "Drinks", "Staff", "Furniture", "Decoration".
*   **Interaction**: Simple Counter (+/-) or Checkbox controls.
*   **Dynamic Feedback**: Show estimated price updating in a sticky footer or sidebar.

### Step 4: Summary & Contact
*   **Display**: Clean list of selected items.
*   **Input**: Name, Email, Phone, "Special Notes" (TextArea).
*   **Action**: "Request Quote" (CTA).
*   **Feedback**: Success modal with "Reference Number".

## Backoffice Quote Management (Internal)

The goal is efficiency and control.

### Dashboard (List View)
*   **Table Columns**: ID, Client Name, Event Date, Guest Count, Total, Status (Draft, Sent, Accepted).
*   **Filters**: Date Range, Status, Event Type.
*   **Sorting**: Urgency (Event Date ASC), Recency (Created Date DESC).

### Quote Detail View
*   **Header**: Client info summary + Quick Actions (Call, WhatsApp, Email).
*   **Main Content**:
    *   **Editable Line Items**: Ability to add custom items, change quantities, apply manual discounts.
    *   **Real-time Recalculation**: Changing guests or items updates the Pricing Engine immediately.
*   **Sidebar**:
    *   **Cost Breakdown**: Internal view of Food Cost, Labor, Margin.
    *   **History**: Log of changes and communications.
*   **Actions**:
    *   "Generate PDF"
    *   "Send via Email"
    *   "Mark as Booked"

## Component Architecture Guidelines (React/Next.js)

*   **`QuoteWizard`**: Manages the multi-step state (use a robust form library like `react-hook-form`).
*   **`PriceEstimator`**: Component that listens to form state and renders the current total (connects to Pricing Engine).
*   **`ItemSelector`**: Reusable component for choosing Menu/Add-ons with image, description, and quantity control.
*   **`StatusBadge`**: Visual indicator of quote status (Color rules: Yellow=Draft, Blue=Sent, Green=Booked, Red=Rejected).

## Responsive Design
*   **Mobile First**: The Public Form must work perfectly on mobile devices (Instagram traffic).
*   **Desktop Optimize**: The Backoffice is primarily for Desktop/Tablet use (complex data tables).
