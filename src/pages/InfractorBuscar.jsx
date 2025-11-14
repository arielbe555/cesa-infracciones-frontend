import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const InfractorBuscar = () => {
  const [dni, setDni] = useState("");
  const [patente, setPatente] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!dni && !patente) {
      setError("Ingresá DNI o patente para continuar.");
      return;
    }

    const searchParams = new URLSearchParams();
    if (dni) searchParams.set("dni", dni.trim());
    if (patente) searchParams.set("patente", patente.trim());

    navigate(`/infracciones?${searchParams.toString()}`);
  };

  return (
    <div className="form-card card">
      <h1 className="page-title">Consulta de infracciones</h1>
      <p className="page-subtitle">
        Ingresá tus datos para ver todas las infracciones registradas en nuestro sistema
        (internas y externas).
      </p>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>DNI del titular</label>
          <input
            type="text"
            placeholder="Ej: 30123456"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Patente del vehículo</label>
          <input
            type="text"
            placeholder="Ej: ABC123 o AE123BC"
            value={patente}
            onChange={(e) => setPatente(e.target.value.toUpperCase())}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            Buscar infracciones
          </button>
        </div>
      </form>
    </div>
  );
};

export default InfractorBuscar;