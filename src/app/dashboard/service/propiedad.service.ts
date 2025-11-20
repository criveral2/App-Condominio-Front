import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Propiedad, PropiedadData } from '../interfaces/Propiedad/propiedad.interface';
import { map, Observable } from 'rxjs';
import { TipoPropiedad } from '../interfaces/Propiedad/tipo-propiedad.interface';

@Injectable({
  providedIn: 'root'
})
export class PropiedadService {

  private baseUrl: string = 'http://localhost:8080/api/v1/property';
  private http = inject(HttpClient);

  constructor() { }

  getPropiedades(): Observable<Propiedad> {
    const url: string = `${this.baseUrl}/all`;
    return this.http.get<Propiedad>(url);
  }


  getTipoPropiedad(): Observable<TipoPropiedad> {
    const url: string = `${this.baseUrl}/type`;
    return this.http.get<TipoPropiedad>(url);
  }

  createPropiedad(propiedadCreate: PropiedadData): Observable<Propiedad> {
    const url = `${this.baseUrl}`;
    return this.http.post<Propiedad>(url, propiedadCreate).pipe(
      map(resp => {
        if (resp.responseCode !== 'PROP-0001') {
          // Si hay error, lanza excepción
          throw new Error(resp.errorMessage || 'Error desconocido');
        }
        // Si todo va bien, retorna el area común
        return resp as Propiedad;
      }),
    );
  }

  updatePropiedad(propiedad: any, id: number): Observable<Propiedad> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<Propiedad>(url, propiedad).pipe(
      map(resp => {
        if (resp.responseCode !== 'PROP-0002') {
          throw new Error(resp.errorMessage || 'Error desconocido');
        }
        return resp;
      })
    );
  }


  eliminarPropiedad(id: number): Observable<void> {
    const url: string = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }


}
