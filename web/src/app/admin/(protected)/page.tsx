import { supabase } from '@/lib/supabase/client'
import { FileText, Calendar, Users, DollarSign } from 'lucide-react'

// Since this is a server component, we should strictly reuse the supabase client or create a server one
// For simplicity in this project using the client export, but typically createClientComponentClient
// Let's create a fresh simple fetch here to avoid hydration issues or cache issues

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const sb = createClient(supabaseUrl, supabaseKey)

import QuoteList from './quote-list';

export const revalidate = 0; // Disable cache for dashboard

export default async function AdminDashboard() {

    // Fetch quotes with customer names
    const { data: quotes, error } = await sb
        .from('quotes')
        .select(`
        *,
        customers ( full_name, email )
    `)
        .order('created_at', { ascending: false })
        .limit(20);

    if (error) {
        return <div className="p-4 bg-red-50 text-red-600">Error cargando cotizaciones: {error.message}</div>
    }

    const totalQuotes = quotes.length;
    // const totalAmount = quotes.reduce((acc, q) => acc + (q.total || 0), 0);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-serif font-bold text-stone-800">Dashboard</h1>
                <p className="text-stone-500">Resumen general de cotizaciones.</p>
            </div>

            {/* Stats Cards (Placeholder data for now mainly) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-amber-100 rounded-full text-amber-600">
                            <FileText size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-stone-500 font-medium">Cotizaciones Recientes</p>
                            <p className="text-2xl font-bold text-stone-800">{totalQuotes}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Quotes Table via Client Component */}
            <QuoteList initialQuotes={quotes} />
        </div>
    )
}
