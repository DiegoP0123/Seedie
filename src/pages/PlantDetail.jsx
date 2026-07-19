import { useParams, Link } from "react-router";
import plantasSeed from "../data/plantasSeed.json";

// Carga todas las imágenes de la carpeta Images de una sola vez
const imagenes = import.meta.glob("../assets/Images/*.webp", {
  eager: true,
  import: "default",
});

const imagenesQr = import.meta.glob("../assets/Images/*.svg", {
  eager: true,
  import: "default",
});

function normalizarNombre(nombreComun) {
  return nombreComun
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quita tildes (á->a, ó->o, etc.)
    .replace(/[()]/g, "")            // quita paréntesis
    .trim()
    .replace(/\s+/g, "_");           // espacios -> guion bajo
}

function obtenerImagenesPlanta(nombreComun) {
  const nombreArchivo = normalizarNombre(nombreComun);

  const rutas = [1, 2, 3]
    .map((n) => {
      const key = `../assets/Images/${nombreArchivo}_${n}.webp`;
      return imagenes[key];
    })
    .filter(Boolean);

  const qr = imagenesQr[`../assets/Images/${nombreArchivo}_Qr.svg`] ?? null;

  return { rutas, qr };
}

const val = (v, fallback = "No especificado") =>
  v === null || v === undefined || v === "" ? fallback : v;

// Convierte una llave tipo "diametro_tronco_cm" -> { etiqueta: "Diametro tronco", unidad: "cm" }
const UNIDADES = ["cm", "m"];

function formatearLlaveMedida(key) {
  const partes = key.split("_");
  const ultima = partes[partes.length - 1];
  let unidad = "";
  let palabras = partes;

  if (UNIDADES.includes(ultima)) {
    unidad = ultima;
    palabras = partes.slice(0, -1);
  }

  const etiqueta = palabras
    .join(" ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return { etiqueta, unidad };
}

function PlantDetail() {
  const { categoria, planta } = useParams();

  const categoriaData = plantasSeed.categorias.find(
    (c) => c.categoria === decodeURIComponent(categoria)
  );

  const plantaData = categoriaData?.plantas.find(
    (p) => p.nombre_comun === decodeURIComponent(planta)
  );

  if (!plantaData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf7f0] px-4">
        <p className="text-lg sm:text-xl text-gray-700 text-center">Planta no encontrada.</p>
      </div>
    );
  }

  const { rutas: fotos, qr} = obtenerImagenesPlanta(plantaData.nombre_comun);
  const medidas = plantaData.medidas || {};
  const medidasEntries = Object.entries(medidas).filter(([, v]) => v);
  const cuidados = plantaData.cuidados || {};
  const usos = Array.isArray(plantaData.usos) ? plantaData.usos.filter(Boolean) : [];

  return (
    <div className="bg-[#faf7f0] min-h-screen px-4 py-6 sm:px-8 sm:py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-4 sm:p-8">

        <Link
          to="/categorias"
          className="text-green-700 hover:underline text-sm inline-flex items-center gap-1"
        >
          ← Volver a categorías
        </Link>

        {/* Galería de imágenes */}
        {fotos.length > 0 && (
          <div className="mt-4 mb-2 sm:mt-6">
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {fotos.map((src, i) => (
                <div
                  key={i}
                  className="aspect-square overflow-hidden rounded-lg shadow-md ring-1 ring-black/5"
                >
                  <img
                    src={src}
                    alt={`${plantaData.nombre_comun} ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <h1 className="text-2xl sm:text-3xl font-bold text-green-700 mt-4 sm:mt-6 break-words">
          {val(plantaData.nombre_comun, "Planta sin nombre")}
        </h1>
        <p className="italic text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
          {val(plantaData.nombre_cientifico)}
        </p>

        <p className="text-gray-700 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
          {val(plantaData.descripcion, "Sin descripción disponible.")}
        </p>

        {/* Medidas (dinámico, según las llaves que tenga cada planta) */}
        {medidasEntries.length > 0 && (
          <>
            <hr className="my-4 border-green-100" />
            <h2 className="text-lg sm:text-xl font-bold mb-3 text-green-800">Medidas</h2>
            <div
              className={`grid gap-2 sm:gap-4 text-xs sm:text-sm grid-cols-1 ${
                medidasEntries.length >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"
              }`}
            >
              {medidasEntries.map(([key, value]) => {
                const { etiqueta, unidad } = formatearLlaveMedida(key);
                return (
                  <div
                    key={key}
                    className="bg-green-50 rounded-lg p-3 flex sm:flex-col sm:text-center items-center justify-between sm:justify-center gap-1"
                  >
                    <p className="text-gray-500">{etiqueta}</p>
                    <p className="font-semibold text-green-700 text-right sm:text-center">
                      {value}{unidad ? ` ${unidad}` : ""}
                    </p>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Cuidados */}
        {Object.keys(cuidados).length > 0 && (
          <>
            <hr className="my-4 border-green-100" />
            <h2 className="text-lg sm:text-xl font-bold mb-3 text-green-800">Cuidados</h2>
            <div className="space-y-2 text-gray-700 text-sm sm:text-base">
              <p><strong>Luz:</strong> {val(cuidados.luz)}</p>
              <p><strong>Riego:</strong> {val(cuidados.riego)}</p>
              <p>
                <strong>Temperatura ideal:</strong> {val(cuidados.temperatura_ideal_c)}
                {cuidados.temperatura_ideal_c ? " °C" : ""}
              </p>
              <p><strong>Humedad:</strong> {val(cuidados.humedad)}</p>
              <p><strong>Tipo de suelo:</strong> {val(cuidados.tipo_suelo)}</p>
            </div>
          </>
        )}

        <hr className="my-4 border-green-100" />

        <div className="space-y-2 text-gray-700 text-sm sm:text-base">
          <p><strong>Ciclo de vida:</strong> {val(plantaData.ciclo_vida)}</p>
          <p><strong>Toxicidad:</strong> {val(plantaData.toxicidad)}</p>
          <p><strong>Dificultad de cuidado:</strong> {val(plantaData.dificultad_cuidado)}</p>
        </div>

        {/* Usos */}
        {usos.length > 0 && (
          <div className="mt-6">
            <strong className="text-gray-800 text-sm sm:text-base">Usos:</strong>
            <div className="flex flex-wrap gap-1 mt-2">
              {usos.map((uso) => (
                <span
                  key={uso}
                  className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs"
                >
                  {uso}
                </span>
              ))}
            </div>
          </div>
        )}

        {qr && (
          <div className="mt-6 mb-2 sm:mt-8 flex flex-col items-center bg-green-50 rounded-xl p-4 sm:p-6 gap-3 ring-1 ring-green-100">
            <p className="text-green-800 font-semibold text-sm sm:text-base text-center">
              Escanea o descarga el código QR de esta planta
            </p>
            <img
              src={qr}
              alt={`QR de ${plantaData.nombre_comun}`}
              className="w-32 h-32 sm:w-40 sm:h-40 bg-white rounded-lg shadow-md p-2"
            />
            <a
              href={qr}
              download={`${normalizarNombre(plantaData.nombre_comun)}_Qr.svg`}
              className="inline-flex items-center gap-1 text-sm font-medium text-green-700 bg-white border border-green-300 rounded-full px-4 py-1.5 hover:bg-green-100 transition-colors"
            >
              ⬇ Descargar QR
            </a>
          </div>
        )}

      </div>
    </div>
  );
}

export default PlantDetail;