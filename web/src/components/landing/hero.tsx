import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
    return (
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/images/1.png" // Using one of the provided images - likely a high quality food or setup shot
                    alt="Boaré Banquetería Evento"
                    className="w-full h-full object-cover brightness-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto space-y-6">
                <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight mb-4 drop-shadow-lg">
                    Boaré Banquetería
                </h1>
                <p className="text-xl md:text-2xl font-light opacity-90 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                    Experiencias gastronómicas llenas de calidez y cercanía.
                    Rescatamos recetas tradicionales con un toque moderno para que te sientas como en casa.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                    <Link
                        href="/cotizar"
                        className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-amber-600 rounded-full hover:bg-amber-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                    >
                        Cotizar mi Evento
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                    <Link
                        href="#servicios"
                        className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white border border-white/30 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all"
                    >
                        Ver Servicios
                    </Link>
                </div>
            </div>
        </section>
    );
}
