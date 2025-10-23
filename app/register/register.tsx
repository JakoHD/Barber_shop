'use client';

import Image from 'next/image';
import styles from './styles.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        // Validaciones del lado del cliente
        if (username.trim() === '' || email.trim() === '' || password.trim() === '' || phoneNumber.trim() === '') {
            setError('Todos los campos son obligatorios y no pueden estar vacíos.');
            return;
        }

        if (password.length < 8) {
            setError('La contraseña debe tener al menos 8 caracteres.');
            return;
        }

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password, phone_number: phoneNumber }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Error al registrar el usuario.');
                return;
            }

            console.log('Registro exitoso:', data);
            // Mostrar mensaje de éxito y redirigir al login
            alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
            router.push('/login');

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
                        className="mx-auto h-35 w-auto "
                        src="/logo.png"
                        alt="Cutting Edge"
                        width={100}
                        height={100}
                    />
                    <h2 className="mt-6 text-center text-3xl font-extralight text-white">
                        Crear cuenta
                    </h2>
                </div>
                <form className="mt-8 space-y-6 " onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username" className="sr-only text-white">Nombre de usuario</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                className={`appearance-none rounded-md relative block w-full px-3 py-2 border border-green-500 text-white bg-neutral-700 focus:outline-none focus:ring-green-300 focus:border-green-300 focus:z-10 sm:text-sm placeholder-white ${styles['glow-effect']}`}
                                placeholder="Nombre de usuario"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="email-address" className="sr-only text-white">Correo electrónico</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className={`appearance-none rounded-md relative block w-full px-3 py-2 border border-green-500 text-white bg-neutral-700 focus:outline-none focus:ring-green-300 focus:border-green-300 focus:z-10 sm:text-sm mt-2 placeholder-white ${styles['glow-effect']}`}
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
                                autoComplete="new-password"
                                required
                                className={`appearance-none rounded-md relative block w-full px-3 py-2 border border-green-500 text-white bg-neutral-700 focus:outline-none focus:ring-green-300 focus:border-green-300 focus:z-10 sm:text-sm mt-2 placeholder-white ${styles['glow-effect']}`}
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="phone-number" className="sr-only text-white">Número de teléfono</label>
                            <input
                                id="phone-number"
                                name="phone-number"
                                type="tel"
                                autoComplete="tel"
                                required
                                className={`appearance-none rounded-md relative block w-full px-3 py-2 border border-green-500 text-white bg-neutral-700 focus:outline-none focus:ring-green-300 focus:border-green-300 focus:z-10 sm:text-sm mt-2 placeholder-white ${styles['glow-effect']}`}
                                placeholder="Número de teléfono"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className={`group relative w-2/3 py-2 px-2 border border-transparent text-m font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500  ${styles['glow-effect']}`}
                        >
                            Registrar
                        </button>
                    </div>
                </form>
                <div className="text-sm text-center">
                    <p>Ya tienes una cuenta? </p>
                    <a href="/2" className={`font-medium text-green-600 hover:text-green-500 ${styles['text-glow-effect']}`}>
                        <span className="underline">INICIAR SESIÓN</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
