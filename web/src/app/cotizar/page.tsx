import { QuoteWizard } from "@/components/quote/quote-wizard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CotizarPage() {
    return (
        <main className="min-h-screen bg-stone-50">
            <div className="bg-stone-900 text-white py-12 px-4 shadow-xl">
                <div className="container mx-auto max-w-5xl text-center space-y-4 relative">
                    <Link href="/" className="absolute left-0 top-1/2 -translate-y-1/2 text-white/60 hover:text-white flex items-center gap-2 transition-colors hidden md:flex">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="text-sm font-medium">Volver</span>
                    </Link>
                    <Link href="/" className="text-white/60 hover:text-white flex items-center justify-center gap-2 transition-colors md:hidden mb-4">
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm font-medium">Volver al inicio</span>
                    </Link>
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
