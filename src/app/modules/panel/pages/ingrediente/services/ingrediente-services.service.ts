import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ingredientes } from 'src/app/interfaces/ingredientes';

@Injectable({
  providedIn: 'root'
})
export class IngredienteServicesService {

  constructor(public http: HttpClient) {}

  showIngredients() {
    return this.http.get('https://localhost:7220/api/Ingredientes');
  }

  searchIngredient(id: number) {
    return this.http.get(`https://localhost:7220/api/Ingredientes/${id}`);
  }

  insertIngredient(ingredient: Ingredientes) {
    return this.http.post(
      'https://localhost:7220/api/Ingredientes',
      ingredient
    );
  }

  updateIngredient(ingredient: Ingredientes) {
    return this.http.put(
      `https://localhost:7220/api/Ingredientes/${ingredient.id}`,
      ingredient
    );
  }

  deleteIngredient(id: number) {
    return this.http.delete(`https://localhost:7220/api/Ingredientes/${id}`);
  }

  buscarUnidadMedida(id:number){
    return this.http.get(`https://localhost:7220/api/UnidadMedidums/${id}`);
 
  }


}
