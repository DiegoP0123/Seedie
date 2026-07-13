import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import plantasSeed from "../data/plantasSeed.json";

function Category() {
  const [categoriaAbierta, setCategoriaAbierta] = useState(null);
  const [tooltipPos, setTooltipPos] = useState("right");
  const cardRefs = useRef({});
  const containerRef = useRef(null);
  const closeTimeoutRef = useRef(null);
  const navigate = useNavigate();

  const esDispositivoTactil = () =>
    typeof window !== "undefined" &&
    !window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const irADetalle = (categoria, planta) => {
    navigate(
      `/planta/${encodeURIComponent(categoria)}/${encodeURIComponent(
        planta.nombre_comun,
      )}`,
    );
  };

  const calcularPosicion = (nombreCategoria) => {
    const el = cardRefs.current[nombreCategoria];
    if (!el) return;

    if (window.innerWidth < 640) {
      setTooltipPos("bottom");
      return;
    }

    const rect = el.getBoundingClientRect();
    const tooltipWidth = 288;
    const espacioDerecha = window.innerWidth - rect.right;
    const espacioIzquierda = rect.left;

    if (espacioDerecha >= tooltipWidth + 16) {
      setTooltipPos("right");
    } else if (espacioIzquierda >= tooltipWidth + 16) {
      setTooltipPos("left");
    } else {
      setTooltipPos("bottom");
    }
  };

  const cancelarCierre = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleMouseEnter = (nombreCategoria) => {
    if (esDispositivoTactil()) return; // en mobile no abre por hover
    cancelarCierre();
    setCategoriaAbierta(nombreCategoria);
    calcularPosicion(nombreCategoria);
  };

  const handleMouseLeave = () => {
    if (esDispositivoTactil()) return;
    cancelarCierre();
    closeTimeoutRef.current = setTimeout(() => {
      setCategoriaAbierta(null);
    }, 200);
  };

  const handleCardClick = (nombreCategoria) => {
    calcularPosicion(nombreCategoria);
    setCategoriaAbierta((prev) =>
      prev === nombreCategoria ? null : nombreCategoria,
    );
  };

  // Cierra el popover si se hace click fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setCategoriaAbierta(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      cancelarCierre();
    };
  }, []);

  const posicionClasses = {
    right: "left-full ml-0 top-0 pl-3",
    left: "right-full mr-0 top-0 pr-3",
    bottom: "top-full mt-0 pt-2 left-1/2 -translate-x-1/2",
  };

  return (
    <section className="hero py-8 sm:py-12 lg:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6" ref={containerRef}>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {plantasSeed.categorias.map((categoria) => {
            const abierta = categoriaAbierta === categoria.categoria;

            return (
              <article
                key={categoria.categoria}
                ref={(el) => (cardRefs.current[categoria.categoria] = el)}
                className="relative"
                onMouseEnter={() => handleMouseEnter(categoria.categoria)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Tarjeta */}
                <div
                  onClick={() => handleCardClick(categoria.categoria)}
                  className={`group flex flex-col h-full rounded-2xl bg-white border p-6 text-left cursor-pointer transition-all duration-300 ${
                    abierta
                      ? "shadow-xl border-green-300 ring-2 ring-green-200"
                      : "shadow-sm border-gray-100 hover:shadow-lg hover:border-green-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold uppercase text-gray-900 tracking-tight">
                      {categoria.categoria}
                    </h2>
                    <span className="shrink-0 bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                      {categoria.plantas.length}
                    </span>
                  </div>

                  <p className="mt-4 text-base text-gray-600 leading-7">
                    {categoria.descripcion}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-6">
                    <span className="text-xs text-gray-400 sm:hidden">
                      Toca para ver las plantas
                    </span>
                    <span className="hidden sm:inline text-xs text-gray-400">
                      Ver plantas
                    </span>
                    <span
                      className={`text-3xl text-green-700 transition-transform duration-300 ${
                        abierta ? "translate-x-1 rotate-90 sm:rotate-0" : ""
                      } group-hover:translate-x-1`}
                    >
                      ➜
                    </span>
                  </div>
                </div>

                {/* Popover */}
                {abierta && (
                  <div
                    onMouseEnter={cancelarCierre}
                    onMouseLeave={handleMouseLeave}
                    className={`absolute w-64 sm:w-72 max-w-[calc(100vw-2rem)] z-50 ${posicionClasses[tooltipPos]}`}
                  >
                    <div className="bg-white border border-green-200 rounded-2xl shadow-2xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-bold text-green-700">
                          Plantas
                        </h3>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            cancelarCierre();
                            setCategoriaAbierta(null);
                          }}
                          className="sm:hidden text-gray-400 hover:text-gray-600 text-xl leading-none px-1"
                          aria-label="Cerrar"
                        >
                          ×
                        </button>
                      </div>

                      <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                        {categoria.plantas.map((planta) => (
                          <div
                            key={planta.nombre_comun}
                            onClick={(e) => {
                              e.stopPropagation();
                              irADetalle(categoria.categoria, planta);
                            }}
                            className="cursor-pointer rounded-lg p-3 transition-colors hover:bg-green-50 active:bg-green-100"
                          >
                            <p className="font-semibold text-gray-900">
                              {planta.nombre_comun}
                            </p>
                            <p className="text-sm italic text-gray-500">
                              {planta.nombre_cientifico}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Category;