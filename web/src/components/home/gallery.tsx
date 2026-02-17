
"use client";

import { motion } from "framer-motion";

const images = [
    "/images/9.png",
    "/images/10.png",
    "/images/11.png",
    "/images/4.png",
    "/images/1.png",
    "/images/5.png",
];

export function Gallery() {
    return (
        <section id="galeria" className="py-24 bg-stone-900 text-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="space-y-4 max-w-xl">
                        <span className="text-amber-400 font-bold uppercase tracking-widest text-sm">Portafolio</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold">Nuestra Galería</h2>
                        <p className="text-stone-400 text-lg">Un vistazo a los detalles que hacen la diferencia.</p>
                    </div>
                    <button className="border border-stone-700 text-stone-300 px-8 py-3 rounded-full hover:bg-white hover:text-stone-900 transition-all font-bold">
                        Ver Todo en Instagram
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {images.map((src, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative overflow-hidden rounded-lg group ${index === 1 || index === 4 ? "md:row-span-2 aspect-[3/4]" : "aspect-square"
                                }`}
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url(${src})` }}
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-white font-serif italic text-xl">Ver Detalle</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
