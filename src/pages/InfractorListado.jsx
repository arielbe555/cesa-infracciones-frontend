import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { buscarActas } from "../api/actas";
import ActaCard from "../components/ActaCard";

const InfractorListado = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const dni = searchParams.get("dni");
  const patente = searchParams.get("patente");

  const [actas, setActas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await buscarActas({ dni, patente });
        setActas(data || []);
      } catch (e) {
        console.error(e);
        setError("No pudimos obtener las infracciones. Intentá nuevamente.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [dni, patente]);

  if (!dni && !patente) {
    return (
      <div className="card">
        <div className="alert alert-info">
          Volvé al paso anterior e ingresá DNI o patente para buscar tus infracciones.
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="page-title">Infracciones encontradas</h1>
      <p className="page-subtitle">
        Resultado para {dni && <>DNI <strong>{dni}</strong></>}{" "}
        {dni && patente && " · "}
        {patente && <>Patente <strong>{patente}</strong></>}
      </p>

      {loading && <div className="spinner">Buscando infracciones...</div>}
      {error && <div className="alert alert-error">{error}</div>}

      {!loading && !error && actas.length === 0 && (
        <div className="alert alert-info">
          No encontramos infracciones registradas en el sistema para estos datos.
        </div>
      )}

      <div className="list-grid">
        {actas.map((a) => (
          <ActaCard key={a.id} acta={a} />
        ))}
      </div>
    </div>
  );
};

export default InfractorListado;