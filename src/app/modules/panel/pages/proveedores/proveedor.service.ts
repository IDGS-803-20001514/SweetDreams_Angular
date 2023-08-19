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
    return this.http.get<Proveedor[]>("http://192.168.100.51:7220/api/Proveedors");
  }

  public agregarProveedor(datos:Proveedor){
    return this.http.post("http://192.168.100.51:7220/api/Proveedors",datos);
  }

  public obtenerProveedor(id:number){
    return this.http.get("http://192.168.100.51:7220/api/Proveedors/".concat(''+id));
  }

  public actualizarProveedor(datos:Proveedor){
    return this.http.put("http://192.168.100.51:7220/api/Proveedors/".concat(''+datos.id) ,datos);
  }

  public deleteProveedor(id:number){
    return this.http.delete("http://192.168.100.51:7220/api/Proveedors/".concat(''+id));
  }
}
