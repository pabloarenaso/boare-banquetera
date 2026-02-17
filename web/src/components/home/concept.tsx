
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function Concept() {
    return (
        <section id="nosotros" className="py-24 bg-stone-50">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8"
                >
                    <span className="text-amber-600 font-bold uppercase tracking-widest text-sm">Nuestra Esencia</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 leading-tight">
                        Donde el Arte se encuentra con el Sabor
                    </h2>
                    <div className="space-y-6 text-stone-600 leading-relaxed text-lg">
                        <p>
                            En <strong>Boaré</strong>, creemos que cada evento es una obra de arte. Nuestra filosofía se basa en la honestidad de los ingredientes, privilegiando productos <strong>orgánicos y locales</strong> que cuentan una historia en cada bocado.
                        </p>
                        <p>
                            Inspirados en las tonalidades pasteles y la belleza natural, diseñamos montajes que no solo alimentan el cuerpo, sino que cautivan la vista y el alma. Desde la selección del menú hasta la puesta en escena, cuidamos cada detalle para reflejar tu estilo y elegancia.
                        </p>
                    </div>
                    <div className="pt-4">
                        <div className="flex gap-8">
                            <div>
                                <span className="block text-4xl font-serif font-bold text-amber-600">500+</span>
                                <span className="text-sm text-stone-500 uppercase tracking-wider">Eventos Realizados</span>
                            </div>
                            <div>
                                <span className="block text-4xl font-serif font-bold text-amber-600">100%</span>
                                <span className="text-sm text-stone-500 uppercase tracking-wider">Satisfacción</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Image Composition */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <div className="aspect-[4/5] relative rounded-2xl overflow-hidden shadow-2xl">
                        {/* Uses Image component for optimization */}
                        <div
                            className="absolute inset-0 bg-cover bg-center hover:scale-105 transition-transform duration-700"
                            style={{ backgroundImage: "url('/images/2.png')" }}
                        />
                    </div>
                    {/* Decorative element */}
                    <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-amber-100 rounded-full -z-10" />
                    <div className="absolute -top-6 -right-6 w-32 h-32 border-2 border-stone-200 rounded-full -z-10" />
                </motion.div>

            </div>
        </section>
    );
}
