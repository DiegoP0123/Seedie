function Home() {
  const features = [
    {
      icon: "journal",
      title: "Cuaderno de campo digital",
      text: "Registra siembras, riegos, cosechas y fotos sin perder el historial de cada planta.",
      classes: "card h-100 border-0 seed-card p-4"
    },
    {
      icon: "library",
      title: "Categorías de cultivo",
      text: "Organiza hortalizas, aromáticas y flores con guías prácticas para cada etapa.",
      classes: "card h-100 border-0 seed-card p-4"
    },
    {
      icon: "analytics",
      title: "Seguimiento de progreso",
      text: "Visualiza tareas próximas y mejora tus resultados con datos fáciles de entender.",
      classes: "card h-100 border-0 seed-card p-4"
    }
  ];

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
            Qué es Seedie
          </div>
          <h2 className="mt-2 text-2xl sm:text-5xl font-bold text-emerald-950">
            Una web simple para cuidar cada cultivo.
          </h2>
          <p className="mt-4 text-emerald-900/80 max-w-2xl mx-auto">
            La propuesta mejora tu página actual con más jerarquía, tarjetas
            consistentes, llamadas a la acción claras y una estructura clara.
          </p>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature) => (
                <div className="rounded-2xl bg-white shadow-sm p-6 text-left hover:shadow-md transition-shadow" key={feature.title}>
                  <article className={feature.classes}>
                    < i className={`bi bi-${feature.icon}`} />
                    <h3 className="text-lg font-bold text-emerald-900">{feature.title}</h3>
                    <p className="mt-2 text-sm text-emerald-900/70">{feature.text}</p>
                  </article>
                </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
