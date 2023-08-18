import { Component } from '@angular/core';
import { ClienteService } from './cliente.service';
import { Router } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent {
  constructor(public service: ClienteService, private router: Router) {}

  dataSource: any = [];

  dtCliente :any = {}
  dtusuario : any = {}
  idUser: number = 0
  ngOnInit(): void {
    this.service.getClientes().subscribe({
      next: (response) => {
        this.dataSource = response;
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de Server',
          text: `NO HAY DATOS EN LA BD: ${error}`,
        });
      },
    })
  }

  openInsertWindow() {
    this.router.navigate(['/Insertarcliente']);
  }

  openEditWindow(data: any) {
    this.router.navigate([`/ActualizarCliente/${data.id}`]);
  }
 

  dropCliente(id: number) {
    this.service.obtenerCliente(id).subscribe({
      next: (response) => {
        this.dtCliente = response;
        console.log('Datos Cliente', this.dtCliente);
        this.idUser = this.dtCliente.userId
        console.log('Id Usuario:', this.idUser);
        
        this.dtCliente.baja = 1
        this.service.actualizarCliente(this.dtCliente).subscribe({
          next:() => {
              this.service.obtenerUsuario(this.idUser).subscribe({
                next: (response) =>{
                  this.dtusuario = response
                  this.dtusuario.active = 1
                  this.service.ActualizarUser(this.dtusuario).subscribe({
                      next:() =>{
                          window.location.reload()
                      },
                      error: (error) => {
                        Swal.fire({
                          icon: 'error',
                          title: 'Error de Server',
                          text: `Error al eliminar usuario: ${error}`,
                        });
                      },
                  });
                },
                error: (error) => {
                  Swal.fire({
                    icon: 'error',
                    title: 'Error de Server',
                    text: `Error al obtener informacion del usuario: ${error}`,
                  });
                },
              });
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error de Server',
              text: `Error al eliminar el cliente: ${error}`,
            });
          },
        });

       
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de Server',
          text: `Error al Obtener Registro del cliente: ${error}`,
        });
      },
    });


  }
}
