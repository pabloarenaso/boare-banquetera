import { QuoteItem } from "./types";

export const STAFF_RULES = {
    BBQ_MASTER_THRESHOLD: 50, // 1 master every 50 guests
    WAITER_THRESHOLD: 15,     // 1 waiter every 15 guests

    // Base costs (we can fetch these later from DB, hardcoded for now)
    COST_BBQ_MASTER: 100000,
    COST_ASSISTANT: 50000,
    COST_WAITER: 45000,
};

export function calculateStaffNeeded(guests: number, eventType: string = 'matrimonio', hasGrillItems: boolean = false): QuoteItem[] {
    const items: QuoteItem[] = [];

    if (guests <= 0) return items;

    // 1. Parrilleros (BBQ Master)
    // Only if event is 'asado' OR explicitly has grill items
    const needsBBQ = eventType === 'asado' || hasGrillItems;

    if (needsBBQ) {
        const mastersNeeded = Math.ceil(guests / STAFF_RULES.BBQ_MASTER_THRESHOLD);
        if (mastersNeeded > 0) {
            items.push({
                id: "staff-master",
                name: "Maestro Parrillero",
                quantity: mastersNeeded,
                unit_price: STAFF_RULES.COST_BBQ_MASTER,
                total_price: mastersNeeded * STAFF_RULES.COST_BBQ_MASTER
            });
        }
    }

    // 2. Ayudantes de Cocina / Parrilla (Assistants)
    // Logic: 1 assistant if guests >= 50, +1 every 50 after that
    let assistantsNeeded = 0;
    if (guests >= 50) {
        assistantsNeeded = 1 + Math.floor((guests - 50) / 50);
    }

    if (assistantsNeeded > 0) {
        items.push({
            id: "staff-assistant",
            name: "Ayudante de Cocina",
            quantity: assistantsNeeded,
            unit_price: STAFF_RULES.COST_ASSISTANT,
            total_price: assistantsNeeded * STAFF_RULES.COST_ASSISTANT
        });
    }

    // 3. Garzones (Waiters)
    const waitersNeeded = Math.ceil(guests / STAFF_RULES.WAITER_THRESHOLD);
    if (waitersNeeded > 0) {
        items.push({
            id: "staff-waiter",
            name: "Garzón",
            quantity: waitersNeeded,
            unit_price: STAFF_RULES.COST_WAITER,
            total_price: waitersNeeded * STAFF_RULES.COST_WAITER
        });
    }

    return items;
}
