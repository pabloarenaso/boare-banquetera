/**
 * Event Catering Domain Types
 * 
 * Use these interfaces as the ground truth for the application's data model.
 */

export type EventType = 'wedding' | 'corporate' | 'birthday' | 'social' | 'other';

export interface Customer {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    companyName?: string; // Optional, for corporate events
}

export interface EventLocation {
    address: string;
    city: string;
    distanceKm: number; // Critical for calculating logistics costs
    hasParking: boolean;
    requiresStairs: boolean; // Logistics factor
}

export interface EventDetails {
    id: string;
    customerId: string;
    eventType: EventType;
    date: Date;
    startTime: string; // ISO time or HH:mm
    durationHours: number;
    guestCount: number;
    location: EventLocation;
    notes?: string;
}

export type PricingModel =
    | 'per_person'
    | 'per_event'
    | 'per_hour'
    | 'custom'
    | 'tiered'; // e.g. "1 staff per 50 guests"

export interface MenuItem {
    id: string;
    name: string;
    description: string;
    costPerUnit: number; // Internal raw cost
    pricePerUnit: number; // Client price
    unit: 'portion' | 'kilo' | 'liter' | 'piece';
}

export interface MenuPackage {
    id: string;
    name: string;
    category: string; // e.g., "Dinner", "Cocktail", "Breakfast"
    description: string;
    basePricePerPerson: number;
    costPerPerson: number; // Internal cost estimate
    items: MenuItem[]; // The composition of the menu
    minGuests?: number;
}

export interface AddOn {
    id: string;
    name: string;
    type: 'drinks' | 'decoration' | 'staff' | 'equipment' | 'logistics' | 'other';
    description?: string;
    pricingModel: PricingModel;
    basePrice: number; // The generic price (e.g., 100.000)
    baseCost: number; // Internal cost
    tierThreshold?: number; // e.g., 50 (guests)
    tierMultiplier?: number; // e.g., if > 50, add 0.5 * basePrice
}

// The financial breakdown of a specific line item
export interface LineItem {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    category: string; // 'Menu', 'Staff', 'Equipment', 'Custom'
}

export interface CostBreakdown {
    foodCos: number;
    laborCost: number;
    equipmentCost: number;
    logisticsCost: number; // Fuel, transport
    variableCosts: number;
    fixedCosts: number;
    totalCost: number;
    projectedMargin: number; // (Total Price - Total Cost)
    marginPercent: number;
}

export interface Quote {
    id: string;
    eventId: string;
    createdAt: Date;
    expiresAt: Date;
    status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'booked';

    // Line Items
    items: LineItem[];

    // Financials
    subtotal: number;
    discountAmount: number;
    taxAmount: number; // IVA
    totalPrice: number;

    // Internal Reference (Never sent to client)
    internalCostAnalysis: CostBreakdown;
}

// Example: Helper to calculate BBQ Staffing
// Rule: 1 Master (100k) per event up to 50 guests.
// If > 50, add Assistant (50k).
// This logic should live in a pricing service, utilizing these types.
