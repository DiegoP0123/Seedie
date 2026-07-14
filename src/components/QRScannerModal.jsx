// src/components/QRScannerModal.jsx
import { useEffect, useRef, useState, useCallback } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router";

function QRScannerModal({ onClose }) {
  const navigate = useNavigate();
  const scannerRef = useRef(null);
  const startPromiseRef = useRef(null); // 👈 nuevo: guarda la promesa de start()
  const hasHandledRef = useRef(false);

  const [error, setError] = useState(null);

  const stopScannerSafely = useCallback(async () => {
    const scanner = scannerRef.current;
    if (!scanner) return;

    try {
      if (startPromiseRef.current) {
        await startPromiseRef.current;
      }

      if (scanner.isScanning) {
        await scanner.stop();
      }
      scanner.clear();
    } catch {
      try {
        scanner.clear();
      } catch {
        // noop
      }
    }
  }, []);

  const handleResult = useCallback(
    async (decodedText) => {
      await stopScannerSafely();

      let path = decodedText;

      try {
        const url = new URL(decodedText);

        // Esta app usa HashRouter: la ruta real vive después del "#"
        // ej: https://.../Seedie/#/planta/Cactus/Cactus%20Saguaro
        //                        👆 esto es lo que nos interesa
        if (url.hash) {
          path = url.hash.slice(1); // quita el "#" → "/planta/Cactus/Cactus%20Saguaro"
        } else {
          path = url.pathname + url.search;
        }
      } catch {
        // no era una URL absoluta, se usa tal cual (ya debería venir como path relativo)
      }

      onClose();
      navigate(path);
    },
    [navigate, onClose, stopScannerSafely],
  );

  useEffect(() => {
    let isActive = true;
    let cancelled = false; // 👈 nuevo: para no arrancar si ya nos pidieron limpiar

    async function iniciarScanner() {
      const scanner = new Html5Qrcode("qr-reader");
      scannerRef.current = scanner;

      const promesaDeStart = scanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          if (hasHandledRef.current) return;
          hasHandledRef.current = true;
          handleResult(decodedText);
        },
        () => {},
      );

      startPromiseRef.current = promesaDeStart;

      try {
        await promesaDeStart;

        // Si el cleanup ya se disparó mientras esperábamos, detenemos
        // este scanner de inmediato en vez de dejarlo corriendo.
        if (cancelled) {
          await scanner.stop().catch(() => {});
          scanner.clear();
          return;
        }
      } catch (err) {
        console.error("Error al iniciar el scanner:", err);
        if (isActive) {
          setError(
            "No se pudo acceder a la cámara. Revisa los permisos del navegador.",
          );
        }
      }
    }

    iniciarScanner();

    return () => {
      isActive = false;
      cancelled = true;
      stopScannerSafely();
    };
  }, [handleResult, stopScannerSafely]);

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