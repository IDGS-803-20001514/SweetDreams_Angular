import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Entrada } from 'src/app/interfaces/entrada';
import { Inventario } from 'src/app/interfaces/inventario';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor(private http:HttpClient) { }

  public getEntradas():Observable<Entrada[]>{
    return this.http.get<Entrada[]>("https://localhost:7220/api/Entradas");
  }
 
  public agregarEntrada(datos:Entrada){
    return this.http.post("https://localhost:7220/api/Entradas",datos);
  }

  public agregarInventario(datos:Inventario){
    return this.http.post("https://localhost:7220/api/Inventarios",datos);
  }

  public getInventario():Observable<Inventario[]>{
    return this.http.get<Inventario[]>("https://localhost:7220/api/Inventarios");
  }

  public actualizarInventario(datos:Inventario){
    return this.http.put("https://localhost:7220/api/Inventarios/".concat(''+datos.id) ,datos);
  }

  public obtenerInventario(id:number){
    return this.http.get("https://localhost:7220/api/Inventarios/".concat(''+id));
  }

}
