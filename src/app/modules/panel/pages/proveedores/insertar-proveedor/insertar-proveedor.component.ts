import { Component } from '@angular/core';
import { Proveedor } from 'src/app/interfaces/proveedor';
import { ProveedorService } from '../proveedor.service';
import { Router } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-insertar-proveedor',
  templateUrl: './insertar-proveedor.component.html',
  styleUrls: ['./insertar-proveedor.component.css']
})
export class InsertarProveedorComponent {

  regProveedor: Proveedor = {
    id: 0,
    razonSocial: "",
    rfc: '',
    alias: '',
    baja: 0,
    correo: '',
    celular: '',
    ciudad: '',
    estado: '',
    codigoPostal: '',
    calle: '',
    colonia: '',
    fechaCreacion: new Date(),
    fechaModificiacion: new Date(),
    usuarioModificacion: 1
  }
  constructor(private proveedor: ProveedorService, private router: Router) { }

  Agregar() {
    if(this.regProveedor.razonSocial === ""|| this.regProveedor.rfc === ""
    || this.regProveedor.alias === "" || this.regProveedor.correo === ""
    || this.regProveedor.celular === "" || this.regProveedor.ciudad === ""
    || this.regProveedor.estado === "" || this.regProveedor.codigoPostal === ""
    || this.regProveedor.calle === "" || this.regProveedor.colonia === ""
    ){
      Swal.fire({
        icon: 'error',
        title: 'Campos vacíos',
        text: 'Por favor, completa todos los campos antes de registrar.',
      });
      return; // Detener la función si hay campos vacíos
    }

    this.proveedor.agregarProveedor(this.regProveedor).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Insersion',
          text: 'Registro Ingresado con Exito',
        });
        window.location.reload();
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de Server',
          text: `NO HAY DATOS EN LA BD: ${err}`,
        });
      }
    });
    this.router.navigate(['/proveedores']);
  }
}
