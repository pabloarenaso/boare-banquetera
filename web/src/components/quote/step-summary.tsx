"use client";

import { useQuoteStore } from "@/stores/quote-store";
import { FileText, Save, Loader2, Download } from "lucide-react";
import { ClientForm } from "./client-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { QuotePDF } from "./quote-pdf";

interface Props {
    onPrev: () => void;
}

export function StepSummary({ onPrev }: Props) {
    const { currentQuote, event, clientDetails, saveQuote } = useQuoteStore();
    const [isSaving, setIsSaving] = useState(false);
    const [savedQuoteId, setSavedQuoteId] = useState<string | null>(null);
    const router = useRouter();

    const handleSave = async () => {
        setIsSaving(true);
        const result = await saveQuote();

        if (result.success && result.id) {
            setSavedQuoteId(result.id);
            alert(`¡Cotización guardada con éxito! Ahora puedes descargar el PDF.`);
        } else {
            alert(`Hubo un error al guardar: ${result.error?.message || JSON.stringify(result.error)}`);
        }
        setIsSaving(false);
    };

    return (
        <div className="space-y-8 max-w-3xl mx-auto">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-serif font-bold text-stone-800">Resumen de Cotización</h2>
                <p className="text-stone-500">Revisa los detalles antes de solicitar tu reserva.</p>
            </div>

            <div className="bg-stone-50 rounded-xl p-8 border border-stone-200 space-y-6">

                {/* Client Capture Form */}
                <div className="mb-6">
                    <ClientForm />
                </div>

                {/* Header */}
                <div className="flex justify-between items-start border-b border-stone-200 pb-6">
                    <div>
                        <h3 className="font-bold text-stone-800 text-lg uppercase tracking-wide">Evento: {event.type}</h3>
                        <p className="text-stone-500 mt-1">
                            Fecha: {event.date.toLocaleDateString()} • {event.guests} Invitados
                        </p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-stone-100 shadow-sm">
                        <span className="block text-xs text-stone-400 uppercase font-bold text-center mb-1">Total Estimado</span>
                        <span className="block text-2xl font-mono font-bold text-amber-600">
                            ${currentQuote.total.toLocaleString("es-CL")}
                        </span>
                    </div>
                </div>

                {/* Items Table */}
                <div className="space-y-4">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left text-stone-400 border-b border-stone-200">
                                <th className="pb-2 font-medium">Ítem</th>
                                <th className="pb-2 font-medium text-center">Cant.</th>
                                <th className="pb-2 font-medium text-right">Precio Un.</th>
                                <th className="pb-2 font-medium text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                            {currentQuote.items.map((item) => (
                                <tr key={item.id} className="group">
                                    <td className="py-3 font-medium text-stone-700">
                                        {item.name}
                                        {item.id.startsWith('staff') && (
                                            <span className="ml-2 text-[10px] bg-stone-200 text-stone-600 px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                                                Personal Requerido
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-3 text-center text-stone-600">{item.quantity}</td>
                                    <td className="py-3 text-right text-stone-600">${item.unit_price.toLocaleString("es-CL")}</td>
                                    <td className="py-3 text-right font-bold text-stone-800">${item.total_price.toLocaleString("es-CL")}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="border-t border-stone-200 pt-6">
                    <div className="flex justify-between text-sm">
                        <span className="text-stone-500">Valor Sugerido por Persona</span>
                        <span className="font-medium text-stone-800">
                            ${Math.round(currentQuote.total / event.guests).toLocaleString("es-CL")}
                        </span>
                    </div>
                </div>

            </div>

            <div className="pt-4 flex justify-between items-center">
                <button
                    onClick={onPrev}
                    disabled={isSaving}
                    className="text-stone-500 hover:text-stone-800 font-medium px-4 py-2 disabled:opacity-50"
                >
                    Modificar
                </button>

                <div className="flex gap-4">
                    <button
                        onClick={() => router.push('/')}
                        disabled={isSaving}
                        className="text-stone-500 hover:text-stone-800 font-medium px-4 py-2 disabled:opacity-50"
                    >
                        Cancelar
                    </button>

                    {/* Save Button (Before Save) */}
                    {!savedQuoteId && (
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="bg-amber-600 text-white px-8 py-3 rounded-full hover:bg-amber-700 transition-all font-medium flex items-center gap-2 shadow-lg shadow-amber-600/20 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            {isSaving ? "Guardando..." : "Guardar Cotización"}
                        </button>
                    )}

                    {/* Download PDF Button (After Save) */}
                    {savedQuoteId && (
                        <PDFDownloadLink
                            document={
                                <QuotePDF
                                    quote={currentQuote}
                                    event={event}
                                    client={clientDetails}
                                    quoteId={savedQuoteId}
                                />
                            }
                            fileName={`Cotizacion-Boare-${savedQuoteId.slice(0, 8)}.pdf`}
                            className="bg-stone-900 text-white px-8 py-3 rounded-full hover:bg-stone-800 transition-all font-medium flex items-center gap-2 shadow-lg shadow-stone-900/20"
                        >
                            {({ loading }) => (
                                <>
                                    <Download className="w-4 h-4" />
                                    {loading ? 'Generando PDF...' : 'Descargar PDF'}
                                </>
                            )}
                        </PDFDownloadLink>
                    )}
                </div>
            </div>
        </div>
    );
}
