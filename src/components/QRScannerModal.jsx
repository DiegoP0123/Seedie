// src/components/QRScannerModal.jsx
import { useEffect, useRef, useState, useCallback } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router";

function QRScannerModal({ onClose }) {
  const navigate = useNavigate();
  const scannerRef = useRef(null);
  const [error, setError] = useState(null);
  const hasHandledRef = useRef(false);

  const handleResult = useCallback(
    (decodedText) => {
      scannerRef.current
        .stop()
        .then(() => {
          let path = decodedText;

          try {
            const url = new URL(decodedText);
            path = url.pathname + url.search + url.hash;
          } catch {
            // ya era un path relativo, se usa tal cual
          }

          onClose();
          navigate(path);
        })
        .catch(() => {
          onClose();
        });
    },
    [navigate, onClose]
  );

useEffect(() => {
  let isActive = true;
  const scanner = new Html5Qrcode("qr-reader");
  scannerRef.current = scanner;

  scanner
    .start(
      { facingMode: "environment" },
      { fps: 10, qrbox: 250 },
      (decodedText) => {
        if (hasHandledRef.current) return;
        hasHandledRef.current = true;
        handleResult(decodedText);
      },
      () => {}
    )
    .catch(() => {
      if (isActive) {
        setError("No se pudo acceder a la cámara. Revisa los permisos del navegador.");
      }
    });

  return () => {
    isActive = false;
    const currentScanner = scannerRef.current;
    if (currentScanner) {
      currentScanner
        .stop()
        .then(() => currentScanner.clear())
        .catch(() => {
          // Ignora errores al limpiar: puede que nunca haya llegado a iniciar
          try {
            currentScanner.clear();
          } catch {
            // noop
          }
        });
    }
  };
}, [handleResult]);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
        <h3 className="font-bold text-lg mb-3 text-emerald-900">
          Escanea el QR de tu planta
        </h3>

        {error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : (
          <div id="qr-reader" className="w-full rounded-xl overflow-hidden" />
        )}

        <button
          onClick={onClose}
          className="mt-4 w-full rounded-full bg-stone-200 py-2 font-semibold text-stone-700 hover:bg-stone-300 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default QRScannerModal;