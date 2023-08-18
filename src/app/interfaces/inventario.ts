export interface Inventario {
    id: number,
    existenciaInicial: number,
    existenciaActual: number,
    unidadMedidaId: number,
    fechaEntrada: Date,
    fechaModificacion: Date,
    usuarioModificacion: number,
    ingredienteId: number,
    userId: number
  }