import { Component } from '@angular/core';
import { IngredienteServicesService } from '../services/ingrediente-services.service';
import { Router } from '@angular/router';
import { Ingredientes } from 'src/app/interfaces/ingredientes';
import { UnidadesService } from '../../unidades/unidades.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-insert-ingredientes',
  templateUrl: './insert-ingredientes.component.html',
  styleUrls: ['./insert-ingredientes.component.css']
})
export class InsertIngredientesComponent {
  constructor(
    private service: IngredienteServicesService,
    private serviceUnit: UnidadesService,
    private router: Router
  ) {}

  regIngredient: Ingredientes = {
    id: 0,
    ingrediente1: '',
    stockMinimo: 0,
    baja: 1,
    fechaCreacion: new Date(),
    fechaModificacion: new Date(),
    usuarioModificacion: 1,
    unidadMedidaId: 0,
  };

  dataUnit: any = [];

  ngOnInit(): void {
     
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

  addIngredient() {
    // Verificar si los campos están vacíos
    if (
      this.regIngredient.ingrediente1 === '' ||
      this.regIngredient.stockMinimo === 0 ||
      this.regIngredient.unidadMedidaId === 0
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Campos vacíos',
        text: 'Por favor, completa todos los campos antes de registrar.',
      });
      return; // Detener la función si hay campos vacíos
    }
    this.service.insertIngredient(this.regIngredient).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Inserción',
          text: 'Registro Insertado con Exito',
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
    this.router.navigate(['/ingredientes']);
  }
}
