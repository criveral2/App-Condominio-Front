import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TipoContrato } from '../interfaces/contrato/tipo-contrato.interface';
import { Contrato, ContratoData, CreateContrato } from '../interfaces/contrato/contrato.interface';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  private baseUrl: string = 'http://localhost:8080/api/v1/contract';
  private http = inject(HttpClient);

  constructor() { }

  getTipoContrato(): Observable<TipoContrato> {
    const url: string = `${this.baseUrl}/type`;
    return this.http.get<TipoContrato>(url);
  }

  getContratos(): Observable<Contrato> {
    const url: string = `${this.baseUrl}`;
    return this.http.get<Contrato>(url);
  }

  createContrato(contratoCreate: CreateContrato): Observable<Contrato> {
    const url = `${this.baseUrl}`;
    return this.http.post<Contrato>(url, contratoCreate).pipe(
      map(resp => {
        if (resp.responseCode !== 'CONT-0001') {
          // Si hay error, lanza excepción
          throw new Error(resp.errorMessage || 'Error desconocido');
        }
        // Si todo va bien, retorna el area común
        return resp as Contrato;
      }),
    );
  }

  updateContrato(contrato: any, id: number): Observable<Contrato> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<Contrato>(url, contrato).pipe(
      map(resp => {
        if (resp.responseCode !== 'CONT-0002') {
          throw new Error(resp.errorMessage || 'Error desconocido');
        }
        return resp;
      })
    );
  }


  eliminarContrato(id: number): Observable<void> {
    const url: string = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }


}
