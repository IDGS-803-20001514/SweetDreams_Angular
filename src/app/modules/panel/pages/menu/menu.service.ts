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
    return this.http.get<Menu[]>("https://localhost:7220/api/Menus");
  }

  public getRecetas():Observable<Receta[]>{
    return this.http.get<Receta[]>("https://localhost:7220/api/Recetums");
  }

  public agregarMenu(datos:Menu){
    return this.http.post("https://localhost:7220/api/Menus",datos);
  }

  public obtenerMenu(id:number){
    return this.http.get("https://localhost:7220/api/Menus/".concat(''+id));
  }

  public actualizarMenu(datos:Menu){
    return this.http.put("https://localhost:7220/api/Menus/".concat(''+datos.id) ,datos);
  }

  public deleteMenu(id:number){
    return this.http.delete("https://localhost:7220/api/Menus/".concat(''+id));
  }

}
