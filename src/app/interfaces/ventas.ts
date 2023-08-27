export interface Ventas {
    id: number;
    total: number;
    clienteId: number;
    metodoPagoId: number;
    baja: number;
    fechaCreacion: Date;
    fechaModificacion: Date;
    usuarioModificacion: number;
}

