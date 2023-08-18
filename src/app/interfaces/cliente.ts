import { Usuario } from "./usuario"

export interface Cliente {
    id:number,
    nombres:string,
    apellidos:string,
    celular:string,
    codigoPostal:string,
    calle:string,
    colonia:string,
    fechaCreacion:Date,
    fechaModificacion: Date,
    usuarioModificacion: number,
    baja:number,
    userId:number
}