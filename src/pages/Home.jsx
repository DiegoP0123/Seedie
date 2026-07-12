import data from "../data/plantasSeed.json";

function Home() {
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
      text: "Registra siembras, riegos, cosechas y fotos sin perder el historial de cada planta.",
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
          <path d="M12 3v14" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      ),
      title: "Categorías de cultivo",
      text: "Organiza hortalizas, aromáticas y flores con guías prácticas para cada etapa.",
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
      text: "Visualiza tareas próximas y mejora tus resultados con datos fáciles de entender.",
    },
  ];

  const plantas = data.categorias.flatMap((cat) => cat.plantas).slice(0, 3);

  return (
    <>
      <section className="hero py-8 sm:py-12 lg:py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Columna de texto */}
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
                className="inline-flex items-center rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-800"
              >
                Agrega una planta
              </a>
              <a
                href="#categorias"
                className="inline-flex items-center rounded-full border border-emerald-700 px-6 py-3 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-50"
              >
                Ver categorías
              </a>
              <button
                type="button"
                className="inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-stone-600 transition-colors hover:bg-stone-200/60"
              >
                Escanear QR
              </button>
            </div>
          </div>

          {/* Panel ilustrado */}
          <div
            role="img"
            aria-label="Huerto urbano ilustrado con edificios al fondo"
            className="relative h-80 sm:h-96 rounded-3xl overflow-hidden bg-gradient-to-b from-sky-100 via-sky-50 to-emerald-50 shadow-inner"
          >
            {/* Sol */}
            <div className="absolute top-6 right-8 h-14 w-14 rounded-full bg-amber-300 shadow-[0_0_40px_10px_rgba(252,211,77,0.5)]" />

            {/* Skyline */}
            <div className="absolute bottom-24 left-0 right-0 flex items-end justify-center gap-3 px-6 opacity-70">
              <div className="w-8 h-20 bg-stone-300 rounded-t-sm" />
              <div className="w-10 h-28 bg-stone-400 rounded-t-sm" />
              <div className="w-7 h-16 bg-stone-300 rounded-t-sm" />
              <div className="w-9 h-24 bg-stone-400/80 rounded-t-sm" />
              <div className="w-8 h-14 bg-stone-300 rounded-t-sm" />
            </div>

            {/* Cantero / garden bed */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-emerald-800 rounded-t-[40%]" />
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-amber-800/80 rounded-t-[35%]" />

            {/* Racimo de hojas */}
            <div className="absolute bottom-14 left-10 flex gap-1 items-end">
              <span className="block w-4 h-9 bg-emerald-600 rounded-full rotate-[-15deg]" />
              <span className="block w-4 h-12 bg-emerald-500 rounded-full" />
              <span className="block w-4 h-8 bg-emerald-600 rounded-full rotate-[15deg]" />
            </div>
            <div className="absolute bottom-12 right-14 flex gap-1 items-end">
              <span className="block w-3 h-7 bg-emerald-500 rounded-full rotate-[-10deg]" />
              <span className="block w-3 h-10 bg-emerald-600 rounded-full" />
            </div>

            {/* Tarjeta flotante */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-64 rounded-2xl bg-white/95 backdrop-blur-sm shadow-lg p-4">
              <span className="inline-block rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1">
                Tomate cherry
              </span>
              <div className="mt-3 h-1.5 w-full rounded-full bg-stone-200 overflow-hidden">
                <span className="block h-full w-3/4 rounded-full bg-emerald-600" />
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
            La propuesta mejora tu página actual con más jerarquía, tarjetas
            consistentes, llamadas a la acción claras y una estructura clara.
          </p>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-2xl bg-white shadow-sm p-6 text-left hover:shadow-md transition-shadow"
              >
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
              href="#inicio"
              className="justify-self-start lg:justify-self-end
            self-center inline-flex items-center gap-2 rounded-full
            bg-emerald-900 text-white px-6 py-3 font-semibold
            hover:bg-emerald-800 transition-colors"
            >
              Nueva entrada
            </a>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 plantas-start">
            {plantas.map((plant) => (
              <article
                className="flex flex-col h-full rounded-2xl bg-white shadow-sm p-6 text-left hover:shadow-md transition-shadow"
                key={plant.nombre_comun}
              >
                <div className="h-40 w-full rounded-xl bg-emerald-50 overflow-hidden">
                  <img
                    className="h-full w-full object-cover"
                    src={plant.imagen || undefined}
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
                    <span>Ciclo de vida: </span>
                    <strong className="text-stone-800">
                      {plant.ciclo_vida}
                    </strong>
                  </div>

                  <a
                    className="mt-auto w-full justify-center inline-flex items-center gap-2
                    rounded-full border border-emerald-700
                    bg-emerald-100 text-emerald-900 px-6 py-3 font-semibold
                    hover:bg-emerald-700 hover:text-white transition-colors"
                    href=""
                  >
                    Ver guía
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section py-8 sm:py-12 lg:py-16" id="comunidad">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <blockquote className="text-3xl sm:text-4xl font-bold italic text-emerald-600">
            “Seedie me ayuda a recordar cada riego y entender qué funciona mejor
            en mi huerto urbano.”
          </blockquote>
          <cite className="block mt-4 font-bold">— Ana García, agricultora urbana</cite>
        </div>
      </section>
    </>
  );
}

export default Home;
