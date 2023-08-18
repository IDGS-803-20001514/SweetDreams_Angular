import { Component } from '@angular/core';
import { UnidadesService } from '../unidades.service';
import { Router } from '@angular/router';
import { UnidadesMedida } from 'src/app/interfaces/unidades-media';
import Swal, { SweetAlertOptions } from 'sweetalert2';


@Component({
  selector: 'app-unidades-insertar',
  templateUrl: './unidades-insertar.component.html',
  styleUrls: ['./unidades-insertar.component.css']
})
export class UnidadesInsertarComponent {
  constructor(public service: UnidadesService, private router: Router) {}

  regUnit: UnidadesMedida = {
    id: 0,
    unidad: '',
  };

  addUnit() {
    if(this.regUnit.unidad === ''){
      Swal.fire({
        icon: 'error',
        title: 'Campos vacíos',
        text: 'Por favor, completa todos los campos antes de registrar.',
      });
      return; // Detener la función si hay campos vacíos
    }
    this.service.insertUnit(this.regUnit).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Insersion',
          text: 'Registro Ingresado con Exito',
        });
        window.location.reload();
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de Server',
          text: `NO HAY DATOS EN LA BD: ${error}`,
        });
       
      },
    });
    this.router.navigate(['/unidades']);
  }
}
