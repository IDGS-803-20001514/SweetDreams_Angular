import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecetaService } from './service/receta.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { DetalleService } from './detalle.service';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent {
  constructor(public service: RecetaService, public serviceD: DetalleService, private router: Router) {}

  dataSource: any = [];
  idReceta:number = 0
  dtRecetas: any = []

  ngOnInit(): void {
    this.service.showRecipes().subscribe({
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
    this.router.navigate(['/insertReceta']);
  }

  openEditWindow(data: any) {
    this.router.navigate([`/editReceta/${data.id}`]);
  }

  detalles(){
  this.serviceD.showDetail().subscribe({
    next: (response) => {
      this.dtRecetas = response;
      this.filterData();
      this.dropDetail();
      this.service.deleteRecipe(this.idReceta).subscribe({
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
    },
    error: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error de Server',
        text: `NO HAY DATOS EN LA BD: ${error}`,
      });
    },
  });}

  dropRecipe(id: number) {
    this.idReceta = id
    this.detalles()
  }

  private filterData(): void {
    this.dtRecetas = this.dtRecetas.filter(
      (item: any) => item.recetaId === this.idReceta
    );
    console.log('Filtrado', this.dtRecetas);
    
  }

  dropDetail() {
    this.dtRecetas.forEach((detallesR : any) =>{
    this.serviceD.deleteDetail(detallesR.id).subscribe({
      next: () => {
       console.log('Detalle Eliminado');
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de Server',
          text: `NO HAY DATOS EN LA BD: ${error}`,
        });
      },
    });
    });
  }


  openDetailWindow(data: any) {
    this.router.navigate([`/detalle/${data.id}`]);
  }
}
