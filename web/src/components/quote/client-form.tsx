"use client";

import { useQuoteStore } from "@/stores/quote-store";

export function ClientForm() {
    const { clientDetails, setClientDetails } = useQuoteStore();

    return (
        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-xl text-stone-800 border-b border-stone-100 pb-2">
                Datos de Contacto
            </h3>
            <p className="text-sm text-stone-500">
                Ingresa tus datos para guardar la cotización y enviártela por correo.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-sm font-medium text-stone-700">Nombre Completo <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        placeholder="Ej: Juan Pérez"
                        value={clientDetails.fullName}
                        onChange={(e) => setClientDetails({ ...clientDetails, fullName: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium text-stone-700">Teléfono</label>
                    <input
                        type="tel"
                        placeholder="+56 9 1234 5678"
                        value={clientDetails.phone}
                        onChange={(e) => setClientDetails({ ...clientDetails, phone: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                    />
                </div>

                <div className="space-y-1 md:col-span-2">
                    <label className="text-sm font-medium text-stone-700">Correo Electrónico <span className="text-red-500">*</span></label>
                    <input
                        type="email"
                        placeholder="juan@ejemplo.com"
                        value={clientDetails.email}
                        onChange={(e) => setClientDetails({ ...clientDetails, email: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                    />
                </div>
            </div>
        </div>
    );
}
