import { Component } from '@angular/core';
import { ProveedorService } from './proveedor.service';
import { Router } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent {
  constructor(private service: ProveedorService, private router: Router){}

  dataSource:any = []
  dtProveedores:any = {}

  ngOnInit(): void {
    this.service.getProveedores().subscribe(
      {
        next: response => {
          this.dataSource = response;
        },
        error: error => console.log(error)
      }
    );
  }

  Agregar(){
    this.router.navigate(['/insertProveedor']);
  }
  Editar(data:any){
    this.router.navigate([`/editProveedor/${data.id}`]);
  }
  Eliminar(id:number){
    this.service.obtenerProveedor(id).subscribe({
      next: (response) => {
        this.dtProveedores = response;
        this.dtProveedores.baja = 1
        this.service.actualizarProveedor(this.dtProveedores).subscribe({
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
    });
  }

}
