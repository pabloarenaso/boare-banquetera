import { QuoteWizard } from "@/components/quote/quote-wizard";

export default function CotizarPage() {
    return (
        <main className="min-h-screen bg-stone-50">
            <div className="bg-stone-900 text-white py-12 px-4 shadow-xl">
                <div className="container mx-auto max-w-5xl text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold">Cotizador Inteligente</h1>
                    <p className="text-stone-400 max-w-xl mx-auto text-lg">
                        Planifica tu evento en minutos. Obtén una estimación inmediata con nuestros precios actualizados.
                    </p>
                </div>
            </div>

            <QuoteWizard />
        </main>
    );
}
