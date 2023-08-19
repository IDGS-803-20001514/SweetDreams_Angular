import { Component } from '@angular/core';
import { MenuService } from '../../panel/pages/menu/menu.service';
import { RecetaService } from '../../panel/pages/receta/service/receta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vista-cliente-menu',
  templateUrl: './vista-cliente-menu.component.html',
  styleUrls: ['./vista-cliente-menu.component.css']
})
export class VistaClienteMenuComponent {

  constructor(private menuService: MenuService,
    private reetaService: RecetaService) { }

  menu: any[] = [];

  ngOnInit(): void {

    this.menuService.getMenu().subscribe({

      next: (res) => {

        this.menu = res;

        this.menu.forEach(element => {

          this.reetaService.searchRecipe(element.recetaId).subscribe(resp => {
            element.receta = resp;
          });

        });

        console.log(this.menu);

      },
      error: (err) => {

        console.log(err);

      }
    });

    // Cuenta cuatos registros hay en el carrito
    if (localStorage.getItem('carrito') != null) {

        let carrito: any[] = JSON.parse(localStorage.getItem('carrito') || '{}');

        let contador: number = 0;

        contador = carrito.length;

        localStorage.setItem('contador', contador.toString());
      }
  }

  guardarProducto(producto: any) {

    let carrito: any[] = [];

    if (localStorage.getItem('carrito') != null) {

        carrito = JSON.parse(localStorage.getItem('carrito') || '{}');

        let existe: boolean = false;

        carrito.forEach(element => {

          if (element.id == producto.id) {

            existe = true;

          }

        });

        if (existe) {

          Swal.fire({
            icon: 'error',
            title: 'Oops... El producto ya se encuentra en el carrito',
            text: 'Si desea agregar más unidades del producto, diríjase a Mi Carrito',
          });

        } else {

          carrito.push(producto);

          // Creamos el carrito
          localStorage.setItem('carrito', JSON.stringify(carrito));

          // Cuenta cuatos registros hay en el carrito
          if (localStorage.getItem('carrito') != null) {

            let carrito: any[] = JSON.parse(localStorage.getItem('carrito') || '{}');

            let contador: number = 0;

            contador = carrito.length;

            localStorage.setItem('contador', contador.toString());

          }

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Producto agregado al carrito',
            showConfirmButton: false,
            timer: 2000
          });

        }

    } else {

        carrito.push(producto);

        localStorage.setItem('carrito', JSON.stringify(carrito));

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Producto agregado al carrito',
          showConfirmButton: false,
          timer: 2000
        });

    }

  }
}
