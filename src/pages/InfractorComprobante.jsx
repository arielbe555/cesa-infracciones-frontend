import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { obtenerComprobante } from "../api/pagos";

const InfractorComprobante = () => {
  const { id } = useParams();
  const [comprobante, setComprobante] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await obtenerComprobante(id);
        setComprobante(data);
      } catch (e) {
        console.error(e);
        setError("No pudimos obtener el comprobante.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <div className="spinner">Cargando comprobante...</div>;
  if (error) return <div className="alert alert-error">{error}</div>;
  if (!comprobante)
    return <div className="alert alert-info">No se encontró el comprobante.</div>;

  return (
    <div className="card">
      <h1 className="page-title">Comprobante de pago</h1>
      <p className="page-subtitle">
        Este es el resumen de tu operación. Conservá este comprobante.
      </p>

      <div className="card-body">
        <div className="card-row">
          <span className="label">Acta:</span>
          <span>{comprobante.acta_codigo || comprobante.acta_id}</span>
        </div>
        <div className="card-row">
          <span className="label">Fecha de pago:</span>
          <span>{comprobante.fecha_pago}</span>
        </div>
        <div className="card-row">
          <span className="label">Importe abonado:</span>
          <span>
            ${comprobante.importe?.toFixed ? comprobante.importe.toFixed(2) : comprobante.importe}
          </span>
        </div>
        <div className="card-row">
          <span className="label">Operación:</span>
          <span>{comprobante.operacion}</span>
        </div>
        {comprobante.pdf_url && (
          <div style={{ marginTop: "1rem" }}>
            <a
              href={comprobante.pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Descargar comprobante PDF
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfractorComprobante;