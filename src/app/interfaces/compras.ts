export interface Compra {
  id: number,
  proveedorId: number,
  metodoPagoId: number,
  baja: number,
  fechaCreacion: Date,
  fechaModificacion: Date,
  usuarioModificacion: number,
  userId: number,
}
