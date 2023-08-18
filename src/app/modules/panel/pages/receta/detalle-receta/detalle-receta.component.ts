import { Component } from '@angular/core';
import { DetalleService } from '../detalle.service';
import { IngredienteServicesService } from '../../ingrediente/services/ingrediente-services.service';
import { UnidadesService } from '../../unidades/unidades.service';
import { RecetaService } from '../service/receta.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-detalle-receta',
  templateUrl: './detalle-receta.component.html',
  styleUrls: ['./detalle-receta.component.css']
})
export class DetalleRecetaComponent {
  constructor(
    public service: DetalleService,
    public serviceIngredient: IngredienteServicesService,
    public serviceUnit: UnidadesService,
    public serviceReceta: RecetaService,
    private router: Router,
    private recover: ActivatedRoute
  ) { }

  id: number = 0;
  dataSource: any = [];
  dataIngredient: any = [];
  dataReceta: any = [];
  dataUnit: any = [];

  ngOnInit(): void {
    this.recover.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.id = Number(idParam);
      } else {
        this.id = 0;
      }
    });

    // Obtener datos de detalle:
    this.service.showDetail().subscribe({
      next: (response) => {
        this.dataSource = response;
        this.filterData();
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de Server',
          text: `NO HAY DATOS EN LA BD: ${error}`,
        });
      },
    });

    // Obtener datos de ingrediente:
    this.serviceIngredient.showIngredients().subscribe({
      next: (response) => {
        this.dataIngredient = response;
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de Server',
          text: `NO HAY DATOS EN LA BD: ${error}`,
        });
      },
    });

    // Obtener datos de unidades:
    this.serviceUnit.showUnits().subscribe({
      next: (response) => {
        this.dataUnit = response;
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de Server',
          text: `NO HAY DATOS EN LA BD: ${error}`,
        });
      },
    });

    // Obtener datos de receta:
    this.serviceReceta.showRecipes().subscribe({
      next: (response) => {
        this.dataReceta = response;
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



  dropDetail(id: number) {
    this.service.deleteDetail(id).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Eliminacion',
          text: 'Detalle Receta Eliminado con Exito',
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

  private filterData(): void {
    this.dataSource = this.dataSource.filter(
      (item: any) => item.recetaId === this.id
    );
  }
}
