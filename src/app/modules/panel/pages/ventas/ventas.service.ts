import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ventas } from 'src/app/interfaces/ventas';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  constructor(private http: HttpClient) { }

  public getVentas():Observable<Ventas[]> {
    return this.http.get<Ventas[]>("https://localhost:7220/api/Ventas");
  }
}
