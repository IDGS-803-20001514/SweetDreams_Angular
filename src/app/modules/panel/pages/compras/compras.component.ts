import { Component } from '@angular/core';
import { ComprasService } from './compras.service';
import { ProveedorService } from '../proveedores/proveedor.service';
import { IngredienteServicesService } from '../ingrediente/services/ingrediente-services.service';
import { UnidadesService } from '../unidades/unidades.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MetodoPagoService } from '../metodo-pago/metodo-pago.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent {
  constructor(
    public compra: ComprasService,
    public proveedorSevice: ProveedorService,
    public metodoPagoService: MetodoPagoService,
    public detalleCompraService: ComprasService,
    public ingredienteService: IngredienteServicesService,
    public unidadMedidaService: UnidadesService,
    private router: Router
  ) { }

  compras: any[] = [];

  ngOnInit(): void {

    this.compra.getCompra().subscribe({
      next: (res) => {
        console.log(res);
        this.compras = res;
        this.compras.forEach(arrCompra => {
          this.proveedorSevice.obtenerProveedor(arrCompra.proveedorId).subscribe({
            next: (res) => {
              arrCompra.proveedor = res;
              arrCompra['proveedorNombre'] = arrCompra.proveedor.alias;
              // Quitamos el proveedor del objeto
              delete arrCompra.proveedor;
            },
            error: (error) => console.log(error)
          });

          this.metodoPagoService.obtenerMetodoPago(arrCompra.metodoPagoId).subscribe({
            next: (res) => {
              arrCompra.metodoPago = res;
              arrCompra['metodoPagoNombre'] = arrCompra.metodoPago.metodoPago1;
              // Quitamos el metodo de pago del objeto
              delete arrCompra.metodoPago;
            }
          });

          this.detalleCompraService.getDetallesCompras().subscribe({
            next: (res) => {
              let detallesCompras = res;
              detallesCompras.forEach((element: any) => {
                if (element.compraId == arrCompra.id) {
                  arrCompra.detalleCompra = element;
                  arrCompra['detalleCompraCantidad'] = arrCompra.detalleCompra.cantidad;
                  arrCompra['detalleCompraId'] = arrCompra.detalleCompra.id;
                  this.ingredienteService.searchIngredient(element.ingredienteId).subscribe({
                    next: (res) => {
                      arrCompra.ingrediente = res;
                      arrCompra['ingredienteNombre'] = arrCompra.ingrediente.ingrediente1;
                      // Quitamos el ingrediente del objeto
                      delete arrCompra.ingrediente;
                    },
                    error: (error) => console.log(error)
                  });

                  this.unidadMedidaService.searchUnit(element.unidadMedidaId).subscribe({
                    next: (res) => {
                      arrCompra.unidadMedida = res;
                      arrCompra['unidadMedidaNombre'] = arrCompra.unidadMedida.unidad;
                      // Quitamos la unidad de medida del objeto
                      delete arrCompra.unidadMedida;
                    },
                    error: (error) => console.log(error)
                  });
                  // Quitamos el detalle de compra del objeto
                  delete arrCompra.detalleCompra;
                }
              });
            }
          });
        });
      },
      error: (error) => console.log(error)
    });
  }

  openInsertCompra() {
    this.router.navigate(['/agregarCompra']);
  }

  openEditarCompra(data: any) {
    this.router.navigate(['/editarCompra', data.id]);
  }

  eliminarCompra(id: number, detalleCompraId: number) {
    Swal.fire({
      title: '¿Está seguro de eliminar el compra?',
      text: "No podrá revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        this.compra.deleteDetalleCompra(detalleCompraId).subscribe({
          next: (res) => {
            this.compra.deleteCompra(id).subscribe({
              next: (res) => {
                Swal.fire(
                  '¡Eliminado!',
                  'El compra ha sido eliminado.',
                  'success'
                );
                window.location.reload();
              },
              error: (err) => {
                console.log(err);
              }
            });
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    });
  }
}
