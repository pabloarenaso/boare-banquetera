import { supabase } from '@/lib/supabase/client'
import { createClient } from '@supabase/supabase-js'
import AdminQuoteBuilder from './quote-builder-client';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const sb = createClient(supabaseUrl, supabaseKey)

export const revalidate = 0;

export default async function NewQuotePage() {
    // Fetch all active products
    const { data: products } = await sb
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('category', { ascending: true })
        .order('name', { ascending: true });

    return <AdminQuoteBuilder products={products || []} />;
}
