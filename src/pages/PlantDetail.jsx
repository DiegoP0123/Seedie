import { useParams, Link } from "react-router";
import plantasSeed from "../data/plantasSeed.json";

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
      <div className="min-h-screen flex items-center justify-center bg-[#faf7f0]">
        <p className="text-xl text-gray-700">Planta no encontrada.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#faf7f0] min-h-screen px-8 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <Link to="/categorias" className="text-green-700 hover:underline text-sm">
          ← Volver a categorías
        </Link>

        <h1 className="text-3xl font-bold text-green-700 mt-4">
          {plantaData.nombre_comun}
        </h1>
        <p className="italic text-gray-600 mb-6">{plantaData.nombre_cientifico}</p>

        <p className="text-gray-700 mb-6">{plantaData.descripcion}</p>

        <hr className="my-4" />

        <h2 className="text-xl font-bold mb-2">Medidas</h2>
        <p><strong>Altura:</strong> {plantaData.medidas.altura_cm} cm</p>
        <p><strong>Ancho:</strong> {plantaData.medidas.ancho_cm} cm</p>
        <p><strong>Profundidad raíz:</strong> {plantaData.medidas.profundidad_raiz_cm} cm</p>

        <hr className="my-4" />

        <h2 className="text-xl font-bold mb-2">Cuidados</h2>
        <p><strong>Luz:</strong> {plantaData.cuidados.luz}</p>
        <p><strong>Riego:</strong> {plantaData.cuidados.riego}</p>
        <p><strong>Temperatura ideal:</strong> {plantaData.cuidados.temperatura_ideal_c} °C</p>
        <p><strong>Humedad:</strong> {plantaData.cuidados.humedad}</p>
        <p><strong>Tipo de suelo:</strong> {plantaData.cuidados.tipo_suelo}</p>

        <hr className="my-4" />

        <p><strong>Ciclo de vida:</strong> {plantaData.ciclo_vida}</p>
        <p><strong>Toxicidad:</strong> {plantaData.toxicidad}</p>
        <p><strong>Dificultad de cuidado:</strong> {plantaData.dificultad_cuidado}</p>

        <div className="mt-4">
          <strong>Usos:</strong>
          <div className="flex flex-wrap gap-1 mt-1">
            {plantaData.usos.map((uso) => (
              <span
                key={uso}
                className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs"
              >
                {uso}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default PlantDetail;