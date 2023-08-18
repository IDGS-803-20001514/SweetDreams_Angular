import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IngredienteServicesService } from './services/ingrediente-services.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { UnidadesService } from '../unidades/unidades.service';


@Component({
  selector: 'app-ingrediente',
  templateUrl: './ingrediente.component.html',
  styleUrls: ['./ingrediente.component.css']
})
export class IngredienteComponent {
  constructor(public service: IngredienteServicesService, private router: Router, public serviceUnit: UnidadesService ) {}
  
  dataSource: any = [];
  dataUnit: any = [];

  ngOnInit(): void {
    this.service.showIngredients().subscribe({
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

    this.serviceUnit.showUnits().subscribe({
      next: (response) => {
        this.dataUnit = response;
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
    this.router.navigate(['/insertIngredientes']);
  }

  openEditWindow(data: any) {
    this.router.navigate([`/editIngredientes/${data.id}`]);
  }

  dropIngredient(id: number) {
    this.service.deleteIngredient(id).subscribe({
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
