import Image from 'next/image';
import styles from './styles.module.css';

export default function Register() {
    return (
        <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${styles.container}`}>
            <div className={`max-w-md w-full space-y-8 p-10 rounded-xl shadow-lg border border-green-500 ${styles['form-container']} ${styles['glow-effect']}`}>
                <div>
                    <Image
                        className="mx-auto h-12 w-auto"
                        src="/generic-logo.svg"
                        alt="Cutting Edge"
                        width={100}
                        height={100}
                    />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                        Crear cuenta
                    </h2>
                </div>
                <form className="mt-8 space-y-6 " action="#" method="POST">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-green-500 text-white bg-neutral-700  focus:outline-none focus:z-10 sm:text-sm"
                                placeholder="Nombre de usuario"
                            />
                        </div>
                        <div>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-green-500 text-white bg-neutral-700  focus:outline-none focus:z-10 sm:text-sm mt-2"
                                placeholder="Correo electrónico"
                            />
                        </div>
                        <div>
                            <input
                                id="confirm-password"
                                name="confirm-password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-green-500 text-white bg-neutral-700  focus:outline-none focus:z-10 sm:text-sm mt-2"
                                placeholder="Confirmar contraseña"
                            />
                        </div>
                        <div>
                            <input
                                id="phone-number"
                                name="phone-number"
                                type="tel"
                                autoComplete="tel"
                                required
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-green-500 text-white bg-neutral-700 focus:outline-none focus:z-10 sm:text-sm mt-2"
                                placeholder="Número de teléfono"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className={`group relative w-2/3 py-2 px-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${styles['glow-effect']}`}
                        >
                            Registrar
                        </button>
                    </div>
                </form>
                <div className="text-sm text-center">
                    <p>Ya tienes una cuenta? </p>
                    <a href="#" className={`font-medium text-green-600 hover:text-green-500 ${styles['text-glow-effect']}`}>
                        <span className="underline">INICIAR SESIÓN</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
