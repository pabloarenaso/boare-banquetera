"use client";

import { useQuoteStore } from "@/stores/quote-store";
import { Calendar, Users, MapPin } from "lucide-react";

interface Props {
    onNext: () => void;
}

export function StepEventInfo({ onNext }: Props) {
    const { event, setEventDetails } = useQuoteStore();

    const isFormValid = event.guests > 0 && event.date;

    return (
        <div className="space-y-8 max-w-2xl mx-auto">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-serif font-bold text-stone-800">Cuéntanos sobre tu evento</h2>
                <p className="text-stone-500">Para comenzar, necesitamos algunos detalles básicos.</p>
            </div>

            <div className="space-y-6">
                {/* Guests Input */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-stone-700 flex items-center gap-2">
                        <Users className="w-4 h-4 text-amber-600" />
                        Cantidad de Invitados
                    </label>
                    <input
                        type="number"
                        min="10"
                        value={event.guests}
                        onChange={(e) => setEventDetails({ guests: parseInt(e.target.value) || 0 })}
                        className="w-full p-4 rounded-lg border border-stone-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all text-lg"
                        placeholder="Ej: 80"
                    />
                    <p className="text-xs text-stone-400">
                        * Se aplicarán reglas automáticas de personal según la cantidad.
                    </p>
                </div>

                {/* Date Input */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-stone-700 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-amber-600" />
                        Fecha Estimada
                    </label>
                    <input
                        type="date"
                        className="w-full p-4 rounded-lg border border-stone-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                        onChange={(e) => setEventDetails({ date: new Date(e.target.value) })}
                    />
                </div>

                {/* Type Selection */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-stone-700">Tipo de Evento</label>
                    <div className="grid grid-cols-3 gap-4">
                        {['matrimonio', 'asado', 'cocktail'].map((type) => (
                            <button
                                key={type}
                                onClick={() => setEventDetails({ type: type as any })}
                                className={`p-4 rounded-lg border capitalize transition-all ${event.type === type
                                        ? "border-amber-500 bg-amber-50 text-amber-800 font-medium ring-1 ring-amber-500"
                                        : "border-stone-200 hover:border-amber-300 hover:bg-stone-50"
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="pt-8 flex justify-end">
                <button
                    onClick={onNext}
                    disabled={!isFormValid}
                    className="bg-stone-900 text-white px-8 py-3 rounded-full hover:bg-stone-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                >
                    Continuar
                </button>
            </div>
        </div>
    );
}
