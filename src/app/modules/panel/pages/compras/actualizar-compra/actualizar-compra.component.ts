import { Component } from '@angular/core';
import { ComprasService } from '../compras.service';
import { ProveedorService } from '../../proveedores/proveedor.service';
import { IngredienteServicesService } from '../../ingrediente/services/ingrediente-services.service';
import { UnidadesService } from '../../unidades/unidades.service';
import { MetodoPagoService } from '../../metodo-pago/metodo-pago.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Compra } from 'src/app/interfaces/compras';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { SharedModule } from "../../../../../shared/shared.module";

@Component({
  selector: 'app-actualizar-compra',
  templateUrl: './actualizar-compra.component.html',
  styleUrls: ['./actualizar-compra.component.css'],
  standalone: true,
  imports: [FormsModule, NgForOf, SharedModule]
})
export class ActualizarCompraComponent {
  constructor(
    public compraService: ComprasService,
    public proveedorService: ProveedorService,
    public ingredienteService: IngredienteServicesService,
    public unidadMedidaSevide: UnidadesService,
    public metodoPagoService: MetodoPagoService,
    private router: Router
  ) { }

  compras: any;
  proveedores: any[] = [];
  ingredientes: any;
  unidadMedida: any;
  metodoPagos: any[] = [];

  cantidad: number = 0;

  // Variables para los select del formulario se carguen dependiendo el valor que se seleccione
  selectedProveedorId: number = 0;
  selectMetodoPagoId: number = 0;
  selectIngredienteId: number = 0;
  selectUnidadMedidaId: number = 0;

  // ---------------------------------------------------

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

  redgDetalleCompra = {
    id: 0,
    compraId: 0,
    ingredienteId: 0,
    unidadMedidaId: 0,
    cantidad: 0,
    precioUnitario: 0,
    iva: 0,
    baja: 0,
    compra: {},
    ingrediente: {},
    unidadMedida: {}
  };

  // --------------------- METODOS ---------------------

  // Obtener el id de la compra por medio de la url
  idCompra = Number(window.location.pathname.split('/')[2]);

  ngOnInit(): void {

    //Se obtienen todos los proveedores para mostrarlos en el select del formulario
    this.proveedorService.getProveedores().subscribe({

      next: (res) => {

        this.proveedores = res;
      },
      error: (error) => console.log(error)
    });

    //Se obtienen todas las unidades de medida para mostrarlas en el select del formulario
    this.unidadMedidaSevide.showUnits().subscribe({

      next: (res) => {

        this.unidadMedida = res;
      },

      error: (error) => console.log(error)

    });

    //Se obtienen todos los ingredientes para mostrarlos en el select del formulario
    this.ingredienteService.showIngredients().subscribe({

      next: (res) => {

        this.ingredientes = res;

      },
      error: (error) => console.log(error)

    });

    //Se obtienen todos los metodos de pago para mostrarlos en el select del formulario
    this.metodoPagoService.getMetodoPago().subscribe({

      next: (res) => {

        this.metodoPagos = res;
      },
      error: (error) => console.log(error)
    });

    //Se obtiene la compra y posterior el detalle de la compra
    this.compraService.obtenerCompra(this.idCompra).subscribe({

      next: (res) => {

        this.compras = res;

        this.compraService.getDetallesCompras().subscribe({

          next: (res) => {

            this.compras.detallesCompra = res.filter((detalleCompra) => detalleCompra.compraId == this.idCompra);

            this.cantidad = this.compras.detallesCompra[0].cantidad;

            this.selectIngredienteId = this.ingredientes.filter((ingrediente: any) => ingrediente.id == this.compras.detallesCompra[0].ingredienteId)[0].id;

            this.selectedProveedorId = this.proveedores.filter((proveedor: any) => proveedor.id == this.compras.proveedorId)[0].id;

            this.selectUnidadMedidaId = this.unidadMedida.filter((unidadMedida: any) => unidadMedida.id == this.compras.detallesCompra[0].unidadMedidaId)[0].id;

            this.selectMetodoPagoId = this.metodoPagos.filter((metodoPago: any) => metodoPago.id == this.compras.metodoPagoId)[0].id;

            console.log('Compra');
            console.log(this.compras);
          }

        });

        console.log(this.compras);
      },
      error: (error) => console.log(error)
    });

  }

  actualizarCompra() {

    Swal.fire({
      title: '¿Estas seguro de actualizar la compra?',
      text: 'Se actualizará la compra',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.isConfirmed) {

        const idCompra = this.compras.id;

        //Campos de la tabla detalleCompra
        const idDetalleCompra = this.compras.detallesCompra[0].id;
        const idIngrediente = this.selectIngredienteId;
        const idUnidadMedida = this.selectUnidadMedidaId;
        const cantidad = this.cantidad;
        const compraId = this.compras.id;

        //Agregar el id de la compra al objeto de regCompra

        this.regCompra.id = idCompra;
        this.regCompra.proveedorId = this.selectedProveedorId;
        this.regCompra.metodoPagoId = this.selectMetodoPagoId;

        console.log(this.regCompra);

        this.compraService.actualizarCompra(this.regCompra).subscribe({

          next: (res) => {

            this.redgDetalleCompra.id = idDetalleCompra;
            this.redgDetalleCompra.compraId = compraId;
            this.redgDetalleCompra.ingredienteId = idIngrediente;
            this.redgDetalleCompra.unidadMedidaId = idUnidadMedida;
            this.redgDetalleCompra.cantidad = cantidad;

            this.compraService.actualizarDetalleCompra(this.redgDetalleCompra).subscribe({

              next: (res) => {

                Swal.fire({
                  title: 'Compra actualizada',
                  text: 'Compra actualizada correctamente',
                  icon: 'success',
                  confirmButtonText: 'Aceptar'
                });

                this.router.navigate(['/compras']);

              },

              error: (error) => console.log(error)

            });
          },
          error: (error) => console.log(error)
        });

      }
    });
  }
}
