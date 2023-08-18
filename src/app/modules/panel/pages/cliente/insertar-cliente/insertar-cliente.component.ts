import { Component } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { Cliente } from 'src/app/interfaces/cliente';
import { rolUser } from 'src/app/interfaces/rolUser';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-insertar-cliente',
  templateUrl: './insertar-cliente.component.html',
  styleUrls: ['./insertar-cliente.component.css']
})
export class InsertarClienteComponent {

  constructor(public services:ClienteService, private router:Router){}

  user:Usuario ={
    id:0,
    name:'',
    email:'',
    password:'',
    active:0,
    confirmed_at:new Date()
  }
  client:Cliente ={
    id:0,
    nombres:'',
    apellidos:'',
    celular:'',
    codigoPostal:'',
    calle:'',
    colonia:'',
    fechaCreacion:new Date(),
    fechaModificacion: new Date(),
    usuarioModificacion: 0,
    baja:0,
    userId:0
  }
  rol:rolUser = {
    id:0,
    roleId:2,
    userId:0
  }
  coincidencia:number=0
  public dtUsuario:any =[]

  IdUsuarioCreado:number=0
  NombreUsuarioCreado:string=''
  public dtUsuarioFinal:any=[]
  dtCliente: any =[]
  dtRoles: any = []

  AgregarCliente(){
    // Verificar si los campos están vacíos
    if (
      this.user.name === '' ||
      this.client.apellidos === '' ||
      this.client.celular === '' ||
      this.client.codigoPostal === '' ||
      this.client.calle === '' ||
      this.client.colonia === '' ||
      this.user.email === '' ||
      this.user.password === ''
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Campos vacíos',
        text: 'Por favor, completa todos los campos antes de registrar.',
      });
      return; // Detener la función si hay campos vacíos
    }

     // Aquí agregamos una función auxiliar para ejecutar el bucle después de obtener los usuarios
  const ObtenerUsuarios = () => {

    this.dtUsuario.forEach((usuario: any) => {
      if (usuario.email === this.user.email && usuario.active === 0) {
        Swal.fire({
          icon: 'error',
          title: 'Ya existe este correo',
          text: 'Por favor, registra otro correo.',
        });
        this.coincidencia = 1
      }
    } 
    
    );
    if(this.coincidencia === 1){
      return
    }
    this.agregar()

  };

  this.services.getUsuarios().subscribe(
    {
      next: response => {
        this.dtUsuario = response;
        // Llamamos a la función auxiliar dentro de la suscripción para asegurarnos de que los datos estén disponibles
         ObtenerUsuarios();
         this.user = {
          id:0,
          name:'',
          email:'',
          password:'',
          active:0,
          confirmed_at:new Date()
          };

          
          this.coincidencia=0
          this.IdUsuarioCreado=0,
          this.NombreUsuarioCreado=''

          
      },
      error: error => console.log(error)
    }
  )
  
  }
  agregar() {
    console.log('Agregar este usuario:',this.user);
    
    this.services.AgregarUsuario(this.user).subscribe({

      next: (res) => {
        console.log('Despues de agregar el usuario',res);

        this.services.getUsuarios().subscribe(
          {
            next: response => {
              this.dtUsuario = response;
              this.dtUsuarioFinal = this.dtUsuario[this.dtUsuario.length -1]
              this.IdUsuarioCreado = this.dtUsuarioFinal.id
              this.NombreUsuarioCreado = this.dtUsuarioFinal.name
          
              
              this.AgregarClienteF()
            },
            error: error => console.log(error)
          }
        )
        Swal.fire({
          icon: 'success',
          title: 'Cliente Registrado',
          text: 'Cliente Registrado con exito',
        });
      },
      error: (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Usuario No Registrado',
          text: 'Intenta nuevamente por favor',
        });
      }
    });
  }
  AgregarClienteF()
  {
    this.client.nombres = this.NombreUsuarioCreado
    this.client.userId = this.IdUsuarioCreado

    this.rol.userId = this.IdUsuarioCreado
    this.rol.roleId = 2
    console.log('Datos del cliente a insertar', this.client);
    
    this.services.AgregarCliente(this.client ).subscribe({
      next: (res) => {
        console.log('Despues de Insertar el Cliente', res);
        this.AsignarRol()
        this.client ={
          id:0,
          nombres: '',
          apellidos: '',
          celular: '',
          codigoPostal: '',
          calle: '',
          colonia: '',
          fechaCreacion:new Date(),
          fechaModificacion: new Date(),
          usuarioModificacion: 0,
          baja:0,
          userId:0
         }
         window.location.reload()
      },
      error: error => console.log(error)
    });
    
    this.router.navigate(['/cliente']);
  }
  AsignarRol(){

    console.log('Datos del rol antes de insertar',this.rol);
    
    this.services.AsignarRolCliente(this.rol).subscribe({
      next: (res) => {
        console.log('Despues de asignar el rol', this.rol);
        
      },
      error: error => console.log(error)
    })
  }
}
