import api from "./client";

export async function buscarActas({ dni, patente }) {
  const params = {};
  if (dni) params.dni = dni;
  if (patente) params.patente = patente;
  const { data } = await api.get("/actas/unificadas/buscar", { params });
  return data;
}

export async function obtenerActaPorId(id) {
  const { data } = await api.get(`/actas/unificadas/${id}`);
  return data;
}

export async function obtenerResumenAdmin() {
  const { data } = await api.get("/admin/resumen");
  return data;
}