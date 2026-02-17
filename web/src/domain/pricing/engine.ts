import { EventDetails, Product, Quote, QuoteItem } from "./types";
import { calculateStaffNeeded } from "./rules";

export function createQuote(
    event: EventDetails,
    selectedItems: { product: Product; quantity: number }[],
    overrides?: Record<string, { quantity?: number; unit_price?: number }> // New param
): Quote {
    const items: QuoteItem[] = [];

    // 1. Add Selected Products
    selectedItems.forEach(({ product, quantity: userQuantity }) => {
        let quantity = userQuantity;

        // Force quantity logic for specific types (integrity check)
        if (product.unit_type === 'persona') {
            quantity = event.guests;
        } else if (product.unit_type === 'evento') {
            if (quantity <= 0) quantity = 1;
        }

        const itemId = product.id.startsWith('custom-') ? product.id : `item-${product.id}`;

        items.push({
            id: itemId,
            product_id: product.id,
            name: product.name,
            unit_price: product.unit_price,
            quantity: quantity,
            total_price: quantity * product.unit_price
        });
    });



    // 2. Add Required Staff (Auto-calculated)
    // Check if any selected item implies a grill (simple keyword check for now)
    const hasGrillItems = selectedItems.some(i => {
        const name = i.product.name.toLowerCase();
        return name.includes('asado') || name.includes('cordero') || name.includes('lomo') || name.includes('parrilla');
    });

    const staffItems = calculateStaffNeeded(event.guests, event.type, hasGrillItems);
    items.push(...staffItems);

    // 3. Apply Overrides
    if (overrides) {
        items.forEach(item => {
            if (overrides[item.id]) {
                const override = overrides[item.id];
                if (override.quantity !== undefined) item.quantity = override.quantity;
                if (override.unit_price !== undefined) item.unit_price = override.unit_price;
                item.total_price = item.quantity * item.unit_price; // Recalculate total
            }
        });
    }

    // 4. Calculate Totals
    const subtotal = items.reduce((sum, item) => sum + item.total_price, 0);

    // Future: Apply discounts logic here
    const discount = 0;

    return {
        event,
        items,
        subtotal,
        discount,
        total: subtotal - discount
    };
}
