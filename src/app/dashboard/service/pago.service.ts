import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Pago } from '../interfaces/Pago/pago.interface';
import { PagoAnio } from '../interfaces/Pago/pagoAnio.interface';

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

  getPagosPorMes(year: number, month: number): Observable<Pago> {
    const url = `${this.baseUrl}/month/${year}/${month}`;
    return this.http.get<Pago>(url).pipe(
      map(resp => {
        if (resp.responseCode !== 'PAYMENT-0001') {
          throw new Error(resp.errorMessage || 'Error al obtener pagos');
        }
        return resp as Pago;
      })
    );
  }

getPagosPorAnio(year: number): Observable<PagoAnio> {
  const url = `${this.baseUrl}/stats/monthly?year=${year}`;
  return this.http.get<{ responseCode: string; data: { month: number; totalAmount: number }[]; errorMessage?: string }>(url).pipe(
    map(resp => {
      if (resp.responseCode !== 'PAYMENT-0002') {
        throw new Error(resp.errorMessage || 'Error al obtener pagos del año');
      }
      const total = resp.data.reduce((acc, p) => acc + Number(p.totalAmount || 0), 0);
      return { year, amount: total } as PagoAnio; // ✅ Devuelve un solo objeto PagoAnio
    })
  );
}







}
