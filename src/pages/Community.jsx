import { useState, useEffect, useRef, Fragment } from "react";
import { Link } from "react-router";

// Hook para animaciones al entrar al viewport (igual que en Home.jsx)
function useInView(options = { threshold: 0.15 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(element);

    return () => observer.disconnect();
  }, [options]);

  return [ref, inView];
}

// Componente para animar tarjetas (igual que en Home.jsx)
function AnimatedCard({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Comunidad() {
  const testimonios = [
    {
      texto:
        "Seedie me ayuda a recordar cada riego y entender qué funciona mejor en mi huerto urbano.",
      autor: "Ana García",
      rol: "Agricultora urbana",
    },
    {
      texto:
        "Antes se me olvidaban las fechas de siembra. Ahora tengo todo mi cuaderno de campo en un solo lugar.",
      autor: "Luis Fernández",
      rol: "Huerto en balcón",
    },
    {
      texto:
        "Las guías de cuidado me salvaron mi primer romero. Ya no tengo miedo de tener más plantas.",
      autor: "Marcela Ríos",
      rol: "Principiante",
    },
  ];

  const pasos = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8 text-emerald-700">
          <path
            d="M12 3v12M12 15l-4-4M12 15l4-4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Comparte tu progreso",
      text: "Sube fotos de tus plantas y cuéntanos cómo va tu cuaderno de campo.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8 text-emerald-700">
          <path
            d="M8 10h8M8 14h5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M21 12c0 4.4-4 8-9 8-1.2 0-2.4-.2-3.4-.6L3 21l1.7-4.1C3.6 15.6 3 13.9 3 12c0-4.4 4-8 9-8s9 3.6 9 8Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
            fill="#ECFDF5"
          />
        </svg>
      ),
      title: "Pregunta y aprende",
      text: "Resuelve dudas sobre cuidados, plagas o riego con otras personas que cultivan.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8 text-emerald-700">
          <path
            d="M12 21s-7-4.35-9.5-8.5C.8 8.7 2.4 5 6 5c2 0 3.3 1 4 2 .7-1 2-2 4-2 3.6 0 5.2 3.7 3.5 7.5C19 16.65 12 21 12 21Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
            fill="#ECFDF5"
          />
        </svg>
      ),
      title: "Sigue a otros huertos",
      text: "Descubre qué cultivan otras personas en tu ciudad y toma ideas para tu espacio.",
    },
  ];

  return (
    <Fragment>
      <style>{`
        @keyframes floatUp {
          0%,100%{
            transform:translateY(0);
          }
          50%{
            transform:translateY(-6px);
          }
        }
        .animate-float{
          animation:floatUp 3s infinite ease-in-out;
        }
      `}</style>

      {/* Hero */}
      <section className="hero py-8 sm:py-12 lg:py-8 bg-[#faf7f0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-sm font-extrabold text-emerald-900 uppercase tracking-wide">
            Comunidad Seedie
          </div>

          <h1 className="mt-2 text-4xl sm:text-6xl font-extrabold tracking-tight text-stone-900 leading-tight">
            Cultivar es mejor acompañado.
          </h1>

          <p className="mt-5 text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Miles de personas registran sus plantas, comparten avances y se
            ayudan mutuamente a resolver dudas cada semana en Seedie.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/categorias"
              className="inline-flex items-center rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-emerald-800 hover:scale-105 active:scale-95"
            >
              Empieza tu cuaderno
            </Link>

            <Link
              to="/sobrenosotros"
              className="inline-flex items-center rounded-full border border-emerald-700 px-6 py-3 text-sm font-semibold text-emerald-700 transition-all duration-300 hover:bg-emerald-50 hover:scale-105 active:scale-95"
            >
              Conoce Seedie
            </Link>
          </div>
        </div>
      </section>

      {/* Cómo participar */}
      <section className="description py-8 sm:py-12 lg:py-16 bg-[#E8F5E9]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-sm font-extrabold text-emerald-900 uppercase tracking-wide">
            ¿Cómo participar?
          </div>

          <h2 className="mt-2 text-2xl sm:text-5xl font-bold text-emerald-950">
            Tres formas de sumarte.
          </h2>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
            {pasos.map((paso, index) => (
              <AnimatedCard key={paso.title} delay={index * 120}>
                <article className="rounded-2xl bg-white shadow-sm p-6 text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-emerald-50">
                    {paso.icon}
                  </div>

                  <h3 className="mt-3 text-lg font-bold text-emerald-900">
                    {paso.title}
                  </h3>

                  <p className="mt-2 text-sm text-emerald-900/70">
                    {paso.text}
                  </p>
                </article>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-8 sm:py-12 lg:py-16 bg-[#faf7f0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <div className="text-sm font-extrabold text-emerald-900 uppercase tracking-wide">
              Lo que dice la comunidad
            </div>
            <h2 className="mt-2 text-2xl sm:text-5xl font-bold text-emerald-950">
              Historias reales de cultivo.
            </h2>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {testimonios.map((t, index) => (
              <AnimatedCard key={t.autor} delay={index * 120}>
                <article className="flex flex-col h-full rounded-2xl bg-white shadow-sm p-6 text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <p className="text-emerald-900/80 italic leading-relaxed">
                    "{t.texto}"
                  </p>
                  <div className="mt-4 pt-4 border-t border-emerald-100">
                    <p className="font-bold text-emerald-900">{t.autor}</p>
                    <p className="text-sm text-stone-500">{t.rol}</p>
                  </div>
                </article>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="section py-8 sm:py-12 lg:py-16 bg-[#faf7f0]" id="cuaderno">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedCard>
            <h2 className="text-2xl sm:text-4xl font-bold text-emerald-950">
              ¿Listo para compartir tu propio cultivo?
            </h2>

            <p className="mt-4 text-stone-600 max-w-xl mx-auto">
              Crea tu cuaderno de campo, registra tus plantas y forma parte de
              la comunidad de Seedie.
            </p>

            <div className="mt-8">
              <Link
                to="/categorias"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-900 text-white px-6 py-3 font-semibold transition-all duration-300 hover:bg-emerald-800 hover:scale-105 active:scale-95"
              >
                Empieza a explorar
              </Link>
            </div>
          </AnimatedCard>
        </div>
      </section>
    </Fragment>
  );
}

export default Comunidad;