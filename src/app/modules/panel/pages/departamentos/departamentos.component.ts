import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DepartamentoServicesService } from './departamento-services.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent {
  constructor(private service: DepartamentoServicesService, private router: Router) { }

  dataSource: any = [];

  ngOnInit(): void {
    this.service.showDepartments().subscribe({
      next: (response) => {
        this.dataSource = response;
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de Server',
          text: `ERROR AL ELIMINAR EL REGISTRO DE LA BD: ${error}`,
        });
      },
    });
  }

  openInsertWindow() {
    this.router.navigate(['/insertDepartamento']);
  }

  openEditWindow(data: any) {
    this.router.navigate([`/editDepartamento/${data.id}`]);
  }

  dropDepartment(id: number) {
    this.service.deleteDepartment(id).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Eliminación',
          text: 'Registro Eliminado con Exito',
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
  }
}
