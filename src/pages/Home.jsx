import { useState, useEffect, useRef, Fragment } from "react";
import data from "../data/plantasSeed.json";
import QRScannerModal from "../components/QRScannerModal";
import { Link } from "react-router";

// Hook para animaciones al entrar al viewport
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

// Carga automáticamente todos los .webp de src/assets/Images
// (Home.jsx está en src/pages, por eso el ../assets/Images)
const plantImageModules = import.meta.glob("../assets/Images/*.webp", {
  eager: true,
  import: "default",
});

// Busca la imagen NombreDeLaPlanta_numero.webp (numero de 1 a 3)
function getPlantImage(nombreComun, variante = 1) {
  const nombreArchivo = nombreComun.trim().replace(/\s+/g, "_");
  const key = `../assets/Images/${nombreArchivo}_${variante}.webp`;
  return plantImageModules[key];
}

// Componente para animar tarjetas
function AnimatedCard({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        inView
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6"
      } ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Home() {
  const [showScanner, setShowScanner] = useState(false);
  const [progressReady, setProgressReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressReady(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-8 w-8 text-emerald-700"
        >
          <path
            d="M6 4h9a2 2 0 0 1 2 2v13a1 1 0 0 1-1.4.9L12 18l-3.6 1.9A1 1 0 0 1 7 19V4Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
            fill="#ECFDF5"
          />
          <path
            d="M9 8h5M9 11h5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M6 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h1"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      ),
      title: "Cuaderno de campo digital",
      text:
        "Registra siembras, riegos, cosechas y fotos sin perder el historial de cada planta.",
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-8 w-8 text-emerald-700"
        >
          <path
            d="M12 3c-3 2-5 2-8 1v14c3 1 5 1 8-1 3 2 5 2 8 1V4c-3 1-5 1-8-1Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
            fill="#ECFDF5"
          />
          <path
            d="M12 3v14"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </svg>
      ),
      title: "Categorías de cultivo",
      text:
        "Organiza hortalizas, aromáticas y flores con guías prácticas para cada etapa.",
    },
    {
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-8 w-8 text-emerald-700"
        >
          <path
            d="M4 20V10M10 20V4M16 20v-7M22 20H2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 10 9 5l4 3 5-6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Seguimiento de progreso",
      text:
        "Visualiza tareas próximas y mejora tus resultados con datos fáciles de entender.",
    },
  ];

  const plantas = data.categorias
    .flatMap((categoria) =>
      categoria.plantas.map((planta) => ({
        ...planta,
        categoria: categoria.categoria,
      }))
    )
    .slice(0, 3);

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

      <section className="hero py-8 sm:py-12 lg:py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-stone-900 leading-tight">
              Cultiva mejor con un registro claro.
            </h1>

            <p className="mt-5 text-lg text-stone-600 leading-relaxed max-w-xl">
              Seedie convierte tus plantas, tareas y aprendizajes en una
              experiencia ordenada para tomar mejores decisiones desde la
              siembra hasta la cosecha.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#cuaderno"
                className="inline-flex items-center rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-emerald-800 hover:scale-105 active:scale-95"
              >
                Agrega una planta
              </a>

              <Link
                to="/categorias"
                className="inline-flex items-center rounded-full border border-emerald-700 px-6 py-3 text-sm font-semibold text-emerald-700 transition-all duration-300 hover:bg-emerald-50 hover:scale-105 active:scale-95"
              >
                Ver categorías
              </Link>

              <button
                type="button"
                onClick={() => setShowScanner(true)}
                className="inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-stone-600 transition-all duration-300 hover:bg-stone-200/60 hover:scale-105 active:scale-95"
              >
                Escanear QR
              </button>

              {showScanner && (
                <QRScannerModal onClose={() => setShowScanner(false)} />
              )}
            </div>
          </div>

          <div
            className="relative h-80 sm:h-96 rounded-3xl overflow-hidden bg-gradient-to-b from-sky-100 via-sky-50 to-emerald-50 shadow-inner"
          >
            {plantImageModules["../assets/Images/huerto_urbano.webp"] && (
              <img
                src={plantImageModules["../assets/Images/huerto_urbano.webp"]}
                alt="Huerto urbano ilustrado con edificios al fondo"
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}

            <div className="animate-float absolute bottom-5 left-1/2 -translate-x-1/2 w-64 rounded-2xl bg-white/95 backdrop-blur-sm shadow-lg p-4">
              <span className="inline-block rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1">
                Tomate cherry
              </span>

              <div className="mt-3 h-1.5 w-full rounded-full bg-stone-200 overflow-hidden">
                <span
                  className="block h-full rounded-full bg-emerald-600 transition-all duration-[1500ms] ease-out"
                  style={{
                    width: progressReady ? "75%" : "0%",
                  }}
                />
              </div>

              <p className="mt-2 text-xs text-stone-500">
                Riego completado · próxima revisión mañana
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="description py-8 sm:py-12 lg:py-16 bg-[#E8F5E9]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-sm font-extrabold text-emerald-900 uppercase tracking-wide">
            ¿Qué es Seedie?
          </div>

          <h2 className="mt-2 text-2xl sm:text-5xl font-bold text-emerald-950">
            Una web simple para cuidar cada cultivo.
          </h2>

          <p className="mt-4 text-emerald-900/80 max-w-2xl mx-auto">
            La propuesta mejora tu página actual con más jerarquía,
            tarjetas consistentes, llamadas a la acción claras y una
            estructura clara.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
            {features.map((feature, index) => (
              <AnimatedCard key={feature.title} delay={index * 120}>
                <article className="rounded-2xl bg-white shadow-sm p-6 text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-emerald-50">
                    {feature.icon}
                  </div>

                  <h3 className="mt-3 text-lg font-bold text-emerald-900">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm text-emerald-900/70">
                    {feature.text}
                  </p>
                </article>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      <section className="cuaderno py-8 sm:py-12 lg:py-16" id="cuaderno">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-[2.5fr_1fr] gap-6 lg:gap-10 items-center">
            <div>
              <div className="text-sm font-extrabold text-emerald-900 uppercase tracking-wide">
                Cuaderno de campo
              </div>

              <h2 className="mt-4 sm:mt-6 text-2xl sm:text-5xl font-bold text-emerald-950 leading-tight">
                Últimas plantas agregadas
              </h2>
            </div>

            <a
              href="#cuaderno"
              className="justify-self-start lg:justify-self-end self-center inline-flex items-center gap-2 rounded-full bg-emerald-900 text-white px-6 py-3 font-semibold transition-all duration-300 hover:bg-emerald-800 hover:scale-105 active:scale-95"
            >
              Nueva entrada
            </a>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 plantas-start">
            {plantas.map((plant, index) => (
              <AnimatedCard key={plant.nombre_comun} delay={index * 120}>
                <article className="flex flex-col h-full rounded-2xl bg-white shadow-sm p-6 text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="h-40 w-full rounded-xl bg-emerald-50 overflow-hidden">
                    <img
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                      src={getPlantImage(plant.nombre_comun, 1)}
                      alt={plant.nombre_comun}
                    />
                  </div>

                  <div className="flex flex-col flex-1 mt-4">
                    <span className="w-fit inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                      {plant.dificultad_cuidado}
                    </span>

                    <h3 className="mt-3 text-lg font-bold text-emerald-900">
                      {plant.nombre_comun}
                    </h3>

                    <div className="mt-2 mb-5 text-sm text-stone-600">
                      <span>Ciclo de vida:</span>
                      <strong className="text-stone-800 ml-1">
                        {plant.ciclo_vida}
                      </strong>
                    </div>

                    <Link
                      className="mt-auto w-full justify-center inline-flex items-center gap-2 rounded-full border border-emerald-700 bg-emerald-100 text-emerald-900 px-6 py-3 font-semibold transition-all duration-300 hover:bg-emerald-700 hover:text-white hover:scale-[1.03]"
                      to={`/planta/${encodeURIComponent(
                        plant.categoria
                      )}/${encodeURIComponent(plant.nombre_comun)}`}
                    >
                      Ver guía
                    </Link>
                  </div>
                </article>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      <section className="section py-8 sm:py-12 lg:py-16" id="comunidad">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedCard>
            <blockquote className="text-3xl sm:text-4xl font-bold italic text-emerald-600">
              "Seedie me ayuda a recordar cada riego y entender qué funciona
              mejor en mi huerto urbano."
            </blockquote>

            <cite className="block mt-4 font-bold">
              — Ana García, agricultora urbana
            </cite>
          </AnimatedCard>
        </div>
      </section>
    </Fragment>
  );
}

export default Home;