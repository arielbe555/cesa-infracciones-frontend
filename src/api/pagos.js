import api from "./client";

export async function iniciarPago(actaId) {
  const { data } = await api.post("/pagos/iniciar", { actaId });
  return data; // { checkoutUrl }
}

export async function obtenerComprobante(actaId) {
  const { data } = await api.get(`/pagos/comprobante/${actaId}`);
  return data;
}