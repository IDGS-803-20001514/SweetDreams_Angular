import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DepartamentoServicesService } from '../../departamento-services.service';
import { Departamento } from 'src/app/interfaces/departamentos';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-agregar-departamento',
  templateUrl: './agregar-departamento.component.html',
  styleUrls: ['./agregar-departamento.component.css']
})
export class AgregarDepartamentoComponent {
  constructor(private service: DepartamentoServicesService, private router: Router) { }

  regDepartment: Departamento = {
    id: 0,
    departamento1: '',
    descripcion: '',
    baja: 1,
    fechaCreacion: new Date(),
    fechaModificacion: new Date(),
    usuarioModificacion: 1,
  }

  addDepartment() {
    if(this.regDepartment.departamento1 === ''|| this.regDepartment.descripcion === ''){
      Swal.fire({
        icon: 'error',
        title: 'Campos Invalidos',
        text: 'Es necesario llenar los campos',
      });
      return
    }
    this.service.insertDepartment(this.regDepartment).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Insercion',
          text: 'Registro Agregado con Exito',
        });
        window.location.reload();
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de Server',
          text: `ERROR AL ELIMINAR EL REGISTRO DE LA BD: ${error}`,
        });
      },
    });
    this.router.navigate(['/departamentos']);
  }
}
