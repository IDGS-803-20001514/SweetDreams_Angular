import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from 'src/app/interfaces/menu';
import { Receta } from 'src/app/interfaces/receta';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http:HttpClient) { }

  public getMenu():Observable<Menu[]>{
    return this.http.get<Menu[]>("http://192.168.100.51:7220/api/Menus");
  }

  public getRecetas():Observable<Receta[]>{
    return this.http.get<Receta[]>("http://192.168.100.51:7220/api/Recetums");
  }

  public agregarMenu(datos:Menu){
    return this.http.post("http://192.168.100.51:7220/api/Menus",datos);
  }

  public obtenerMenu(id:number){
    return this.http.get("http://192.168.100.51:7220/api/Menus/".concat(''+id));
  }

  public actualizarMenu(datos:Menu){
    return this.http.put("http://192.168.100.51:7220/api/Menus/".concat(''+datos.id) ,datos);
  }

  public deleteMenu(id:number){
    return this.http.delete("http://192.168.100.51:7220/api/Menus/".concat(''+id));
  }

}
