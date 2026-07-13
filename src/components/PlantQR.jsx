import { QRCodeSVG } from "qrcode.react";

function PlantQR({ categoria, nombre }) {
  const url = `${window.location.origin}/planta/${encodeURIComponent(categoria)}/${encodeURIComponent(nombre)}`;

  return (
    <div className="flex flex-col items-center gap-2">
      <QRCodeSVG value={url} size={160} />
      <span className="text-xs text-stone-500">Escanéame</span>
    </div>
  );
}

export default PlantQR;
