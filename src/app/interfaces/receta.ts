export interface Receta {
    id: number;
    receta: string;
    descripcion: string;
    duracion: number;
    fechaCreacion: Date;
    fechaModificacion: Date;
    usuarioModificacion: number;
    baja: number;
  }