import { create } from 'zustand';
import { EventDetails, Product, Quote, QuoteItem } from '@/domain/pricing/types';
import { createQuote } from '@/domain/pricing/engine';
import { supabase } from '@/lib/supabase/client';

interface QuoteState {
    // State
    event: EventDetails;
    selectedItems: { product: Product; quantity: number }[];
    currentQuote: Quote;
    clientDetails: {
        fullName: string;
        email: string;
        phone: string;
    };

    // Actions
    setEventDetails: (details: Partial<EventDetails>) => void;
    setClientDetails: (details: { fullName: string; email: string; phone: string }) => void;
    /**
     * Updates the quantity of a product.
     * If quantity is 0, removes the product.
     * If product was not selected, adds it.
     */
    updateProductQuantity: (product: Product, quantity: number) => void;
    reset: () => void;
    saveQuote: () => Promise<{ success: boolean; id?: string; error?: any }>;

    // Admin Actions
    addCustomItem: (item: { name: string; price: number; quantity: number; category: any }) => void;
    removeItem: (itemId: string) => void;

    // Manual Overrides
    manualOverrides: Record<string, { quantity?: number; unit_price?: number }>;
    setOverride: (itemId: string, updates: { quantity?: number; unit_price?: number }) => void;
}

const INITIAL_EVENT: EventDetails = {
    date: new Date(),
    guests: 50, // Default to 50 to see staffing rules in action
    type: 'matrimonio'
};

export const useQuoteStore = create<QuoteState>((set, get) => ({
    event: INITIAL_EVENT,
    selectedItems: [],
    currentQuote: createQuote(INITIAL_EVENT, []),
    clientDetails: { fullName: '', email: '', phone: '' },
    manualOverrides: {},

    setClientDetails: (details) => set({ clientDetails: details }),

    setEventDetails: (details) => {
        const newEvent = { ...get().event, ...details };
        // Recalculate quote with new event details (e.g. guest count change affects totals)
        const newQuote = createQuote(newEvent, get().selectedItems, get().manualOverrides);

        set({
            event: newEvent,
            currentQuote: newQuote
        });
    },

    updateProductQuantity: (product, quantity) => {
        const currentItems = get().selectedItems;
        const existingItemIndex = currentItems.findIndex(i => i.product.id === product.id);

        let newItems;
        if (quantity <= 0) {
            // Remove item
            newItems = currentItems.filter(i => i.product.id !== product.id);
        } else {
            if (existingItemIndex >= 0) {
                // Update quantity
                newItems = [...currentItems];
                newItems[existingItemIndex] = { ...newItems[existingItemIndex], quantity };
            } else {
                // Add new item
                newItems = [...currentItems, { product, quantity }];
            }
        }

        const newQuote = createQuote(get().event, newItems, get().manualOverrides);

        set({
            selectedItems: newItems,
            currentQuote: newQuote
        });
    },

    reset: () => {
        set({
            event: INITIAL_EVENT,
            selectedItems: [],
            currentQuote: createQuote(INITIAL_EVENT, []),
            clientDetails: { fullName: '', email: '', phone: '' },
            manualOverrides: {}
        });
    },

    saveQuote: async () => {
        const { currentQuote, event, clientDetails } = get();

        // 0. Validation
        if (!clientDetails.email || !clientDetails.fullName) {
            return { success: false, error: { message: "Por favor completa tu nombre y correo." } };
        }

        // 1. Upsert Customer
        // Try to find by email
        const { data: existingCustomer } = await supabase
            .from('customers')
            .select('id')
            .eq('email', clientDetails.email)
            .single();

        let customerId = existingCustomer?.id;

        if (!customerId) {
            // Create new customer
            const { data: newCustomer, error: customerError } = await supabase
                .from('customers')
                .insert({
                    full_name: clientDetails.fullName,
                    email: clientDetails.email,
                    phone: clientDetails.phone,
                    notes: 'Creado desde Cotizador Web'
                })
                .select()
                .single();

            if (customerError || !newCustomer) {
                console.error("Error creating customer:", customerError);
                return { success: false, error: customerError };
            }
            customerId = newCustomer.id;
        }

        // 2. Insert Quote linked to Customer
        const { data: quoteData, error: quoteError } = await supabase
            .from('quotes')
            .insert({
                customer_id: customerId,
                event_date: event.date.toISOString(),
                event_name: `Evento ${event.type} - ${clientDetails.fullName}`,
                guest_count: event.guests,
                location: event.location || 'Por definir',
                status: 'draft',
                subtotal: currentQuote.subtotal,
                discount: currentQuote.discount,
                total: currentQuote.total
            })
            .select()
            .single();

        if (quoteError || !quoteData) {
            console.error("Error saving quote:", quoteError);
            return { success: false, error: quoteError };
        }

        const quoteId = quoteData.id;

        // 3. Insert Items
        if (currentQuote.items.length > 0) {
            const itemsToInsert = currentQuote.items.map(item => ({
                quote_id: quoteId,
                product_id: (item.product_id && item.product_id.startsWith('custom-')) ? null : item.product_id,
                name: item.name,
                quantity: item.quantity,
                unit_price: item.unit_price,
                total_price: item.total_price
            }));

            const { error: itemsError } = await supabase
                .from('quote_items')
                .insert(itemsToInsert);

            if (itemsError) {
                console.error("Error saving items:", itemsError);
                return { success: false, error: itemsError };
            }
        }

        return { success: true, id: quoteId };
    },

    addCustomItem: (item) => {
        const customProduct: Product = {
            id: `custom-${Date.now()}`,
            name: item.name,
            unit_price: item.price,
            category: item.category,
            description: 'Ítem personalizado',
            unit_type: 'un'
        };

        const { selectedItems } = get();
        const newItems = [...selectedItems, { product: customProduct, quantity: item.quantity }];

        const newQuote = createQuote(get().event, newItems, get().manualOverrides);

        set({
            selectedItems: newItems,
            currentQuote: newQuote
        });
    },

    removeItem: (itemId) => {
        const { selectedItems, manualOverrides } = get();
        const newItems = selectedItems.filter(i => {
            const generatedId = i.product.id.startsWith('custom-') ? i.product.id : `item-${i.product.id}`;
            return generatedId !== itemId;
        });

        const newOverrides = { ...manualOverrides };
        delete newOverrides[itemId];

        if (newItems.length === selectedItems.length) {
            newOverrides[itemId] = { quantity: 0 };
        }

        const newQuote = createQuote(get().event, newItems, newOverrides);

        set({
            selectedItems: newItems,
            manualOverrides: newOverrides,
            currentQuote: newQuote
        });
    },

    setOverride: (itemId, updates) => {
        const { manualOverrides, event, selectedItems } = get();
        const currentOverride = manualOverrides[itemId] || {};
        const newOverride = { ...currentOverride, ...updates };

        const newOverrides = { ...manualOverrides, [itemId]: newOverride };
        const newQuote = createQuote(event, selectedItems, newOverrides);

        set({
            manualOverrides: newOverrides,
            currentQuote: newQuote
        });
    }
}));
