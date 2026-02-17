
import { useFormState } from 'react-dom'
import { login } from '../actions'
import { useActionState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const initialState = {
    message: '',
}

export default function LoginPage() {
    const [state, formAction] = useActionState(login, initialState)

    return (
        <div className="min-h-screen flex items-center justify-center bg-stone-50">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-stone-200">
                <Link href="/" className="inline-flex items-center text-sm text-stone-500 hover:text-stone-800 mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Volver al inicio
                </Link>
                <h1 className="text-2xl font-serif font-bold text-center text-stone-800 mb-6">Administración Boaré</h1>

                <form action={formAction} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">Usuario</label>
                        <input
                            type="text"
                            name="user"
                            required
                            className="w-full border border-stone-300 rounded-lg p-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">Contraseña</label>
                        <input
                            type="password"
                            name="pass"
                            required
                            className="w-full border border-stone-300 rounded-lg p-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                    </div>

                    {state?.message && (
                        <p className="text-red-500 text-sm">{state.message}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-amber-600 text-white font-bold py-2 rounded-lg hover:bg-amber-700 transition-colors"
                    >
                        Ingresar
                    </button>
                </form>
            </div>
        </div>
    )
}
