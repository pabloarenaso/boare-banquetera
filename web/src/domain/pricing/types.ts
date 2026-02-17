export type Category = 'bocado' | 'plato_fondo' | 'postre' | 'servicio' | 'extra';

export interface Product {
    id: string;
    name: string;
    description?: string;
    category: Category;
    unit_price: number;
    unit_type: 'un' | 'docena' | 'persona' | 'evento';
}

export interface QuoteItem {
    id: string;
    product_id?: string;
    name: string;
    quantity: number;
    unit_price: number;
    total_price: number;
}

export interface EventDetails {
    date: Date;
    guests: number;
    location?: string;
    type: 'matrimonio' | 'asado' | 'cocktail' | 'otro';
}

export interface Quote {
    id?: string;
    event: EventDetails;
    items: QuoteItem[];
    subtotal: number;
    discount: number;
    total: number;
}
