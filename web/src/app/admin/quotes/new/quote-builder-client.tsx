'use client';

import { useState } from 'react';
import { useQuoteStore } from '@/stores/quote-store';
import { Product } from '@/domain/pricing/types';
import { Plus, Trash2, Save, ArrowLeft, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Props {
    products: Product[];
}

export default function AdminQuoteBuilder({ products }: Props) {
    // We reuse the same store! 
    // Ideally we should have a context provider to isolate stores, but for this simple app checking "isInitialized" or resetting on mount is fine.
    const {
        event,
        currentQuote,
        clientDetails,
        setEventDetails,
        setClientDetails,
        updateProductQuantity,
        addCustomItem,
        removeItem,
        setOverride,
        saveQuote,
        reset
    } = useQuoteStore();

    const [searchTerm, setSearchTerm] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    // Custom Item State
    const [customItem, setCustomItem] = useState({ name: '', price: 0, quantity: 1, category: 'extra' });

    const router = useRouter();

    // Filter products
    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSave = async () => {
        setIsSaving(true);
        const result = await saveQuote();
        if (result.success) {
            alert(`Cotización y Cliente creados éxito. ID: ${result.id}`);
            router.push('/admin');
            reset();
        } else {
            alert(`Error: ${result.error?.message || 'Error desconocido'}`);
        }
        setIsSaving(false);
    };

    const handleAddCustom = () => {
        if (!customItem.name || customItem.price <= 0) return;
        addCustomItem(customItem);
        setCustomItem({ name: '', price: 0, quantity: 1, category: 'extra' });
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <button onClick={() => router.back()} className="text-stone-500 hover:text-stone-800">
                    <ArrowLeft />
                </button>
                <h1 className="text-2xl font-bold font-serif text-stone-800">Nueva Cotización Manual</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT COLUMN: Inputs & Config */}
                <div className="lg:col-span-2 space-y-8">

                    {/* 1. Client & Event Info */}
                    <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-4">
                        <h3 className="font-bold text-lg text-stone-800 border-b border-stone-100 pb-2">1. Datos del Cliente y Evento</h3>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-stone-600 mb-1">Nombre Cliente</label>
                                <input
                                    type="text"
                                    value={clientDetails.fullName}
                                    onChange={e => setClientDetails({ ...clientDetails, fullName: e.target.value })}
                                    className="w-full border p-2 rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-stone-600 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={clientDetails.email}
                                    onChange={e => setClientDetails({ ...clientDetails, email: e.target.value })}
                                    className="w-full border p-2 rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-stone-600 mb-1">Teléfono</label>
                                <input
                                    type="text"
                                    value={clientDetails.phone}
                                    onChange={e => setClientDetails({ ...clientDetails, phone: e.target.value })}
                                    className="w-full border p-2 rounded"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 border-t border-stone-100 pt-4">
                            <div>
                                <label className="block text-sm font-medium text-stone-600 mb-1">Fecha Evento</label>
                                <input
                                    type="date"
                                    value={event.date.toISOString().split('T')[0]}
                                    onChange={e => setEventDetails({ date: new Date(e.target.value) })}
                                    className="w-full border p-2 rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-stone-600 mb-1">Invitados</label>
                                <input
                                    type="number"
                                    value={event.guests}
                                    onChange={e => setEventDetails({ guests: parseInt(e.target.value) || 0 })}
                                    className="w-full border p-2 rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-stone-600 mb-1">Tipo</label>
                                <select
                                    value={event.type}
                                    onChange={e => setEventDetails({ type: e.target.value as any })}
                                    className="w-full border p-2 rounded"
                                >
                                    <option value="matrimonio">Matrimonio</option>
                                    <option value="asado">Asado</option>
                                    <option value="cocktail">Cocktail</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* 2. Add Products (Catalog) */}
                    <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-4">
                        <h3 className="font-bold text-lg text-stone-800 border-b border-stone-100 pb-2">2. Agregar Productos del Catálogo</h3>

                        <div className="relative">
                            <Search className="absolute left-3 top-3 text-stone-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Buscar productos..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="w-full border p-2 pl-10 rounded"
                            />
                        </div>

                        <div className="h-64 overflow-y-auto border rounded divide-y divide-stone-100">
                            {filteredProducts.map(product => {
                                const isSelected = currentQuote.items.find(i => i.product_id === product.id);
                                return (
                                    <div key={product.id} className="flex justify-between items-center p-3 hover:bg-stone-50">
                                        <div>
                                            <p className="font-medium text-stone-800">{product.name}</p>
                                            <p className="text-xs text-stone-500">${product.unit_price.toLocaleString('es-CL')}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {/* Simple Add/Remove Logic */}
                                            <button
                                                onClick={() => updateProductQuantity(product, (isSelected?.quantity || 0) + 1)}
                                                className="bg-stone-100 p-1 rounded hover:bg-stone-200"
                                            >
                                                <Plus size={16} />
                                            </button>
                                            {isSelected && (
                                                <span className="text-sm font-bold w-6 text-center">{isSelected.quantity}</span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* 3. Add Custom Items */}
                    <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-4">
                        <h3 className="font-bold text-lg text-stone-800 border-b border-stone-100 pb-2">3. Agregar Ítem Personalizado</h3>

                        <div className="flex gap-4 items-end bg-amber-50 p-4 rounded-lg border border-amber-100">
                            <div className="flex-1">
                                <label className="block text-xs font-bold text-amber-800 uppercase mb-1">Nombre</label>
                                <input
                                    type="text"
                                    value={customItem.name}
                                    onChange={e => setCustomItem({ ...customItem, name: e.target.value })}
                                    className="w-full border border-amber-200 p-2 rounded"
                                    placeholder="Ej: Traslado Especial"
                                />
                            </div>
                            <div className="w-32">
                                <label className="block text-xs font-bold text-amber-800 uppercase mb-1">Precio Unit.</label>
                                <input
                                    type="number"
                                    value={customItem.price}
                                    onChange={e => setCustomItem({ ...customItem, price: parseInt(e.target.value) || 0 })}
                                    className="w-full border border-amber-200 p-2 rounded"
                                />
                            </div>
                            <div className="w-20">
                                <label className="block text-xs font-bold text-amber-800 uppercase mb-1">Cant.</label>
                                <input
                                    type="number"
                                    value={customItem.quantity}
                                    onChange={e => setCustomItem({ ...customItem, quantity: parseInt(e.target.value) || 1 })}
                                    className="w-full border border-amber-200 p-2 rounded"
                                />
                            </div>
                            <button
                                onClick={handleAddCustom}
                                className="bg-amber-600 text-white p-2 rounded-lg hover:bg-amber-700 h-[42px] px-4 font-bold"
                            >
                                Agregar
                            </button>
                        </div>
                    </div>

                </div>

                {/* RIGHT COLUMN: Summary & Save */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white border-2 border-stone-800 rounded-xl p-6 shadow-xl sticky top-6">
                        <h3 className="font-serif font-bold text-xl text-stone-800 mb-4">Resumen</h3>

                        <div className="space-y-3 mb-6 max-h-[500px] overflow-y-auto">
                            {currentQuote.items.length === 0 && (
                                <p className="text-stone-400 text-sm italic">No hay ítems seleccionados</p>
                            )}
                            {currentQuote.items.map((item, idx) => (
                                <div key={item.id + idx} className="flex justify-between items-start text-sm border-b border-stone-100 pb-2 gap-2">
                                    <div className="flex-1">
                                        <p className="font-medium text-stone-700 mb-1">{item.name}</p>
                                        <div className="flex items-center gap-1 text-xs text-stone-500">
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) => setOverride(item.id, { quantity: parseInt(e.target.value) || 0 })}
                                                className="w-12 border border-stone-300 rounded px-1 text-center focus:border-amber-500 focus:outline-none"
                                            />
                                            <span>x</span>
                                            <div className="relative">
                                                <span className="absolute left-1 top-0.5">$</span>
                                                <input
                                                    type="number"
                                                    value={item.unit_price}
                                                    onChange={(e) => setOverride(item.id, { unit_price: parseInt(e.target.value) || 0 })}
                                                    className="w-20 border border-stone-300 rounded pl-3 pr-1 text-right focus:border-amber-500 focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right flex flex-col items-end">
                                        <span className="font-bold text-stone-800">${item.total_price.toLocaleString('es-CL')}</span>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-red-400 hover:text-red-600 mt-1 p-1"
                                            title="Eliminar ítem"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t-2 border-stone-800 pt-4 space-y-2">
                            <div className="flex justify-between text-stone-600">
                                <span>Subtotal</span>
                                <span>${currentQuote.subtotal.toLocaleString('es-CL')}</span>
                            </div>
                            <div className="flex justify-between text-2xl font-bold text-stone-800">
                                <span>Total</span>
                                <span>${currentQuote.total.toLocaleString('es-CL')}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="w-full mt-6 bg-stone-900 text-stone-100 py-4 rounded-xl font-bold hover:bg-stone-800 transition-all flex justify-center items-center gap-2"
                        >
                            <Save size={18} />
                            {isSaving ? 'Guardando...' : 'Crear Cotización'}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
