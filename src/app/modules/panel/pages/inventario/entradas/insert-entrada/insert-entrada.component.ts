import { Component } from '@angular/core';
import { InventarioService } from '../../inventario.service';
import { Router } from '@angular/router';
import { IngredienteServicesService } from '../../../ingrediente/services/ingrediente-services.service';
import { UnidadesService } from '../../../unidades/unidades.service';
import Swal from 'sweetalert2';
import { Entrada } from 'src/app/interfaces/entrada';
import { Inventario } from 'src/app/interfaces/inventario';

@Component({
  selector: 'app-insert-entrada',
  templateUrl: './insert-entrada.component.html',
  styleUrls: ['./insert-entrada.component.css']
})
export class InsertEntradaComponent {
  constructor(private services:InventarioService, private router: Router, 
    private ingredientes: IngredienteServicesService, private unidades:UnidadesService){}

    dtIngrediente:any = []
    dtUnidades:any = []
    
    dtInventario:any = []
    coincidencia : number = 0
    cantidad: number = 0
    idInventario:number = 0
    regEntrada: Entrada ={
      id:0,
      ingredienteId:0,
      unidadMedidaId:0,
      cantidad:0,
      fechaEntrada: new Date(),
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

  AgregarEntrada(){
    if(this.regEntrada.cantidad === 0 || this.regEntrada.ingredienteId === 0 || this.regEntrada.unidadMedidaId === 0){
      Swal.fire({
        icon: 'error',
        title: 'Campos Vacios',
        text: 'No puedes guardar campos vacios',
      });
      return
    }
    this.regInventario.ingredienteId = this.regEntrada.ingredienteId
    this.regInventario.unidadMedidaId = this.regEntrada.unidadMedidaId
    this.regInventario.existenciaInicial = this.regEntrada.cantidad
    this.regInventario.existenciaActual = this.regEntrada.cantidad

    this.services.agregarEntrada(this.regEntrada).subscribe({
      next: () =>{
        
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Insercion',
          text: `No se pudo registrar la entrada a almacen: ${err}`,
        });
      }
    });
    console.log('Inventario', this.regInventario);
    this.services.getInventario().subscribe({
      next:(response) =>{
        this.dtInventario = response
        console.log('Todo Inventario', this.dtInventario);
        
        this.dtInventario.forEach((inventario:any) =>{
          console.log('Dentro del ForEach', inventario);
          console.log('INVENTARIO',inventario.ingredienteId);
          console.log('inventario', this.regInventario.ingredienteId);
          
          if( inventario.ingredienteId.toString() === this.regInventario.ingredienteId){
              console.log('Encontrado');
              
              this.coincidencia = 1
              this.cantidad = inventario.existenciaActual
              this.idInventario = inventario.id
            }
        })
        console.log('coincidencia', this.coincidencia);
        if(this.coincidencia === 1){
          this.regInventario.id = this.idInventario
          console.log('existencia actual antes', this.regInventario.existenciaActual);
          
          this.regInventario.existenciaActual = (parseInt( this.regInventario.existenciaActual.toString()) + this.cantidad)
         
          console.log('existencia actual despues', this.regInventario.existenciaActual);
          
          console.log('inventario', this.regInventario);
          
          this.services.actualizarInventario(this.regInventario).subscribe({
            next: () =>{
              Swal.fire({
                icon: 'success',
                title: 'Insercion',
                text: 'Registro Registrado con Exito',
              });
              //window.location.reload()
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
          this.services.agregarInventario(this.regInventario).subscribe({
            next: () =>{
              Swal.fire({
                icon: 'success',
                title: 'Insercion',
                text: 'Registro Registrado con Exito',
              });
              //window.location.reload()
            },
            error: (err) => {
              Swal.fire({
                icon: 'error',
                title: 'Insercion',
                text: `No se pudo registrar en inventario: ${err}`,
              });
            }
          });
        }
      }
    });
    
    //this.router.navigate(['/Entradas']);
  }
}
