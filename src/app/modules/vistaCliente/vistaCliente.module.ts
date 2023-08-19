import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseClienteComponent } from './base-cliente/base-cliente.component';
import { RouterModule } from '@angular/router';
import { VistaClienteMenuComponent } from './vista-cliente-menu/vista-cliente-menu.component';

// <mat-sidenav-content>
//   <app-vista-cliente-menu></app-vista-cliente-menu>
//   <router-outlet></router-outlet>
// </mat-sidenav-content>

// <mat-sidenav-content>

import { MatSidenavModule } from '@angular/material/sidenav';
import { VistaClientePedidosComponent } from './vista-cliente-pedidos/vista-cliente-pedidos.component';
import { VistaClientePerfilComponent } from './vista-cliente-perfil/vista-cliente-perfil.component';


@NgModule({
  declarations: [
    BaseClienteComponent,
    VistaClienteMenuComponent,
    VistaClientePedidosComponent,
    VistaClientePerfilComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule
  ],
  exports: [
    BaseClienteComponent,
    VistaClienteMenuComponent,
    VistaClientePedidosComponent,
  ]
})
export class VistaClienteModule { }
