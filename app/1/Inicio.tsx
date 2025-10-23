"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { User, Settings, Scissors, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface Reserva {
  fecha: string;
  tipoCorte: string;
}

type Vista = "principal" | "servicios" | "barberos" | "galeria";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [fecha, setFecha] = useState("");
  const [tipoCorte, setTipoCorte] = useState("Fade clásico");
  const [vista, setVista] = useState<Vista>("principal");
  const [showListaReservas, setShowListaReservas] = useState(false);
  const [isUserRegistered, setIsUserRegistered] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("reservas");
    if (saved) setReservas(JSON.parse(saved));
    
    // Verificar si el usuario está logueado
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    const showModalFlag = localStorage.getItem('showReservationModal');
    
    if (userLoggedIn === 'true') {
      setIsUserRegistered(true);
      // Cargar datos del usuario
      setUserData({
        name: localStorage.getItem('userName') || '',
        email: localStorage.getItem('userEmail') || '',
        phone: localStorage.getItem('userPhone') || '',
        password: ''
      });
    }
    
    // Mostrar modal automáticamente si viene del registro
    if (showModalFlag === 'true') {
      setShowModal(true);
      // Limpiar la bandera para que no se muestre en futuras cargas
      localStorage.removeItem('showReservationModal');
    }
  }, []);

  const handleReserva = () => {
    if (!fecha) return;
    const nuevaReserva: Reserva = { fecha, tipoCorte };
    const nuevas = [...reservas, nuevaReserva];
    setReservas(nuevas);
    localStorage.setItem("reservas", JSON.stringify(nuevas));
    setShowModal(false);
  };

  const handleAgendarCita = () => {
    if (isUserRegistered) {
      setShowModal(true);
    } else {
      router.push('/register');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userPhone');
    localStorage.removeItem('userRegistered');
    router.push('/login');
  };

  const handleProfileUpdate = () => {
    // Actualizar datos en localStorage
    localStorage.setItem('userName', userData.name);
    localStorage.setItem('userEmail', userData.email);
    localStorage.setItem('userPhone', userData.phone);
    
    // Aquí podrías hacer una llamada a la API para actualizar en el servidor
    console.log('Perfil actualizado:', userData);
    setShowProfileModal(false);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2800,
    arrows: false,
  };

  const barberos = [
    { nombre: "Carlos FadeMaster", img: "/barbero1.jpg" },
    { nombre: "Luis Blade", img: "/barbero2.jpg" },
    { nombre: "Javi Fresh", img: "/barbero1.jpg" },
    { nombre: "Andrés Styles", img: "/barbero2.jpg" },
    { nombre: "Diego Sharp", img: "/barbero1.jpg" },
  ];

  const servicios = [
    "Fade clásico",
    "Low fade",
    "High fade",
    "Barba + Corte",
    "Corte infantil",
    "Cejas + Barba",
  ];

  const galeria = ["barbero1.jpg", "barbero2.jpg"];

  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-black text-white font-sans">
      {/* --- PANTALLA INICIAL --- */}
      {vista === "principal" && (
        <>
          <section className="snap-start h-screen flex flex-col items-center justify-center relative bg-linear-to-b from-black via-gray-900 to-black">
            <div className="absolute inset-0 bg-[url('/textura-metalica.png')] bg-cover bg-center opacity-10" />

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <Image
                src="/graffiti-inicial.png"
                alt="Graffiti Barber"
                width={280}
                height={280}
                className="object-contain drop-shadow-[0_0_20px_rgba(34,197,94,0.5)] mb-8"
              />
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="flex flex-col items-center text-center"
            >
              <p className="text-green-400 font-semibold tracking-wide text-lg mb-3 uppercase">
                Desplaza para explorar
              </p>
              <span className="text-4xl text-green-400 animate-bounce">⬇️</span>
            </motion.div>
          </section>

          {/* --- PANTALLA PRINCIPAL --- */}
          <section
            className="snap-start min-h-screen flex flex-col items-center justify-start p-4 sm:p-6 bg-cover bg-center relative"
            style={{ backgroundImage: "url('/fondo.jpg')" }}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            <div className="relative z-10 w-full max-w-md mt-8 sm:mt-10">
              {/* Carrusel */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="rounded-2xl overflow-hidden shadow-[0_0_25px_rgba(34,197,94,0.5)] border border-green-400/40"
              >
                <Slider {...sliderSettings}>
                  {galeria.map((img, i) => (
                    <div key={i}>
                      <Image
                        src={`/${img}`}
                        alt={`Barbero ${i + 1}`}
                        width={400}
                        height={400}
                        className="rounded-2xl object-cover w-full h-[300px] sm:h-[350px]"
                      />
                    </div>
                  ))}
                </Slider>
              </motion.div>

              {/* Reservas */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => setShowListaReservas(!showListaReservas)}
                className="mt-6 text-center bg-black/60 border border-green-400/30 rounded-xl py-4 px-3 shadow-[0_0_20px_rgba(34,197,94,0.3)] cursor-pointer"
              >
                <p className="text-green-400 font-semibold">
                  RESERVAR TU PRÓXIMA CITA
                </p>
                {reservas.length > 0 ? (
                  <p className="text-gray-300 text-sm mt-2">
                    Tienes {reservas.length} reserva
                    {reservas.length > 1 ? "s" : ""} programada
                  </p>
                ) : (
                  <p className="text-gray-400 text-sm mt-1">
                    No hay reservas próximas.
                  </p>
                )}
              </motion.div>

              {/* Lista de reservas */}
              <AnimatePresence>
                {showListaReservas && reservas.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mt-3 bg-black/70 border border-green-400/20 rounded-xl p-3 text-sm text-gray-300 space-y-2 max-h-[200px] overflow-y-auto"
                  >
                    {reservas.map((r, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center border-b border-gray-700/50 pb-1"
                      >
                        <span>
                          {r.fecha} —{" "}
                          <span className="text-green-400">{r.tipoCorte}</span>
                        </span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Botón principal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6 text-center"
              >
                <button
                  onClick={handleAgendarCita}
                  className="w-full py-3 text-lg font-semibold bg-black/70 border border-green-400 text-green-400 rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.6)] hover:bg-green-500 hover:text-black transition-all flex items-center justify-center gap-2"
                >
                  <Scissors className="w-5 h-5" />
                  {isUserRegistered ? "AGENDAR CITA" : "REGISTRARSE PARA AGENDAR"}
                </button>
              </motion.div>

              {/* Botones inferiores */}
              <div className="flex justify-around mt-4 flex-wrap gap-2">
                {[
                  { text: "SERVICIOS", view: "servicios" },
                  { text: "BARBEROS", view: "barberos" },
                  { text: "GALERÍA", view: "galeria" },
                ].map((btn, i) => (
                  <button
                    key={i}
                    onClick={() => setVista(btn.view as Vista)}
                    className="bg-black/70 border border-green-400/40 text-green-400 rounded-md px-4 py-2 text-sm font-semibold hover:bg-green-500 hover:text-black transition-all shadow-[0_0_15px_rgba(34,197,94,0.4)] w-[30%] sm:w-auto"
                  >
                    {btn.text}
                  </button>
                ))}
              </div>

              {/* Perfil / ajustes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-6 text-center"
              >
                <button 
                  onClick={() => setShowProfileModal(true)}
                  className="w-full flex items-center justify-center gap-3 py-3 bg-black/70 border border-green-400/40 text-green-400 rounded-md text-sm font-semibold hover:bg-green-500 hover:text-black transition-all shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                >
                  <User className="w-5 h-5" />
                  PERFIL · AJUSTES
                  <Settings className="w-5 h-5" />
                </button>
              </motion.div>
            </div>
          </section>
        </>
      )}

      {/* --- VISTA SERVICIOS --- */}
      {vista === "servicios" && (
        <PantallaSecundaria titulo="Servicios" volver={() => setVista("principal")}>
          <div className="grid grid-cols-1 gap-4 mt-4">
            {servicios.map((s, i) => (
              <div
                key={i}
                className="bg-black/70 border border-green-400/30 rounded-xl p-4 text-center text-green-400 font-semibold shadow-[0_0_15px_rgba(34,197,94,0.4)]"
              >
                {s}
              </div>
            ))}
          </div>
        </PantallaSecundaria>
      )}

      {/* --- VISTA BARBEROS --- */}
      {vista === "barberos" && (
        <PantallaSecundaria titulo="Barberos" volver={() => setVista("principal")}>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {barberos.map((b, i) => (
              <div
                key={i}
                className="bg-black/70 border border-green-400/30 rounded-xl p-3 text-center text-sm shadow-[0_0_15px_rgba(34,197,94,0.4)]"
              >
                <Image
                  src={b.img}
                  alt={b.nombre}
                  width={150}
                  height={150}
                  className="rounded-xl mx-auto mb-2 object-cover h-[120px] w-full"
                />
                <p className="text-green-400 font-semibold">{b.nombre}</p>
              </div>
            ))}
          </div>
        </PantallaSecundaria>
      )}

      {/* --- VISTA GALERÍA --- */}
      {vista === "galeria" && (
        <PantallaSecundaria titulo="Galería" volver={() => setVista("principal")}>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {galeria.map((img, i) => (
              <Image
                key={i}
                src={`/${img}`}
                alt={`Foto ${i + 1}`}
                width={200}
                height={200}
                className="rounded-xl object-cover w-full h-[150px] border border-green-400/30"
              />
            ))}
          </div>
        </PantallaSecundaria>
      )}

      {/* --- MODAL DE NUEVA RESERVA --- */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-gray-900 border border-green-400/40 p-6 rounded-2xl shadow-[0_0_25px_rgba(34,197,94,0.6)] w-full max-w-sm"
            >
              <h3 className="text-green-400 font-bold text-lg mb-4 text-center">
                Reservar nueva cita
              </h3>

              <label className="block text-sm text-gray-300 mb-2">
                Selecciona la fecha:
              </label>
              <input
                type="date"
                className="w-full p-2 rounded-md text-black focus:ring-2 focus:ring-green-500 outline-none"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />

              <label className="block text-sm text-gray-300 mt-4 mb-2">
                Tipo de corte:
              </label>
              <select
                className="w-full p-2 rounded-md text-black focus:ring-2 focus:ring-green-500 outline-none"
                value={tipoCorte}
                onChange={(e) => setTipoCorte(e.target.value)}
              >
                {servicios.map((s, i) => (
                  <option key={i}>{s}</option>
                ))}
              </select>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleReserva}
                  className="flex-1 bg-green-500 text-black font-semibold py-2 rounded-md hover:bg-green-600 transition-all"
                >
                  Guardar
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-700 text-white font-semibold py-2 rounded-md hover:bg-gray-600 transition-all"
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MODAL DE EDICIÓN DE PERFIL --- */}
      <AnimatePresence>
        {showProfileModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-gray-900 border border-green-400/40 p-6 rounded-2xl shadow-[0_0_25px_rgba(34,197,94,0.6)] w-full max-w-md"
            >
              <h3 className="text-green-400 font-bold text-lg mb-4 text-center">
                Editar Perfil
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Nombre:
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 rounded-md text-white focus:ring-2 focus:ring-green-500 outline-none"
                    value={userData.name}
                    onChange={(e) => setUserData({...userData, name: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Correo electrónico:
                  </label>
                  <input
                    type="email"
                    className="w-full p-2 rounded-md text-white focus:ring-2 focus:ring-green-500 outline-none"
                    value={userData.email}
                    onChange={(e) => setUserData({...userData, email: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Teléfono:
                  </label>
                  <input
                    type="tel"
                    className="w-full p-2 rounded-md text-white focus:ring-2 focus:ring-green-500 outline-none"
                    value={userData.phone}
                    onChange={(e) => setUserData({...userData, phone: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Nueva contraseña (opcional):
                  </label>
                  <input
                    type="password"
                    className="w-full p-2 rounded-md text-white focus:ring-2 focus:ring-green-500 outline-none"
                    value={userData.password}
                    onChange={(e) => setUserData({...userData, password: e.target.value})}
                    placeholder="Dejar vacío para mantener la actual"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleProfileUpdate}
                  className="flex-1 bg-green-500 text-black font-semibold py-2 rounded-md hover:bg-green-600 transition-all"
                >
                  Guardar Cambios
                </button>
                <button
                  onClick={() => setShowProfileModal(false)}
                  className="flex-1 bg-gray-700 text-white font-semibold py-2 rounded-md hover:bg-gray-600 transition-all"
                >
                  Cancelar
                </button>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-700">
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-600 text-white font-semibold py-2 rounded-md hover:bg-red-700 transition-all"
                >
                  Cerrar Sesión
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// 🧩 Componente auxiliar para vistas secundarias
function PantallaSecundaria({
  titulo,
  volver,
  children,
}: {
  titulo: string;
  volver: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen w-full bg-black text-white p-6 flex flex-col items-center"
    >
      <div className="w-full max-w-md">
        <button
          onClick={volver}
          className="flex items-center gap-2 text-green-400 hover:text-green-300 transition mb-4"
        >
          <ArrowLeft className="w-5 h-5" /> Volver
        </button>
        <h2 className="text-2xl font-bold text-center text-green-400 mb-4">
          {titulo}
        </h2>
        {children}
      </div>
    </motion.div>
  );
}
