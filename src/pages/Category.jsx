import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import plantasSeed from "../data/plantasSeed.json";

function Category() {
  const [categoriaHover, setCategoriaHover] = useState(null);
  const [tooltipPos, setTooltipPos] = useState("right");
  const cardRefs = useRef({});
  const navigate = useNavigate();

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

  const handleMouseEnter = (nombreCategoria) => {
    setCategoriaHover(nombreCategoria);
    calcularPosicion(nombreCategoria);
  };

  const posicionClasses = {
    right: "left-full ml-[1px] top-0",
    left: "right-full mr-[1px] top-0",
    bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
  };

  return (
    <>
      <section className="hero py-8 sm:py-12 lg:py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {plantasSeed.categorias.map((categoria) => (
              <article
                key={categoria.categoria}
                ref={(el) => (cardRefs.current[categoria.categoria] = el)}
                className="relative"
                onMouseEnter={() => handleMouseEnter(categoria.categoria)}
                onMouseLeave={() => setCategoriaHover(null)}
              >
                {/* Tarjeta */}
                <div className="flex flex-col h-full rounded-2xl bg-white shadow-sm p-6 text-left hover:shadow-md transition-shadow">
                  <h2 className="text-2xl font-bold uppercase text-gray-900">
                    {categoria.categoria}
                  </h2>

                  <p className="mt-4 text-base text-gray-600 leading-7">
                    {categoria.descripcion}
                  </p>

                  <div className="flex justify-end mt-auto pt-6">
                    <span className="text-4xl text-gray-800 transition-all duration-300 group-hover:text-green-700 group-hover:translate-x-2">
                      ➜
                    </span>
                  </div>
                </div>

                {/* Popover */}
                {categoriaHover === categoria.categoria && (
                  <div
                    onMouseEnter={() => setCategoriaHover(categoria.categoria)}
                    className={`absolute w-50 max-w-[calc(100vw-2rem)] bg-white border border-gray-300 rounded-xl shadow-2xl z-50 p-4 ${posicionClasses[tooltipPos]}`}
                  >
                    <h3 className="text-lg font-bold text-green-700 mb-3">
                      Plantas
                    </h3>

                    <div className="space-y-2">
                      {categoria.plantas.map((planta) => (
                        <div
                          key={planta.nombre_comun}
                          onClick={() =>
                            irADetalle(categoria.categoria, planta)
                          }
                          className="cursor-pointer rounded-lg p-3 transition hover:bg-green-100"
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
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Category;
