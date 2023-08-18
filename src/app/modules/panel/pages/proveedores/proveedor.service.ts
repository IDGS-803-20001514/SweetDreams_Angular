import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proveedor } from 'src/app/interfaces/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {


  constructor(private http:HttpClient) { }

  public getProveedores():Observable<Proveedor[]>{
    return this.http.get<Proveedor[]>("https://localhost:7220/api/Proveedors");
  }

  public agregarProveedor(datos:Proveedor){
    return this.http.post("https://localhost:7220/api/Proveedors",datos);
  }

  public obtenerProveedor(id:number){
    return this.http.get("https://localhost:7220/api/Proveedors/".concat(''+id));
  }

  public actualizarProveedor(datos:Proveedor){
    return this.http.put("https://localhost:7220/api/Proveedors/".concat(''+datos.id) ,datos);
  }

  public deleteProveedor(id:number){
    return this.http.delete("https://localhost:7220/api/Proveedors/".concat(''+id));
  }
}
