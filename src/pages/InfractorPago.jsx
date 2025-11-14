import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerActaPorId } from "../api/actas";
import { iniciarPago } from "../api/pagos";

const InfractorPago = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [acta, setActa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await obtenerActaPorId(id);
        setActa(data);
      } catch (e) {
        console.error(e);
        setError("No pudimos cargar la información del acta.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handlePagar = async () => {
    try {
      setProcessing(true);
      setError("");
      const { checkoutUrl } = await iniciarPago(id);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        setError("No se recibió una URL de pago desde el servidor.");
      }
    } catch (e) {
      console.error(e);
      setError("No pudimos iniciar el pago. Intentá nuevamente.");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <div className="spinner">Preparando pago...</div>;
  if (error) return <div className="alert alert-error">{error}</div>;
  if (!acta) return <div className="alert alert-info">Acta no encontrada.</div>;

  return (
    <div className="card">
      <h1 className="page-title">Confirmar pago</h1>
      <p className="page-subtitle">
        Revisá el importe final y continuá para abonar a través de nuestra pasarela segura.
      </p>

      <div className="card-body">
        <div className="card-row">
          <span className="label">Acta:</span>
          <span>{acta.codigo || acta.id}</span>
        </div>
        <div className="card-row">
          <span className="label">Importe a abonar:</span>
          <span>
            ${acta.importe?.toFixed ? acta.importe.toFixed(2) : acta.importe}
          </span>
        </div>
        {acta.descuento_aplicado && (
          <div className="card-row">
            <span className="label">Descuento aplicado:</span>
            <span>{acta.descuento_aplicado}</span>
          </div>
        )}
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="card-footer">
        <button className="btn-ghost" onClick={() => navigate(-1)}>
          Volver
        </button>
        <button className="btn-primary" onClick={handlePagar} disabled={processing}>
          {processing ? "Redirigiendo a la pasarela..." : "Pagar ahora"}
        </button>
      </div>
    </div>
  );
};

export default InfractorPago;