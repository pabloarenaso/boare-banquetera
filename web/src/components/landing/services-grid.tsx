import Link from "next/link";

const services = [
    {
        title: "Matrimonios",
        description: "Cada detalle cuidado para el día más importante de tu vida.",
        image: "/images/7.png",
        link: "/cotizar?tipo=matrimonio"
    },
    {
        title: "Asados",
        description: "La tradición de las brasas con nuestro sello de calidad premium.",
        image: "/images/10.png",
        link: "/cotizar?tipo=asado"
    },
    {
        title: "Cocktails & Bocados",
        description: "Sabores innovadores en formato pequeño para grandes momentos.",
        image: "/images/4.png",
        link: "/cotizar?tipo=cocktail"
    }
];

export function ServicesGrid() {
    return (
        <section id="servicios" className="py-24 bg-stone-50">
            <div className="container mx-auto px-4">

                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h2 className="text-4xl font-serif font-bold text-stone-800">Nuestros Servicios</h2>
                    <p className="text-stone-600 text-lg">
                        Ya sea una boda elegante o un asado familiar, ponemos la misma pasión en cada preparación.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <Link
                            key={index}
                            href={service.link}
                            className="group relative overflow-hidden rounded-xl aspect-[4/5] shadow-md hover:shadow-xl transition-all"
                        >
                            <img
                                src={service.image}
                                alt={service.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity" />

                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform">
                                <h3 className="text-2xl font-serif font-bold mb-2">{service.title}</h3>
                                <p className="text-sm text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {service.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
}
