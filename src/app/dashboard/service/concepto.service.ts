import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Concepto, ConceptoData } from '../interfaces/concepto/concepto.interface';

@Injectable({
  providedIn: 'root'
})
export class ConceptoService {
  private baseUrl: string = 'http://localhost:8080/api/v1/concept';
  private http = inject(HttpClient);

  constructor() { }

  getConcepto(): Observable<Concepto> {
    const url: string = `${this.baseUrl}/all`;
    return this.http.get<Concepto>(url);
  }

  getConceptoById(id: number): Observable<Concepto> {
    const url: string = `${this.baseUrl}/${id}`;
    return this.http.get<Concepto>(url);
  }

  eliminarConcepto(id: number): Observable<void> {
    const url: string = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  createConcepto(conceptoData: ConceptoData): Observable<Concepto> {
    const url = `${this.baseUrl}`;
    return this.http.post<Concepto>(url, conceptoData).pipe(
      catchError(error => {
        let message = 'Error inesperado.';

        if (error.status === 0) {
          message = 'No hay conexión con el servidor.';
        } else if (error.status === 400) {
          message = 'Error 400: solicitud incorrecta. Verifica los datos enviados.';
        } else if (error.status === 404) {
          message = 'Recurso no encontrado.';
        } else if (error.status === 500) {
          message = 'Error interno del servidor.';
        } else if (error.error?.errorMessage) {
          message = error.error.errorMessage;
        }

        return throwError(() => new Error(message));
      })
    );
  }

  updateConcepto(conceptoData: ConceptoData): Observable<Concepto> {
    const url = `${this.baseUrl}/${conceptoData.id}`;
    return this.http.put<Concepto>(url, conceptoData).pipe(
      catchError(error => {
        let message = 'Error inesperado.';

        if (error.status === 0) {
          message = 'No hay conexión con el servidor.';
        } else if (error.status === 400) {
          message = 'Error 400: solicitud incorrecta. Verifica los datos enviados.';
        } else if (error.status === 404) {
          message = 'Recurso no encontrado.';
        } else if (error.status === 500) {
          message = 'Error interno del servidor.';
        } else if (error.error?.errorMessage) {
          message = error.error.errorMessage;
        }

        return throwError(() => new Error(message));
      })
    );
  }

}
