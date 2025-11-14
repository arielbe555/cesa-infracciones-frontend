import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import InfractorBuscar from "./pages/InfractorBuscar";
import InfractorListado from "./pages/InfractorListado";
import InfractorDetalle from "./pages/InfractorDetalle";
import InfractorPago from "./pages/InfractorPago";
import InfractorComprobante from "./pages/InfractorComprobante";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/consultar" replace />} />
        <Route path="/consultar" element={<InfractorBuscar />} />
        <Route path="/infracciones" element={<InfractorListado />} />
        <Route path="/infraccion/:id" element={<InfractorDetalle />} />
        <Route path="/pago/:id" element={<InfractorPago />} />
        <Route path="/comprobante/:id" element={<InfractorComprobante />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Layout>
  );
}

export default App;