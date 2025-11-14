import React, { useEffect, useState } from "react";
import { obtenerResumenAdmin } from "../api/actas";

const AdminDashboard = () => {
  const [resumen, setResumen] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await obtenerResumenAdmin();
        setResumen(data);
      } catch (e) {
        console.error(e);
        setError("No pudimos cargar el resumen administrativo.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className="spinner">Cargando dashboard...</div>;
  if (error) return <div className="alert alert-error">{error}</div>;

  return (
    <div className="card">
      <h1 className="page-title">Panel interno</h1>
      <p className="page-subtitle">
        Visión consolidada de infracciones internas y externas.
      </p>

      <div className="card-body">
        <div className="card-row">
          <span className="label">Total de actas:</span>
          <span>{resumen.total_actas}</span>
        </div>
        <div className="card-row">
          <span className="label">Actas internas:</span>
          <span>{resumen.actas_internas}</span>
        </div>
        <div className="card-row">
          <span className="label">Actas externas:</span>
          <span>{resumen.actas_externas}</span>
        </div>
        <div className="card-row">
          <span className="label">Pendientes de pago:</span>
          <span>{resumen.pendientes}</span>
        </div>
        <div className="card-row">
          <span className="label">Pagadas:</span>
          <span>{resumen.pagadas}</span>
        </div>
        <div className="card-row">
          <span className="label">Recaudación total:</span>
          <span>${resumen.recaudacion_total}</span>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;