import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Pago } from '../interfaces/Pago/pago.interface';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  private baseUrl: string = 'http://localhost:8080/api/v1/payment';
  private http = inject(HttpClient);

  constructor() { }

  getPagos(): Observable<Pago> {
    const url: string = `${this.baseUrl}/all`;
    return this.http.get<Pago>(url);
  }

  createPago(pagoData: any): Observable<Pago> {
    const url = `${this.baseUrl}`;
    return this.http.post<Pago>(url, pagoData).pipe(
      map(resp => {
        if (resp.responseCode !== 'PAYM-0001') {
          // Si hay error, lanza excepción
          throw new Error(resp.errorMessage || 'Error desconocido');
        }
        // Si todo va bien, retorna el pago
        return resp as Pago;
      }),
    );
  }

  getPagosPorMes(year: number, month: number): Observable<Pago[]> {
    const url = `${this.baseUrl}/month/${year}/${month}`;
    return this.http.get<any>(url).pipe(
      map(resp => {
        if (resp.responseCode !== 'PAYMENT-0001') {
          throw new Error(resp.errorMessage || 'Error al obtener pagos');
        }
        return resp.data as Pago[];
      })
    );
  }




}
