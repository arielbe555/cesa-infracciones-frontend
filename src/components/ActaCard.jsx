import React from "react";
import { useNavigate } from "react-router-dom";

const ActaCard = ({ acta }) => {
  const navigate = useNavigate();

  const handleDetalle = () => {
    navigate(`/infraccion/${acta.id}`);
  };

  return (
    <div className="card acta-card">
      <div className="card-header">
        <span className="badge">{acta.origen === "externo" ? "Externa" : "Interna"}</span>
        <span className={`status status-${acta.estado?.toLowerCase() || "pendiente"}`}>
          {acta.estado || "Pendiente"}
        </span>
      </div>
      <div className="card-body">
        <div className="card-row">
          <span className="label">Acta:</span>
          <span>{acta.codigo || acta.id}</span>
        </div>
        <div className="card-row">
          <span className="label">Patente:</span>
          <span>{acta.patente || "-"}</span>
        </div>
        <div className="card-row">
          <span className="label">Fecha:</span>
          <span>{acta.fecha || "-"}</span>
        </div>
        <div className="card-row">
          <span className="label">Importe:</span>
          <span>${acta.importe?.toFixed ? acta.importe.toFixed(2) : acta.importe}</span>
        </div>
      </div>
      <div className="card-footer">
        <button className="btn-primary" onClick={handleDetalle}>
          Ver detalle
        </button>
      </div>
    </div>
  );
};

export default ActaCard;