import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Compra } from 'src/app/interfaces/compras';
import { DetalleCompra } from 'src/app/interfaces/detalleCompra';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  constructor(private http: HttpClient) { }

  public getCompra(): Observable<Compra[]> {
    return this.http.get<Compra[]>("https://localhost:7220/api/Compras");
  }

  public agregarCompra(datos: Compra) {
    return this.http.post("https://localhost:7220/api/Compras", datos);
  }

  public actualizarCompra(datos: Compra) {
    return this.http.put(`https://localhost:7220/api/Compras/${datos.id}`, datos);
  }

  public obtenerCompra(id: number): Observable<Compra> {
    return this.http.get<Compra>("https://localhost:7220/api/Compras/".concat('' + id));
  }

  public deleteCompra(id: number) {
    return this.http.delete("https://localhost:7220/api/Compras/".concat('' + id));
  }

  // --------------------- DETALLE COMPRA ---------------------


  // Obtener todos los detalles de las compras
  public getDetallesCompras(): Observable<DetalleCompra[]> {
    return this.http.get<DetalleCompra[]>("https://localhost:7220/api/DetalleCompras");
  }

  // Guardar un detalle de compra
  public detalleCompra(datos: DetalleCompra) {
    return this.http.post("https://localhost:7220/api/DetalleCompras", datos);
  }

  public actualizarDetalleCompra(datos: DetalleCompra) {
    return this.http.put(`https://localhost:7220/api/DetalleCompras/${datos.id}`, datos);
  }

  public deleteDetalleCompra(id: number) {
    return this.http.delete("https://localhost:7220/api/DetalleCompras/".concat('' + id));
  }
}
