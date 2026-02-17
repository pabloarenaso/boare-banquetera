import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-stone-900 text-stone-300 py-12 border-t border-stone-800">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

                {/* Brand */}
                <div className="space-y-4">
                    <h3 className="text-2xl font-serif font-bold text-amber-500">Boaré</h3>
                    <p className="text-sm opacity-80 max-w-xs mx-auto md:mx-0">
                        Celebraciones inolvidables con el sabor de la tradición y la elegancia moderna.
                    </p>
                </div>

                {/* Links */}
                <div className="space-y-4">
                    <h4 className="font-semibold text-white">Enlaces Rápidos</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/cotizar" className="hover:text-amber-400 transition-colors">Cotizar Evento</Link></li>
                        <li><Link href="/admin" className="hover:text-amber-400 transition-colors">Acceso Clientes</Link></li>
                        <li><Link href="/admin" className="hover:text-amber-400 transition-colors">Panel Administración</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div className="space-y-4">
                    <h4 className="font-semibold text-white">Contacto</h4>
                    <ul className="space-y-3 text-sm flex flex-col items-center md:items-start">
                        <li className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-amber-500" />
                            <span>contacto@boare.cl</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-amber-500" />
                            <span>+56 9 1234 5678</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Instagram className="h-4 w-4 text-amber-500" />
                            <span>@boarebanqueteria</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-stone-800 mt-12 pt-8 text-center text-xs opacity-50">
                © {new Date().getFullYear()} Boaré Banquetería. Todos los derechos reservados.
            </div>
        </footer>
    );
}
