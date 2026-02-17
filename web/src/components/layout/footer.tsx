
import Link from "next/link";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-stone-900 text-stone-400 py-16">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Brand */}
                <div className="space-y-4">
                    <h3 className="font-serif text-2xl text-white font-bold tracking-widest">BOARÉ</h3>
                    <p className="text-sm leading-relaxed max-w-xs">
                        Arte, sabor y elegancia en cada detalle. Creamos experiencias gastronómicas inolvidables para tus momentos más especiales.
                    </p>
                </div>

                {/* Links */}
                <div className="space-y-4">
                    <h4 className="text-white font-bold uppercase tracking-wider text-sm">Explora</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/" className="hover:text-amber-500 transition-colors">Inicio</Link></li>
                        <li><Link href="#nosotros" className="hover:text-amber-500 transition-colors">Nosotros</Link></li>
                        <li><Link href="#servicios" className="hover:text-amber-500 transition-colors">Servicios</Link></li>
                        <li><Link href="/cotizar" className="hover:text-amber-500 transition-colors">Cotizar Evento</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div className="space-y-4">
                    <h4 className="text-white font-bold uppercase tracking-wider text-sm">Contacto</h4>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-amber-600" />
                            <span>contacto@boare.cl</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-amber-600" />
                            <span>+56 9 1234 5678</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-amber-600" />
                            <span>Santiago, Chile</span>
                        </li>
                    </ul>
                </div>

                {/* Social */}
                <div className="space-y-4">
                    <h4 className="text-white font-bold uppercase tracking-wider text-sm">Síguenos</h4>
                    <div className="flex gap-4">
                        <a href="#" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-all">
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-amber-600 hover:text-white transition-all">
                            <Facebook className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 mt-16 pt-8 border-t border-stone-800 text-center text-xs">
                <p>&copy; {new Date().getFullYear()} Boaré Banquetería. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}
