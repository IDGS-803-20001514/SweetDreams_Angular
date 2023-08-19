import { Component } from '@angular/core';
import { InventarioService } from '../../inventario.service';
import { Router } from '@angular/router';
import { IngredienteServicesService } from '../../../ingrediente/services/ingrediente-services.service';
import { UnidadesService } from '../../../unidades/unidades.service';
import { Salida } from 'src/app/interfaces/salida';
import Swal from 'sweetalert2';
import { Inventario } from 'src/app/interfaces/inventario';

@Component({
  selector: 'app-insert-salidas',
  templateUrl: './insert-salidas.component.html',
  styleUrls: ['./insert-salidas.component.css']
})
export class InsertSalidasComponent {

  constructor(private services:InventarioService, private router: Router, 
    private ingredientes: IngredienteServicesService, private unidades:UnidadesService){}

    dtIngrediente:any = []
    dtUnidades:any = []

    dtInventario:any = []
    coincidencia : number = 0
    cantidad: number = 0
    idInventario:number = 0

    regSalida: Salida ={
      id:0,
      ingredienteId:0,
      unidadMedidaId:0,
      cantidad:0,
      fechaSalida: new Date(),
      userId:1,
    }

    regInventario : Inventario = {
      id:0,
      ingredienteId:0,
      unidadMedidaId:0,
      existenciaActual:0,
      existenciaInicial:0,
      fechaEntrada: new Date(),
      fechaModificacion: new Date(),
      usuarioModificacion: 1,
      userId:1
     }

    ngOnInit(): void {
      this.ingredientes.showIngredients().subscribe({
        next: (response) =>{
          this.dtIngrediente = response
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error de Server',
            text: `NO HAY DATOS EN LA BD: ${err}`,
          });
        }
      });
      this.unidades.showUnits().subscribe({
        next:(res) =>{
          this.dtUnidades = res
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error de Server',
            text: `NO HAY DATOS EN LA BD: ${err}`,
          });
        }
      })
    }

    AgregarSalida(){
      if(this.regSalida.cantidad === 0 || this.regSalida.ingredienteId === 0 || this.regSalida.unidadMedidaId === 0){
        Swal.fire({
          icon: 'error',
          title: 'Campos Vacios',
          text: 'No puedes guardar campos vacios',
        });
        return
      }
      this.regInventario.ingredienteId = this.regSalida.ingredienteId
      this.regInventario.unidadMedidaId = this.regSalida.unidadMedidaId
    
      
      this.services.getInventario().subscribe({
        next:(response) =>{
          this.dtInventario = response

          this.dtInventario.forEach((inventario:any) =>{
           
            
            if( inventario.ingredienteId.toString() === this.regInventario.ingredienteId){
                console.log('Encontrado');
                
                this.coincidencia = 1
                this.cantidad = inventario.existenciaActual
                this.idInventario = inventario.id
                this.regInventario.existenciaInicial = inventario.existenciaInicial
                this.regInventario.existenciaActual = inventario.existenciaActual

                console.log('Cantidad Actual', this.cantidad);
                console.log('Id Inventario', this.idInventario);
                console.log('Existencia Inicial', this.regInventario.existenciaInicial);
                console.log('Existencia Actual', this.regInventario.existenciaActual);
                
                
              }
          })

          console.log('coincidencia', this.coincidencia);
        if(this.coincidencia === 1){
          this.regInventario.id = this.idInventario

          console.log('existencia actual antes', this.regInventario.existenciaActual);

          this.regInventario.existenciaActual = ( this.cantidad - parseInt( this.regSalida.cantidad.toString())) 
          console.log('existencia actual despues', this.regInventario.existenciaActual);
          
          console.log('inventario', this.regInventario);

          this.services.actualizarInventario(this.regInventario).subscribe({
            next: () =>{

              this.services.agregarSalida(this.regSalida).subscribe({
                next: () =>{
                  
                },
                error: (err) => {
                  Swal.fire({
                    icon: 'error',
                    title: 'Insercion',
                    text: `No se pudo registrar la salida a almacen: ${err}`,
                  });
                }
              });
              Swal.fire({
                icon: 'success',
                title: 'Insercion',
                text: 'Registro Registrado con Exito',
              });
              
            },
            error: (err) => {
              Swal.fire({
                icon: 'error',
                title: 'Insercion',
                text: `No se pudo registrar en inventario: ${err}`,
              });
            }
          })
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Insercion',
            text: 'No existe el ingrediente en inventario',
          });
        }
        }
      })
    }


}
