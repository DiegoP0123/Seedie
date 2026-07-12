import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import plantasSeed from "../data/plantasSeed.json";

function Category() {
  const [categoriaHover, setCategoriaHover] = useState(null);
  const [tooltipPos, setTooltipPos] = useState("right"); // "right" | "left" | "bottom"
  const cardRefs = useRef({});
  const navigate = useNavigate();

  const irADetalle = (categoria, planta) => {
    navigate(
      `/planta/${encodeURIComponent(categoria)}/${encodeURIComponent(
        planta.nombre_comun
      )}`
    );
  };

  const calcularPosicion = (nombreCategoria) => {
    const el = cardRefs.current[nombreCategoria];
    if (!el) return;

    // En móvil, siempre mostrar abajo (no hay espacio lateral)
    if (window.innerWidth < 640) {
      setTooltipPos("bottom");
      return;
    }

    const rect = el.getBoundingClientRect();
    const tooltipWidth = 288; // w-72 = 18rem = 288px
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
    <div className="bg-[#faf7f0] min-h-screen px-8 py-10">
      <div className="py-8 sm:py-12 lg:py-8 px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plantasSeed.categorias.map((categoria) => (
            <div
              key={categoria.categoria}
              ref={(el) => (cardRefs.current[categoria.categoria] = el)}
              className="relative"
              onMouseEnter={() => handleMouseEnter(categoria.categoria)}
              onMouseLeave={() => setCategoriaHover(null)}
            >
              {/* Tarjeta */}
              <div className="group bg-white border-2 border-gray-800 rounded-lg h-80 p-6 cursor-pointer transition-all duration-300 hover:border-green-700 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold uppercase text-gray-900">
                    {categoria.categoria}
                  </h2>

                  <p className="mt-4 text-base text-gray-600 leading-7">
                    {categoria.descripcion}
                  </p>
                </div>

                <div className="flex justify-end mt-6">
                  <span className="text-4xl text-gray-800 transition-all duration-300 group-hover:text-green-700 group-hover:translate-x-2">
                    ➜
                  </span>
                </div>
              </div>

              {/* Popover */}
              {categoriaHover === categoria.categoria && (
                <div
                  onMouseEnter={() => setCategoriaHover(categoria.categoria)}
                  className={`absolute w-72 max-w-[calc(100vw-2rem)] bg-white border border-gray-300 rounded-xl shadow-2xl z-50 p-4 ${posicionClasses[tooltipPos]}`}
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Category;