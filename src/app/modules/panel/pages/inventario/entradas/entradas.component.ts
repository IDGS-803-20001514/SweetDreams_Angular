import { Component } from '@angular/core';
import { InventarioService } from '../inventario.service';
import { Router } from '@angular/router';
import { IngredienteServicesService } from '../../ingrediente/services/ingrediente-services.service';
import { UnidadesService } from '../../unidades/unidades.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.css']
})
export class EntradasComponent {
  dataSource:any = []
  dtIngredientes:any = []
  dtUnidades: any =[]

  constructor(private services: InventarioService, private router: Router,
    private IngredienteS:IngredienteServicesService, private unidadS: UnidadesService){}

  
  ngOnInit() {
    this.services.getEntradas().subscribe({
      next: (response) =>{
        this.dataSource = response
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de Server',
          text: `Error al consultar entradas almacen: ${error}`,
        });
      },
    });
    this.IngredienteS.showIngredients().subscribe({
      next: (response) => {
        this.dtIngredientes = response;
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de Server',
          text: `Error al consultar ingredientes: ${error}`,
        });
      },
    });

    this.unidadS.showUnits().subscribe({
      next: (response) => {
        this.dtUnidades = response;
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de Server',
          text: `Error al consultar unidades medida: ${error}`,
        });
      },
    });
  }

  Agregar(){
    this.router.navigate(['/InsertarEntrada']);
  }
}
