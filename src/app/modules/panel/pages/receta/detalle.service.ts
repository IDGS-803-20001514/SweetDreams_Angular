import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DetalleReceta } from 'src/app/interfaces/detalleReceta';

@Injectable({
  providedIn: 'root'
})
export class DetalleService {

  constructor(public http: HttpClient) { }

  showDetail() {
    return this.http.get('https://localhost:7220/api/DetalleRecetums');
  }

  searchDetail(id: number) {
    return this.http.get(`https://localhost:7220/api/DetalleRecetums/${id}`);
  }

  insertDetail(detail: DetalleReceta) {
    return this.http.post('https://localhost:7220/api/DetalleRecetums', detail);
  }

  updateDetail(detail: DetalleReceta) {
    return this.http.put(
      `https://localhost:7220/api/DetalleRecetums/${detail.id}`,detail
    );
  }

  deleteDetail(id: number) {
    return this.http.delete(`https://localhost:7220/api/DetalleRecetums/${id}`);
  }
}
