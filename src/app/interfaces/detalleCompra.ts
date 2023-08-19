export interface DetalleCompra {
  id: number,
  compraId: number,
  ingredienteId: number,
  unidadMedidaId: number,
  cantidad: number,
  precioUnitario: number,
  iva: number,
  baja: number,
  compra: any,
  ingrediente: any,
  unidadMedida: any
}
