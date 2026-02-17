
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Inicio", href: "/" },
        { name: "Nosotros", href: "#nosotros" },
        { name: "Servicios", href: "#servicios" },
        { name: "Galería", href: "#galeria" },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link href="/" className={`font-serif text-2xl font-bold tracking-widest transition-colors ${isScrolled ? "text-stone-900" : "text-white"}`}>
                    BOARÉ
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`text-sm font-medium tracking-wide hover:text-amber-500 transition-colors ${isScrolled ? "text-stone-600" : "text-white/90"
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/cotizar"
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${isScrolled
                                ? "bg-stone-900 text-white hover:bg-amber-600"
                                : "bg-white text-stone-900 hover:bg-amber-50"
                            }`}
                    >
                        COTIZAR AHORA
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-2xl"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? (
                        <X className={isScrolled ? "text-stone-900" : "text-white"} />
                    ) : (
                        <Menu className={isScrolled ? "text-stone-900" : "text-white"} />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-stone-100 p-6 flex flex-col gap-4 shadow-xl">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-stone-600 font-medium hover:text-amber-600"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/cotizar"
                        className="bg-stone-900 text-white text-center py-3 rounded-lg font-bold"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        COTIZAR AHORA
                    </Link>
                </div>
            )}
        </nav>
    );
}
