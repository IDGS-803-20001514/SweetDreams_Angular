export interface Proveedor {
    id: number;
    razonSocial: string;
    rfc: string;
    alias: string;
    baja: number;
    correo: string;
    celular: string;
    ciudad: string;
    estado: string;
    codigoPostal: string;
    calle: string;
    colonia: string;
    fechaCreacion: Date;
    fechaModificiacion: Date;
    usuarioModificacion: number;
  }