import { Component } from '@angular/core';
import { UnidadesService } from './unidades.service';
import { Router } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-unidad',
  templateUrl: './unidad.component.html',
  styleUrls: ['./unidad.component.css']
})
export class UnidadComponent {
  constructor(public service: UnidadesService, private router: Router) {}

  dataSource: any = [];

  ngOnInit(): void {
    this.service.showUnits().subscribe({
      next: (response) => {
        this.dataSource = response;
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de Server',
          text: `NO HAY DATOS EN LA BD: ${error}`,
        });
      },
    });
  }

  openInsertWindow() {
    this.router.navigate(['/insertUnidades']);
  }

  openEditWindow(data: any) {
    this.router.navigate([`/editUnidades/${data.id}`]);
  }

  dropUnit(id: number) {
    this.service.deleteUnit(id).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Eliminacion',
          text: 'Registro Eliminado con Exito',
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
  }
}
