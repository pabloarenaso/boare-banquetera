import { supabase } from '@/lib/supabase/client'
import { createClient } from '@supabase/supabase-js'
import QuoteDetails from './quote-details';
import { notFound } from 'next/navigation';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const sb = createClient(supabaseUrl, supabaseKey)

export const revalidate = 0;

export default async function QuotePage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;

    const { data: quote, error } = await sb
        .from('quotes')
        .select(`
            *,
            customers ( * ),
            quote_items ( * )
        `)
        .eq('id', resolvedParams.id)
        .single();

    if (error || !quote) {
        return <div className="p-8 text-center text-red-500">Cotización no encontrada</div>;
    }

    return <QuoteDetails quote={quote} />;
}
