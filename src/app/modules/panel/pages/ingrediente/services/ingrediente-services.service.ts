import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ingredientes } from 'src/app/interfaces/ingredientes';

@Injectable({
  providedIn: 'root'
})
export class IngredienteServicesService {

  constructor(public http: HttpClient) {}

  showIngredients() {
    return this.http.get('http://192.168.100.51:7220/api/Ingredientes');
  }

  searchIngredient(id: number) {
    return this.http.get(`http://192.168.100.51:7220/api/Ingredientes/${id}`);
  }

  insertIngredient(ingredient: Ingredientes) {
    return this.http.post(
      'http://192.168.100.51:7220/api/Ingredientes',
      ingredient
    );
  }

  updateIngredient(ingredient: Ingredientes) {
    return this.http.put(
      `http://192.168.100.51:7220/api/Ingredientes/${ingredient.id}`,
      ingredient
    );
  }

  deleteIngredient(id: number) {
    return this.http.delete(`http://192.168.100.51:7220/api/Ingredientes/${id}`);
  }

  buscarUnidadMedida(id:number){
    return this.http.get(`http://192.168.100.51:7220/api/UnidadMedidums/${id}`);
 
  }


}
