import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Receta } from 'src/app/interfaces/receta';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {

  constructor(public http: HttpClient) {}

  showRecipes() {
    return this.http.get('http://192.168.100.51:7220/api/Recetums');
  }

  searchRecipe(id: number) {
    return this.http.get(`http://192.168.100.51:7220/api/Recetums/${id}`);
  }

  insertRecipe(recipe: Receta) {
    return this.http.post('http://192.168.100.51:7220/api/Recetums', recipe);
  }

  updateRecipe(recipe: Receta) {
    return this.http.put(
      `http://192.168.100.51:7220/api/Recetums/${recipe.id}`,
      recipe
    );
  }

  deleteRecipe(id: number) {
    return this.http.delete(`http://192.168.100.51:7220/api/Recetums/${id}`);
  }
}
