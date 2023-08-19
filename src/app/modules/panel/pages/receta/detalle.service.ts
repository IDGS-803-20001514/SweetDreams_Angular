import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DetalleReceta } from 'src/app/interfaces/detalleReceta';

@Injectable({
  providedIn: 'root'
})
export class DetalleService {

  constructor(public http: HttpClient) { }

  showDetail() {
    return this.http.get('http://192.168.100.51:7220/api/DetalleRecetums');
  }

  searchDetail(id: number) {
    return this.http.get(`http://192.168.100.51:7220/api/DetalleRecetums/${id}`);
  }

  insertDetail(detail: DetalleReceta) {
    return this.http.post('http://192.168.100.51:7220/api/DetalleRecetums', detail);
  }

  updateDetail(detail: DetalleReceta) {
    return this.http.put(
      `http://192.168.100.51:7220/api/DetalleRecetums/${detail.id}`,detail
    );
  }

  deleteDetail(id: number) {
    return this.http.delete(`http://192.168.100.51:7220/api/DetalleRecetums/${id}`);
  }
}
