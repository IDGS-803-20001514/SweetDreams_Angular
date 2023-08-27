import { Component } from '@angular/core';
import { VentasService } from './ventas.service';
import { ClienteService } from '../cliente/cliente.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent {

  constructor(private ventaService: VentasService,
              private clienteService: ClienteService) { }

  dataSource: any[] = [];

  cliente: any[] = [];

  ngOnInit(): void {

    this.ventaService.getVentas().subscribe({
      next: response => {

        this.dataSource = response;

        this.dataSource.forEach(element => {

          this.clienteService.obtenerCliente(element.clienteId).subscribe({

            next: response => {

              //Agrega el response al dataSource
              element.cliente = response;
            },

            error: error => console.log(error)
          });

        });

        console.log(this.dataSource);

      },
      error: error => console.log(error)
    });
  }

  Agregar() {
    alert('Agregar');
  }

  Editar(datos: any){
    alert('Editar');
  }

  Eliminar(id: number){
    alert('Eliminar');
  }
}
