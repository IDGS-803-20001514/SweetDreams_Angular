import { Component } from '@angular/core';

@Component({
  selector: 'app-base-cliente',
  templateUrl: './base-cliente.component.html',
  styleUrls: ['./base-cliente.component.css'],
})
export class BaseClienteComponent {

  linksMenu: Array<any> = []

  constructor() { }

  ngOnInit(): void {
    this.linksMenu = [
      {
        nombre: 'Menu',
        icono: 'uil uil-book-reader',
        router: ['/', 'miMenu']
      },
      {
        nombre: 'Mi Carrito',
        icono: 'uil uil-chart-down',
        router: ['/', 'miCarrito']
      },
      {
        nombre: 'Mis Pedidos',
        icono: 'uil uil-invoice',
        router: ['/', 'misPedidos']
      },
      {
        nombre:'Mi Perfil',
        icono:'uil uil-user-md',
        router:['/','miPerfil']
      },
      {
        nombre: 'Log Out',
        icono: 'uil uil-sign-out-alt',
        router: ['/']
      }
    ]
  }

}
