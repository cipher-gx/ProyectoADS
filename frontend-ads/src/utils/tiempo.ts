export const calcularSegundosRestantes = (fechaCreacionIso: string, ventanaMinutos = 5): number => {
  const inicioMs = new Date(fechaCreacionIso).getTime();
  if (Number.isNaN(inicioMs)) return ventanaMinutos * 60;
  const limiteMs = inicioMs + ventanaMinutos * 60 * 1000;
  return Math.max(0, Math.floor((limiteMs - Date.now()) / 1000));
};
