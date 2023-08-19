import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseClienteComponent } from './base-cliente/base-cliente.component';
import { RouterModule } from '@angular/router';
import { VistaClienteMenuComponent } from './vista-cliente-menu/vista-cliente-menu.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { VistaClientePedidosComponent } from './vista-cliente-pedidos/vista-cliente-pedidos.component';
import { VistaClientePerfilComponent } from './vista-cliente-perfil/vista-cliente-perfil.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { VistaClienteCarritoComponent } from './vista-cliente-carrito/vista-cliente-carrito.component';
import { VistaClientePagosComponent } from './vista-cliente-pagos/vista-cliente-pagos.component';

@NgModule({
  declarations: [
    BaseClienteComponent,
    VistaClienteMenuComponent,
    VistaClientePedidosComponent,
    VistaClientePerfilComponent,
    VistaClienteCarritoComponent,
    VistaClientePagosComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
  ],
  exports: [
    BaseClienteComponent,
    VistaClienteMenuComponent,
    VistaClientePedidosComponent,
  ]
})
export class VistaClienteModule { }
