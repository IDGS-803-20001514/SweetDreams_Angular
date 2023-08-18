import { Component } from '@angular/core';
import { RecetaService } from '../service/receta.service';
import { Router } from '@angular/router';
import { Receta } from 'src/app/interfaces/receta';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { DetalleService } from '../detalle.service';
import { UnidadesService } from '../../unidades/unidades.service';
import { IngredienteServicesService } from '../../ingrediente/services/ingrediente-services.service';
import { DetalleReceta } from 'src/app/interfaces/detalleReceta';

@Component({
  selector: 'app-insertar-receta',
  templateUrl: './insertar-receta.component.html',
  styleUrls: ['./insertar-receta.component.css']
})
export class InsertarRecetaComponent {
  constructor(private service: RecetaService, 
               private serviceD: DetalleService,
               private serviceUnit: UnidadesService,
              private serviceIngredient: IngredienteServicesService,
              private router: Router) {}

  regRecipe: Receta = {
    id: 0,
    receta: '',
    descripcion: '',
    duracion: 0,
    fechaCreacion: new Date(),
    fechaModificacion: new Date(),
    usuarioModificacion: 1,
    baja: 1,
  };
   
  idReceta: number = 0;

  ingredienteId: number = 0;
  cantidad: number = 0;
  instruccion: string = '';
  unidadMedidaId: number = 0;
  recetaId: number = 0;

  dtRecetas:any = []
  dtFinalRecetas: any=[]
  //Arreglo para la tabla de los detalles
  dtDetalleTemporal : any = [];
  detalles: any = []
  dataIngredient: any = [];
  dataUnit: any = [];


 agregarDetalle(){
    if(this.ingredienteId === 0 || this.unidadMedidaId === 0 || this.cantidad === 0 || this.instruccion === ''){
      Swal.fire({
        icon: 'error',
        title: 'Campos Vacios',
        text: 'No puedes Agregar un detalle de receta vacio',
      });
      return
    }
    console.log('idIngrediente', this.ingredienteId);
    console.log('idUnidad', this.unidadMedidaId);
    
    
    this.detalles.ingredienteId = this.ingredienteId
    this.detalles.idUnidadMedida = this.unidadMedidaId
    this.detalles.cantidad = this.cantidad
    this.detalles.instruccion = this.instruccion

    this.dtDetalleTemporal.push(this.detalles)
    console.log('Detalle', this.dtDetalleTemporal);
    this.detalles = []; // Asignamos un arreglo vacío para limpiarlo
 }
  eliminarDetalle(id: number){
    const indexToRemove = this.dtDetalleTemporal.findIndex((detalle: any) => detalle.ingredienteId === id);

  if (indexToRemove !== -1) {
    this.dtDetalleTemporal.splice(indexToRemove, 1);
    console.log('Detalle eliminado:', id);
  } else {
    console.log('Detalle no encontrado para el id:', id);
  }
  }

  addRecipe() {
    if(this.regRecipe.receta === '' || this.regRecipe.descripcion === '' || this.regRecipe.duracion === 0){
      Swal.fire({
        icon: 'error',
        title: 'Campos Vacios',
        text: 'No puedes guardar campos vacios',
      });
      return
    }
    this.service.insertRecipe(this.regRecipe).subscribe({
      next: () => {
        console.log('Encabezado Receta Insertado');
        this.ObtenerRecetaInsertada()
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
    this.dtDetalleTemporal.forEach((detallesR : any) =>{
      console.log('Detalles', detallesR);
    this.serviceD.insertDetail({
        id: 0,
        ingredienteId: detallesR.ingredienteId,
        cantidad: detallesR.cantidad,
        instruccion: detallesR.instruccion,
        unidadMedidaId: detallesR.idUnidadMedida,
        recetaId: this.idReceta,
        baja: 1,
      }).subscribe({
        next: () => {
          console.log('Detalle Insertado', detallesR);
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error de Server',
            text: `NO HAY DATOS EN LA BD: ${error}`,
          });
          console.log('Detalle Error', error);
        },
      });
    })
    
  }

    ObtenerRecetaInsertada(){
      this.service.showRecipes().subscribe({
        next: (response) => {
          this.dtRecetas = response
          console.log('Recetas', this.dtRecetas);
          const ultimaPosicion = this.dtRecetas.length - 1;
          this.dtFinalRecetas = this.dtRecetas[ultimaPosicion];
          this.idReceta = this.dtFinalRecetas.id;
          console.log('Posicion Arreglo', ultimaPosicion);
          console.log('idReceta', this.idReceta);
          this.addDetail()
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error de Server',
            text: `NO HAY DATOS EN LA BD: ${error}`,
          });
        },
      });
      
      Swal.fire({
        icon: 'success',
        title: 'Inserción',
        text: 'Receta Registrada con Exito',
      });
        this.router.navigate(['/recetas']);
    }
    

  ngOnInit(): void {

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
  }

}
