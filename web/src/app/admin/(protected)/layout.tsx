import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, FilePlus, LogOut } from 'lucide-react'
import { logout } from '../actions'

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const cookieStore = await cookies()
    const session = cookieStore.get('admin_session')

    if (!session) {
        redirect('/admin/login')
    }

    return (
        <div className="min-h-screen flex bg-stone-50">
            {/* Sidebar */}
            <aside className="w-64 bg-stone-900 text-stone-100 flex flex-col">
                <div className="p-6 border-b border-stone-800">
                    <h2 className="text-xl font-serif font-bold text-amber-500">BOARÉ</h2>
                    <p className="text-xs text-stone-400">Admin Panel</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link
                        href="/admin"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-stone-800 transition-colors text-stone-200"
                    >
                        <LayoutDashboard size={20} />
                        Dashboard
                    </Link>
                    <Link
                        href="/admin/quotes/new"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-stone-800 transition-colors text-stone-200"
                    >
                        <FilePlus size={20} />
                        Nueva Cotización
                    </Link>
                </nav>

                <div className="p-4 border-t border-stone-800">
                    <form action={logout}>
                        <button className="flex items-center gap-3 px-4 py-2 w-full text-left rounded-lg hover:bg-red-900/30 text-red-400 hover:text-red-300 transition-colors">
                            <LogOut size={18} />
                            Cerrar Sesión
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
