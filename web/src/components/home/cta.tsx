
import Link from "next/link";

export function Cta() {
    return (
        <section className="py-24 bg-amber-50 relative overflow-hidden">
            {"/* Background Pattern or Image could go here */"}
            <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5" />

            <div className="container mx-auto px-6 relative z-10 text-center space-y-8">
                <h2 className="text-4xl md:text-6xl font-serif font-bold text-stone-900">
                    ¿Listo para crear algo inolvidable?
                </h2>
                <p className="text-xl text-stone-600 max-w-2xl mx-auto">
                    Déjanos encargarnos de los detalles para que tú solo te preocupes de disfrutar.
                </p>
                <div className="pt-4">
                    <Link
                        href="/cotizar"
                        className="bg-stone-900 text-white px-10 py-5 rounded-full font-bold text-lg tracking-wide hover:bg-amber-600 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 inline-block"
                    >
                        COTIZAR MI EVENTO AHORA
                    </Link>
                </div>
                <p className="text-sm text-stone-500 pt-4">
                    Respuesta en menos de 24 horas • Presupuesto transparente
                </p>
            </div>
        </section>
    );
}
