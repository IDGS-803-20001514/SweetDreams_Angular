import { Component } from '@angular/core';
import { DepartamentoServicesService } from '../departamento-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-actualizar-departamento',
  templateUrl: './actualizar-departamento.component.html',
  styleUrls: ['./actualizar-departamento.component.css']
})
export class ActualizarDepartamentoComponent {
  constructor(private service: DepartamentoServicesService, private router: Router, private recover: ActivatedRoute) { }

  id: number = 0;
  actDepartment: any = {};

  ngOnInit(): void {
    this.recover.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.id = Number(idParam);
      } else {
        this.id = 0;
      }
    });

    // Obtener el objeto del departamento por ID:
    this.service.searchDepartment(this.id).subscribe({
      next: (response) => {
        this.actDepartment = response;
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

  editDepartment() {
    this.service.updateDepartment(this.actDepartment).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Actualización',
          text: 'Registro Actualizado con Exito',
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
