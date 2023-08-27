import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from './interfaces/login';
import { Usuario } from './interfaces/usuario';
import { Observable } from 'rxjs';
import { Cliente } from './interfaces/cliente';
import { rolUser } from './interfaces/rolUser';

@Injectable({
  providedIn: 'root'
})
export class ProyectoApiService {


  constructor(private http:HttpClient) { }

  iniciarSesion(datos:Login){
    return this.http.post('https://localhost:7220/api/Grupos',datos)
  }
//Parte del registrar Usuario
  AgregarUsuario(datos:Usuario){
    return this.http.post('https://localhost:7220/api/Usuarios',datos)
  }
  public getUsuarios():Observable<Usuario[]>{
    return this.http.get<Usuario[]>("https://localhost:7220/api/Usuarios");
  }
  AgregarCliente(datos:Cliente){
    return this.http.post('https://localhost:7220/api/Clientes',datos)
  }
  AsignarRolCliente(datos:rolUser){
    return this.http.post('https://localhost:7220/api/RolesUsers',datos)
  }

  //FIN

}
