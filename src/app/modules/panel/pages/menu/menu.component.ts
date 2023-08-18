import { Component } from '@angular/core';
import { MenuService } from './menu.service';
import { Router } from '@angular/router';
import { RecetaService } from '../receta/service/receta.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(public menu: MenuService, private router: Router, private receta: RecetaService) { }

  dataSource: any = [];

  ngOnInit() {

    this.menu.getMenu().subscribe(
      {
        next: response => {

          this.dataSource = response;

          for (let index = 0; index < this.dataSource.length; index++) {
            const element = this.dataSource[index];

            this.receta.searchRecipe(element.recetaId).subscribe({

              next: (res) => {

                this.dataSource[index].receta = res;

              }

            })
          }
        },
        error: error => console.log(error)
      }
    );
  }

  openInsertMenu() {
    this.router.navigate(['/agregarMenu']);
  }

  openEditarMenu(data: any) {
    this.router.navigate([`/editarMenu/${data.id}`]);
  }

  eliminarMenu(id: number) {

    Swal.fire({
      title: '¿Está seguro de eliminar el menú?',
      text: "No podrá revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        this.menu.deleteMenu(id).subscribe({
          next: (res) => {
            Swal.fire({
              icon: 'success',
              title: 'Eliminacion',
              text: 'Registro Eliminado con Exito',
            });
            window.location.reload();
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Error de Server',
              text: 'No se pudo eliminar el menu',
            });
          }
        });
      }
    });
  }
}
