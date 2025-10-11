import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Seccion, SeccionData } from '../interfaces/seccion/seccion.interface';

@Injectable({
  providedIn: 'root'
})
export class SeccionService {

  private baseUrl: string = 'http://localhost:8080/api/v1/section';
  private http = inject(HttpClient);

  constructor() { }

  getSeccion(): Observable<Seccion> {
    const url: string = `${this.baseUrl}/all`;
    return this.http.get<Seccion>(url);
  }

  createSeccion(seccionCreate: SeccionData): Observable<Seccion> {
    const url = `${this.baseUrl}`;
    return this.http.post<Seccion>(url, seccionCreate).pipe(
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

