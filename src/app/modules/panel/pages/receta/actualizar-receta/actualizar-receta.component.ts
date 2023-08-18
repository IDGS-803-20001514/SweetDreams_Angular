import { Component } from '@angular/core';
import { Receta } from 'src/app/interfaces/receta';
import { RecetaService } from '../service/receta.service';
import { DetalleService } from '../detalle.service';
import { UnidadesService } from '../../unidades/unidades.service';
import { IngredienteServicesService } from '../../ingrediente/services/ingrediente-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-actualizar-receta',
  templateUrl: './actualizar-receta.component.html',
  styleUrls: ['./actualizar-receta.component.css']
})
export class ActualizarRecetaComponent {

  constructor(private service: RecetaService, 
    private serviceD: DetalleService,
    private serviceUnit: UnidadesService,
    private serviceReceta: RecetaService,
   private serviceIngredient: IngredienteServicesService,
   private router: Router, private recover: ActivatedRoute ) {}

   id: number = 0;
  actReceta: any = {};
  dataIngredient: any = [];
  dataUnit: any = [];
  dtReceta: any = [];

  ingredienteId: number = 0;
  cantidad: number = 0;
  instruccion: string = '';
  unidadMedidaId: number = 0;

  ngOnInit(): void {
    this.recover.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.id = Number(idParam);
      } else {
        this.id = 0;
      }
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
   this.serviceReceta.searchRecipe(this.id).subscribe({
    next: (response) => {
      this.actReceta = response;
      console.log('Encabezado Receta', this.actReceta);
      
    },
    error: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error de Server',
        text: `NO HAY DATOS EN LA BD: ${error}`,
      });
    },
  });

  // Obtener datos de detalle:
  this.serviceD.showDetail().subscribe({
    next: (response) => {
      this.dtReceta = response;
      this.filterData();
      console.log('Detalles Receta', this.dtReceta);
      
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
    this.dtReceta = this.dtReceta.filter(
      (item: any) => item.recetaId === this.id
    );
  }

  editRecipe() {
    this.service.updateRecipe(this.actReceta).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Actualizacion',
          text: 'Receta Actualizada con Exito',
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
    this.router.navigate(['/recetas']);
  }

  dropDetail(id: number) {
    this.serviceD.deleteDetail(id).subscribe({
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

  addDetail() {
    if(this.ingredienteId === 0 || this.cantidad === 0 || this.instruccion === '' ||
       this.unidadMedidaId === 0){
      Swal.fire({
        icon: 'error',
        title: 'Campos Vacios',
        text: 'No puedes guardar campos vacios',
      });
      return
    }
    this.serviceD
      .insertDetail({
        id: 0,
        ingredienteId: this.ingredienteId,
        cantidad: this.cantidad,
        instruccion: this.instruccion,
        unidadMedidaId: this.unidadMedidaId,
        recetaId: this.id,
        baja: 1,
      })
      .subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Insercion',
            text: 'Detalle Receta Registrada con Exito',
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
