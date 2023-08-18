import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/interfaces/cliente';
import { rolUser } from 'src/app/interfaces/rolUser';
import { Usuario } from 'src/app/interfaces/usuario';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient){}

    public getClientes():Observable<Cliente[]>{
        return this.http.get<Cliente[]>("https://localhost:7220/api/Clientes");
    }

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

    public obtenerCliente(id:number){
        return this.http.get(`https://localhost:7220/api/Clientes/${id}`);
    }

    public obtenerUsuario(id:number){
        return this.http.get(`https://localhost:7220/api/Usuarios/${id}`);
    }

    public actualizarCliente(datos:Cliente){
      return this.http.put(`https://localhost:7220/api/Clientes/${datos.id}`,
      datos)
    }
  
    public deleteCliente(id:number){
        return this.http.delete(`https://localhost:7220/api/Clientes/${id}`);
    }
    public ActualizarUser(datos:Usuario){
      return this.http.put(`https://localhost:7220/api/Usuarios/${datos.id}`,datos);
    }
   
}
