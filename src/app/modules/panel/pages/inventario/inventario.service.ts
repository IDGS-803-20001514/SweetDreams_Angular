import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Entrada } from 'src/app/interfaces/entrada';
import { Inventario } from 'src/app/interfaces/inventario';
import { Salida } from 'src/app/interfaces/salida';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor(private http:HttpClient) { }

  public getSalidas():Observable<Salida[]>{
    return this.http.get<Salida[]>("http://192.168.100.51:7220/api/Salidas");
  }
  public getEntradas():Observable<Entrada[]>{
    return this.http.get<Entrada[]>("http://192.168.100.51:7220/api/Entradas");
  }
 
  public agregarEntrada(datos:Entrada){
    return this.http.post("http://192.168.100.51:7220/api/Entradas",datos);
  }

  public agregarSalida(datos:Salida){
    return this.http.post("http://192.168.100.51:7220/api/Salidas",datos);
  }

  public agregarInventario(datos:Inventario){
    return this.http.post("http://192.168.100.51:7220/api/Inventarios",datos);
  }

  public getInventario():Observable<Inventario[]>{
    return this.http.get<Inventario[]>("http://192.168.100.51:7220/api/Inventarios");
  }

  public actualizarInventario(datos:Inventario){
    return this.http.put("http://192.168.100.51:7220/api/Inventarios/".concat(''+datos.id) ,datos);
  }

  public obtenerInventario(id:number){
    return this.http.get("http://192.168.100.51:7220/api/Inventarios/".concat(''+id));
  }
  

}
