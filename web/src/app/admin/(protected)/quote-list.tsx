'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Modal } from '@/components/ui/modal';

interface QuoteListProps {
    initialQuotes: any[];
}

export default function QuoteList({ initialQuotes }: QuoteListProps) {
    const [quotes, setQuotes] = useState(initialQuotes);
    const [isDeleting, setIsDeleting] = useState(false);
    const [quoteToDelete, setQuoteToDelete] = useState<string | null>(null);
    const router = useRouter();

    const handleDeleteClick = (id: string) => {
        setQuoteToDelete(id);
    };

    const handleConfirmDelete = async () => {
        if (!quoteToDelete) return;
        setIsDeleting(true);

        try {
            // 1. Delete items first
            const { error: itemsError } = await supabase
                .from('quote_items')
                .delete()
                .eq('quote_id', quoteToDelete);

            if (itemsError) throw itemsError;

            // 2. Delete quote
            const { error: quoteError } = await supabase
                .from('quotes')
                .delete()
                .eq('id', quoteToDelete);

            if (quoteError) throw quoteError;

            // UI Update
            setQuotes(prev => prev.filter(q => q.id !== quoteToDelete));
            toast.success('Cotización eliminada correctamente');
            router.refresh();
        } catch (error: any) {
            console.error('Error deleting quote:', error);
            toast.error('Error eliminando cotización: ' + error.message);
        } finally {
            setIsDeleting(false);
            setQuoteToDelete(null);
        }
    };

    return (
        <>
            <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-stone-200 bg-stone-50/50 flex justify-between items-center">
                    <h3 className="font-bold text-stone-800 font-serif text-lg">Últimas Cotizaciones</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-stone-50/80 text-stone-500 font-medium uppercase text-xs border-b border-stone-100">
                            <tr>
                                <th className="px-6 py-3 font-semibold tracking-wider">Fecha</th>
                                <th className="px-6 py-3 font-semibold tracking-wider">Cliente</th>
                                <th className="px-6 py-3 font-semibold tracking-wider">Evento</th>
                                <th className="px-6 py-3 font-semibold tracking-wider text-right">Invitados</th>
                                <th className="px-6 py-3 font-semibold tracking-wider text-right">Total</th>
                                <th className="px-6 py-3 font-semibold tracking-wider text-center">Estado</th>
                                <th className="px-6 py-3 font-semibold tracking-wider text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100 bg-white">
                            {quotes.map((quote) => (
                                <tr key={quote.id} className="hover:bg-stone-50/80 group transition-colors duration-150">
                                    <td className="px-6 py-4 text-stone-600 tabular-nums">
                                        {new Date(quote.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-stone-900">{quote.customers?.full_name || 'Desconocido'}</div>
                                        <div className="text-xs text-stone-500">{quote.customers?.email}</div>
                                    </td>
                                    <td className="px-6 py-4 text-stone-600">
                                        <div className="font-medium">{quote.event_name}</div>
                                        <div className="text-xs text-stone-400">{new Date(quote.event_date).toLocaleDateString()}</div>
                                    </td>
                                    <td className="px-6 py-4 text-right text-stone-600 tabular-nums font-medium">
                                        {quote.guest_count}
                                    </td>
                                    <td className="px-6 py-4 text-right font-bold text-stone-800 tabular-nums">
                                        ${quote.total.toLocaleString('es-CL')}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wide
                                            ${quote.status === 'draft' ? 'bg-stone-100 text-stone-600 border border-stone-200' : ''}
                                            ${quote.status === 'viewed' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' : ''}
                                            ${quote.status === 'accepted' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : ''}
                                            ${quote.status === 'rejected' ? 'bg-red-50 text-red-700 border border-red-100' : ''}
                                            ${quote.status === 'paid' ? 'bg-blue-50 text-blue-700 border border-blue-100' : ''}
                                            ${quote.status === 'completed' ? 'bg-stone-800 text-white' : ''}
                                        `}>
                                            {quote.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Link
                                                href={`/admin/quotes/${quote.id}`}
                                                className="p-2 text-stone-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all"
                                                title="Editar / Ver Detalle"
                                            >
                                                <Edit size={16} />
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteClick(quote.id)}
                                                className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                title="Eliminar"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {quotes.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-stone-400 italic">
                                        No hay cotizaciones registradas aún.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={!!quoteToDelete}
                onClose={() => setQuoteToDelete(null)}
                title="Eliminar Cotización"
                footer={
                    <>
                        <button
                            onClick={() => setQuoteToDelete(null)}
                            className="px-4 py-2 text-sm font-medium text-stone-600 hover:text-stone-800 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleConfirmDelete}
                            disabled={isDeleting}
                            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition-colors flex items-center gap-2"
                        >
                            {isDeleting ? 'Eliminando...' : 'Eliminar Permanentemente'}
                        </button>
                    </>
                }
            >
                <div className="text-stone-600">
                    <p className="mb-2">¿Estás seguro que deseas eliminar esta cotización?</p>
                    <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">
                        ⚠️ Esta acción eliminará permanentemente la cotización y todos sus ítems asociados. No se puede deshacer.
                    </p>
                </div>
            </Modal>
        </>
    );
}
