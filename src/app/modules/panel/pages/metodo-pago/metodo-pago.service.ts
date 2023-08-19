import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MetodoPago } from 'src/app/interfaces/metodoPago';

@Injectable({
  providedIn: 'root'
})
export class MetodoPagoService {

  constructor(private http: HttpClient) { }

  public getMetodoPago(): Observable<MetodoPago[]> {
    return this.http.get<MetodoPago[]>("https://localhost:7220/api/MetodoPagoes");
  }

  public obtenerMetodoPago(id: number) {
    return this.http.get("https://localhost:7220/api/MetodoPagoes/".concat('' + id));
  }
}
