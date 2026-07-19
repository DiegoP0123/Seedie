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

function AboutUs() {
  const valores = [
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
      title: "Pasión por las plantas",
      text: "Creemos que cuidar un cultivo, por pequeño que sea, mejora tu día a día.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8 text-emerald-700">
          <path
            d="M12 2 2 7l10 5 10-5-10-5Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
            fill="#ECFDF5"
          />
          <path
            d="M2 17l10 5 10-5M2 12l10 5 10-5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Información confiable",
      text: "Organizamos datos de cuidado, medidas y toxicidad de forma clara y verificada.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8 text-emerald-700">
          <path
            d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" fill="#ECFDF5" />
        </svg>
      ),
      title: "Cercanía con la comunidad",
      text: "Escuchamos a quienes cultivan a diario para mejorar cada guía y funcionalidad.",
    },
  ];

  const stats = [
    { valor: "+150", label: "especies documentadas" },
    { valor: "+30", label: "guías de cuidado" },
    { valor: "100%", label: "gratis y en español" },
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
        @keyframes floatUpSlow {
          0%,100%{
            transform:translateY(0) rotate(0deg);
          }
          50%{
            transform:translateY(-10px) rotate(3deg);
          }
        }
        .animate-float-slow{
          animation:floatUpSlow 5s infinite ease-in-out;
        }
      `}</style>

      {/* Hero */}
      <section className="hero py-8 sm:py-12 lg:py-8 bg-[#faf7f0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <div className="text-sm font-extrabold text-emerald-900 uppercase tracking-wide">
              Sobre nosotros
            </div>

            <h1 className="mt-2 text-4xl sm:text-6xl font-extrabold tracking-tight text-stone-900 leading-tight">
              Cultivamos conocimiento, no solo plantas.
            </h1>

            <p className="mt-5 text-lg text-stone-600 leading-relaxed max-w-xl">
              Seedie nació para acompañarte en cada etapa de tu cultivo, con
              información clara, confiable y fácil de aplicar, sin importar
              tu nivel de experiencia.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/categorias"
                className="inline-flex items-center rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-emerald-800 hover:scale-105 active:scale-95"
              >
                Explorar categorías
              </Link>

              <Link
                to="/"
                className="inline-flex items-center rounded-full border border-emerald-700 px-6 py-3 text-sm font-semibold text-emerald-700 transition-all duration-300 hover:bg-emerald-50 hover:scale-105 active:scale-95"
              >
                Volver al inicio
              </Link>
            </div>
          </div>

          <div className="relative h-72 sm:h-96 rounded-3xl overflow-hidden bg-gradient-to-b from-sky-100 via-sky-50 to-emerald-50 shadow-inner flex items-center justify-center">
            <div className="animate-float-slow absolute top-8 left-8 h-16 w-16 rounded-full bg-emerald-200/70" />
            <div className="animate-float-slow absolute bottom-10 right-10 h-24 w-24 rounded-full bg-emerald-300/50" style={{ animationDelay: "1.2s" }} />
            <div className="animate-float absolute top-16 right-16 h-10 w-10 rounded-full bg-yellow-200/70" style={{ animationDelay: "0.6s" }} />

            <div className="animate-float relative w-64 rounded-2xl bg-white/95 backdrop-blur-sm shadow-lg p-4">
              <span className="inline-block rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1">
                Nuestra comunidad crece
              </span>

              <p className="mt-3 text-sm text-stone-600">
                Cada día más personas registran y cuidan mejor sus plantas
                con Seedie.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Misión y visión */}
      <section className="description py-8 sm:py-12 lg:py-16 bg-[#E8F5E9]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-sm font-extrabold text-emerald-900 uppercase tracking-wide">
            Nuestro propósito
          </div>

          <h2 className="mt-2 text-2xl sm:text-5xl font-bold text-emerald-950">
            Hacer que cuidar plantas sea simple.
          </h2>

          <p className="mt-4 text-emerald-900/80 max-w-2xl mx-auto">
            Reunimos cuidados, medidas, toxicidad y usos de cada especie en
            un solo lugar, para que tomes mejores decisiones desde la
            siembra hasta la cosecha.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
            {valores.map((valor, index) => (
              <AnimatedCard key={valor.title} delay={index * 120}>
                <article className="rounded-2xl bg-white shadow-sm p-6 text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-emerald-50">
                    {valor.icon}
                  </div>

                  <h3 className="mt-3 text-lg font-bold text-emerald-900">
                    {valor.title}
                  </h3>

                  <p className="mt-2 text-sm text-emerald-900/70">
                    {valor.text}
                  </p>
                </article>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="py-8 sm:py-12 lg:py-16 bg-[#faf7f0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <AnimatedCard key={stat.label} delay={index * 120}>
                <div className="rounded-2xl bg-white shadow-sm p-8 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <p className="text-4xl font-extrabold text-emerald-700">
                    {stat.valor}
                  </p>
                  <p className="mt-2 text-sm text-stone-600">{stat.label}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Cita / cierre */}
      <section className="section py-8 sm:py-12 lg:py-16 bg-[#faf7f0]" id="comunidad">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedCard>
            <blockquote className="text-3xl sm:text-4xl font-bold italic text-emerald-600">
              "Queremos que cada persona, sin importar su experiencia, pueda
              disfrutar de un espacio verde saludable en casa."
            </blockquote>

            <cite className="block mt-4 font-bold">— Equipo Seedie</cite>

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

export default AboutUs;