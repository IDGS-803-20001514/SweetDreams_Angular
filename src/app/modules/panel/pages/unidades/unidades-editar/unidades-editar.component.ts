import { Component } from '@angular/core';
import { UnidadesService } from '../unidades.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-unidades-editar',
  templateUrl: './unidades-editar.component.html',
  styleUrls: ['./unidades-editar.component.css']
})
export class UnidadesEditarComponent {
  constructor(
    private service: UnidadesService,
    private router: Router,
    private recover: ActivatedRoute
  ) {}

  id: number = 0;
  actUnit: any = {};

  ngOnInit(): void {
    this.recover.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.id = Number(idParam);
      } else {
        this.id = 0;
      }
    });

    this.service.searchUnit(this.id).subscribe({
      next: (response) => {
        this.actUnit = response;
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

  editUnit() {
    this.service.updateUnit(this.actUnit).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Actualizacion',
          text: 'Registro Actualizado con Exito',
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
