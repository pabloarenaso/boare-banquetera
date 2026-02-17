
"use client";

import { Carousel } from "@/components/ui/carousel";
import Link from "next/link";
import { motion } from "framer-motion";

const slides = [
    { id: 1, image: "/images/1.png", title: "Arte & Sabor", subtitle: "Gastronomía que inspira momentos inolvidables" },
    { id: 2, image: "/images/5.png", title: "Eventos Premium", subtitle: "Diseñamos experiencias únicas para ti" },
    { id: 3, image: "/images/8.png", title: "Ingredientes Orgánicos", subtitle: "La frescura y calidad como sello distintivo" },
];

export function Hero() {
    return (
        <div className="relative h-screen w-full bg-stone-900">
            <Carousel className="h-full">
                {slides.map((slide) => (
                    <div key={slide.id} className="relative h-screen w-full">
                        {/* Background Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/40" />

                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="space-y-6"
                            >
                                <span className="text-amber-400 font-medium tracking-[0.2em] uppercase text-sm md:text-base">
                                    Banquetería & Diseño
                                </span>
                                <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight">
                                    {slide.title}
                                </h1>
                                <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light">
                                    {slide.subtitle}
                                </p>
                                <div className="pt-8">
                                    <Link
                                        href="/cotizar"
                                        className="bg-white text-stone-900 px-8 py-4 rounded-full font-bold tracking-wide hover:bg-amber-500 hover:text-white transition-all transform hover:scale-105 inline-block"
                                    >
                                        COTIZAR MI EVENTO
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                ))}
            </Carousel>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
                <span className="text-xs tracking-widest uppercase">Descubre Más</span>
            </div>
        </div>
    );
}
