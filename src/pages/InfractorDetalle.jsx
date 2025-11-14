import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerActaPorId } from "../api/actas";

const InfractorDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [acta, setActa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await obtenerActaPorId(id);
        setActa(data);
      } catch (e) {
        console.error(e);
        setError("No pudimos cargar el detalle del acta.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handlePagar = () => {
    navigate(`/pago/${id}`);
  };

  if (loading) return <div className="spinner">Cargando detalle...</div>;
  if (error) return <div className="alert alert-error">{error}</div>;
  if (!acta) return <div className="alert alert-info">Acta no encontrada.</div>;

  return (
    <div className="card">
      <h1 className="page-title">Detalle de la infracción</h1>
      <p className="page-subtitle">
        Revisá la evidencia y el detalle antes de continuar con el pago.
      </p>

      <div className="card-body">
        <div className="card-row">
          <span className="label">Acta:</span>
          <span>{acta.codigo || acta.id}</span>
        </div>
        <div className="card-row">
          <span className="label">Fecha / Hora:</span>
          <span>{acta.fecha_hora || acta.fecha}</span>
        </div>
        <div className="card-row">
          <span className="label">Lugar:</span>
          <span>{acta.lugar || "-"}</span>
        </div>
        <div className="card-row">
          <span className="label">Patente:</span>
          <span>{acta.patente || "-"}</span>
        </div>
        <div className="card-row">
          <span className="label">Velocidad detectada:</span>
          <span>{acta.velocidad_detectada || "-"} km/h</span>
        </div>
        <div className="card-row">
          <span className="label">Límite permitido:</span>
          <span>{acta.velocidad_maxima || "-"} km/h</span>
        </div>
        <div className="card-row">
          <span className="label">Importe:</span>
          <span>
            ${acta.importe?.toFixed ? acta.importe.toFixed(2) : acta.importe}
          </span>
        </div>
      </div>

      {acta.imagen_url && (
        <div style={{ marginTop: "1rem" }}>
          <div className="label" style={{ marginBottom: "0.4rem" }}>
            Evidencia fotográfica
          </div>
          <img
            src={acta.imagen_url}
            alt="Evidencia de infracción"
            style={{ maxWidth: "100%", borderRadius: "0.5rem" }}
          />
        </div>
      )}

      {acta.video_url && (
        <div style={{ marginTop: "1rem" }}>
          <div className="label" style={{ marginBottom: "0.4rem" }}>
            Video
          </div>
          <video
            src={acta.video_url}
            controls
            style={{ maxWidth: "100%", borderRadius: "0.5rem" }}
          />
        </div>
      )}

      <div className="card-footer" style={{ marginTop: "1rem" }}>
        <button className="btn-ghost" onClick={() => navigate(-1)}>
          Volver
        </button>
        {acta.estado !== "PAGADA" && (
          <button className="btn-primary" onClick={handlePagar}>
            Continuar al pago
          </button>
        )}
      </div>
    </div>
  );
};

export default InfractorDetalle;