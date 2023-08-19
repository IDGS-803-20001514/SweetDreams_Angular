import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

import { InsertarCompraComponent } from './insertar-compra/insertar-compra.component';
import { ActualizarCompraComponent } from './actualizar-compra/actualizar-compra.component';

@NgModule({
  declarations: [
    InsertarCompraComponent,
    ActualizarCompraComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
  ]
})
export class ComprasModule { }
