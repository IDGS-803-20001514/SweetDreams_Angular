import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/interfaces/cliente';
import { rolUser } from 'src/app/interfaces/rolUser';
import { Usuario } from 'src/app/interfaces/usuario';
import { ProyectoApiService } from 'src/app/proyecto-api.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
 
  coincidencia:number=0
  IdUsuarioCreado:number=0
  NombreUsuarioCreado:string=''

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
    roleId:0,
    userId:0
  }
 
 public dtUsuario:any =[]
 public dtUsuarioFinal:any=[]
  dtCliente: any =[]
  dtRoles: any = []

  constructor(public register:ProyectoApiService, private router:Router){}
  
  registrar() {
    // Imprimir los datos en la consola para verificar si tienen contenido
  console.log('Datos a registrar:', this.user.email);
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
    console.log('registros DB', this.dtUsuario);

    this.dtUsuario.forEach((usuario: any) => {
      console.log('datos de dtUsuarios:', usuario.email);
      console.log('datos de entrada', this.user.email);

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
    console.log('Datos del cliente a insertar:', this.client);
    
    this.register.getUsuarios().subscribe(
      {
        next: response => {
          this.dtUsuario = response;
          // Llamamos a la función auxiliar dentro de la suscripción para asegurarnos de que los datos estén disponibles
           ObtenerUsuarios();
           console.log('Coincidencia:', this.coincidencia);
           
            
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
    
    this.register.AgregarUsuario(this.user).subscribe({

      next: (res) => {
        console.log('Despues de agregar el usuario',res);

        this.register.getUsuarios().subscribe(
          {
            next: response => {
              this.dtUsuario = response;
              console.log('Tabla usuarios Final', this.dtUsuario);
              this.dtUsuarioFinal = this.dtUsuario[this.dtUsuario.length -1]
              this.IdUsuarioCreado = this.dtUsuarioFinal.id
              console.log('IdUsuario Creado:', this.IdUsuarioCreado);
              this.NombreUsuarioCreado = this.dtUsuarioFinal.name
              console.log('Nombre Usuario Creado', this.NombreUsuarioCreado);
              
              this.AgregarCliente()
            },
            error: error => console.log(error)
          }
        )
        Swal.fire({
          icon: 'success',
          title: 'Usuario Registrado',
          text: 'Ahora puedes iniciar sesión',
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
  AgregarCliente()
  {
    this.client.nombres = this.NombreUsuarioCreado
    this.client.userId = this.IdUsuarioCreado

    this.rol.userId = this.IdUsuarioCreado
    this.rol.roleId = 2
    console.log('Datos del cliente a insertar', this.client);
    
    this.register.AgregarCliente(this.client ).subscribe({
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
      },
      error: error => console.log(error)
    })
  }
  AsignarRol(){
    console.log('Datos del rol antes de insertar',this.rol);
    
    this.register.AsignarRolCliente(this.rol).subscribe({
      next: (res) => {
        console.log('Despues de asignar el rol', this.rol);
        
      },
      error: error => console.log(error)
    })
  }

  ngOnInit(): void {
    
  }
}
