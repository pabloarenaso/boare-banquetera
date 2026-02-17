
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const services = [
    {
        id: "matrimonios",
        title: "Matrimonios",
        description: "Creamos la boda de tus sueños con menús personalizados y una puesta en escena romántica y sofisticada.",
        image: "/images/3.png",
    },
    {
        id: "corporativos",
        title: "Eventos Corporativos",
        description: "Impresiona a tus clientes y colaboradores con un servicio de catering profesional, puntual y elegante.",
        image: "/images/7.png",
    },
    {
        id: "privados",
        title: "Celebraciones Privadas",
        description: "Cumpleaños, aniversarios o cenas íntimas. Llevamos la experiencia Boaré a la comodidad de tu hogar o venue.",
        image: "/images/6.png",
    },
];

export function Services() {
    return (
        <section id="servicios" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <span className="text-amber-600 font-bold uppercase tracking-widest text-sm">Nuestros Servicios</span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900">Experiencias a tu Medida</h2>
                    <p className="text-stone-500 text-lg">Nos adaptamos a cada ocasión para superar tus expectativas.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <div key={service.id} className="group relative overflow-hidden rounded-xl shadow-lg border border-stone-100 bg-white hover:shadow-xl transition-all h-[500px] flex flex-col">
                            {/* Image */}
                            <div
                                className="h-64 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
                                style={{ backgroundImage: `url(${service.image})` }}
                            />

                            {/* Content */}
                            <div className="p-8 flex-1 flex flex-col justify-between bg-stone-50 group-hover:bg-white transition-colors">
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-serif font-bold text-stone-900">{service.title}</h3>
                                    <p className="text-stone-600 leading-relaxed">{service.description}</p>
                                </div>

                                <div className="pt-6">
                                    <Link href="/cotizar" className="inline-flex items-center text-amber-600 font-bold tracking-wide hover:text-amber-800 transition-colors">
                                        COTIZAR <ArrowRight className="ml-2 w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
