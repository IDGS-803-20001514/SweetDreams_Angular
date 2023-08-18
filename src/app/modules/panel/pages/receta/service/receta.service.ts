import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Receta } from 'src/app/interfaces/receta';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {

  constructor(public http: HttpClient) {}

  showRecipes() {
    return this.http.get('https://localhost:7220/api/Recetums');
  }

  searchRecipe(id: number) {
    return this.http.get(`https://localhost:7220/api/Recetums/${id}`);
  }

  insertRecipe(recipe: Receta) {
    return this.http.post('https://localhost:7220/api/Recetums', recipe);
  }

  updateRecipe(recipe: Receta) {
    return this.http.put(
      `https://localhost:7220/api/Recetums/${recipe.id}`,
      recipe
    );
  }

  deleteRecipe(id: number) {
    return this.http.delete(`https://localhost:7220/api/Recetums/${id}`);
  }
}
