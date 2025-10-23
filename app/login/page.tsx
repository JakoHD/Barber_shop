'use client';

import Image from 'next/image';
import styles from '../2/styles.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        if (email.trim() === '' || password.trim() === '') {
            setError('Correo electrónico y contraseña son obligatorios.');
            return;
        }

        if (password.length < 8) {
            setError('La contraseña debe tener al menos 8 caracteres.');
            return;
        }

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Error al iniciar sesión.');
                return;
            }

            // Guardar datos del usuario en localStorage
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userName', data.username || 'Usuario');
            localStorage.setItem('userPhone', data.phone_number || '');
            
            console.log('Inicio de sesión exitoso:', data);
            router.push('/'); // Redirigir a la página principal

        } catch (err) {
            setError('Error de red o del servidor.');
            console.error(err);
        }
    };

    return (
        <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${styles.container}`}>
            <div className={`max-w-md w-full space-y-8 p-10 rounded-xl shadow-lg border border-green-500 ${styles['form-container']} ${styles['glow-effect']}`}>
                <div>
                    <Image
                        className="mx-auto h-35 w-auto"
                        src="/logo.png"
                        alt="Cutting Edge"
                        width={100}
                        height={100}
                    />
                    <h2 className="mt-6 text-center text-3xl font-extralight text-white">
                        INICIAR SESIÓN
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only text-white">Correo electrónico</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className={`appearance-none rounded-md relative block w-full px-3 py-2 border border-green-500 text-white bg-neutral-700 focus:outline-none focus:ring-green-300 focus:border-green-300 focus:z-10 sm:text-sm  placeholder-white`}
                                placeholder="Correo electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only text-white">Contraseña</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className={`appearance-none rounded-md relative block w-full px-3 py-2 border border-green-500 text-white bg-neutral-700 focus:outline-none focus:ring-green-300 focus:border-green-300 focus:z-10 sm:text-sm mt-2 placeholder-white`}
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <div>
                        <button
                            type="submit"
                            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500  ${styles['glow-effect']}`}
                        >
                            INICIAR SESIÓN
                        </button>
                    </div>
                </form>
                <div className="text-sm text-center">
                    <p>¿No tienes una cuenta? </p>
                    <a href="/register" className={`font-medium text-green-600 hover:text-green-500 ${styles['text-glow-effect']}`}>
                        <span className="underline">REGÍSTRATE</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
