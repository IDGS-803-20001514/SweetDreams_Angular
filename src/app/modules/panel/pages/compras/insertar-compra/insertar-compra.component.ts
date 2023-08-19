import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProveedorService } from '../../proveedores/proveedor.service';
import { MetodoPagoService } from '../../metodo-pago/metodo-pago.service';
import { ComprasService } from '../compras.service';
import { IngredienteServicesService } from '../../ingrediente/services/ingrediente-services.service';
import { UnidadesService } from '../../unidades/unidades.service';
import { Compra } from 'src/app/interfaces/compras';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { SharedModule } from "../../../../../shared/shared.module";

@Component({
  selector: 'app-insertar-compra',
  templateUrl: './insertar-compra.component.html',
  styleUrls: ['./insertar-compra.component.css'],
  standalone: true,
  imports: [FormsModule, NgForOf, SharedModule]
})
export class InsertarCompraComponent {
  constructor(
    public proveedorService: ProveedorService,
    public metodoPagoService: MetodoPagoService,
    public compras: ComprasService,
    public ingredienteService: IngredienteServicesService,
    public unidadMedidaService: UnidadesService,
    public router: Router
  ) { }

  proveedores: any[] = [];
  metodoPagos: any[] = [];
  detalleCompra: any[] = [];
  unidadMedida: any;
  ingredientes: any;

  // ----------------------------------------------
  redgDetalleCompra: any = [];
  ingredienteId: number = 0;
  unidadMedidaId: number = 0;
  cantidad: number = 0;

  // ----------------------------------------------
  regCompra: Compra = {
    id: 0,
    proveedorId: 0,
    metodoPagoId: 0,
    baja: 0,
    fechaCreacion: new Date(),
    fechaModificacion: new Date(),
    usuarioModificacion: 1,
    userId: 1,
  }

  ngOnInit(): void {
    this.proveedorService.getProveedores().subscribe({
      next: (res) => {
        this.proveedores = res;
      }
    });

    this.metodoPagoService.getMetodoPago().subscribe({
      next: (res) => {
        this.metodoPagos = res;
      }
    });

    this.ingredienteService.showIngredients().subscribe({
      next: (res) => {
        this.ingredientes = res;
        console.log(this.ingredientes);
      }
    });

    this.unidadMedidaService.showUnits().subscribe({
      next: (res) => {
        this.unidadMedida = res;
        console.log(this.unidadMedida);
      }
    });
  }

  agregarCompra() {
    console.log(this.regCompra);
    this.compras.agregarCompra(this.regCompra).subscribe({
      next: (res) => {
        Swal.fire({
          title: 'Compra agregada',
          text: 'Compra agregada correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });

        const idCompra = Object.values(res)[0];

        this.redgDetalleCompra = {
          id: 0,
          compraId: idCompra,
          ingredienteId: this.ingredienteId,
          unidadMedidaId: this.unidadMedidaId,
          cantidad: this.cantidad,
          precioUnitario: 0,
          iva: 0,
          baja: 0,
        };

        console.log(this.redgDetalleCompra);

        this.compras.detalleCompra(this.redgDetalleCompra).subscribe({
          next: (res) => {
            console.log(res);
          },
          error: (err) => {
            console.log(err);
          }
        });
        this.router.navigate(['/compras']);
      },
      error: (err) => {
        console.log(err);
      }
    });

  }
}
