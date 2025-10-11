import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AreaComun, AreaComunCreate, AreaComunData } from '../interfaces/area-comun/area-comun.interface';
import { map, Observable } from 'rxjs';
import { TipoArea } from '../interfaces/area-comun/tipo-area.interface';
import { Seccion } from '../interfaces/seccion/seccion.interface';

@Injectable({
  providedIn: 'root'
})
export class AreaComunService {
  private baseUrl : string = 'http://localhost:8080/api/v1/commonarea';
  private http = inject(HttpClient);
  
  constructor() { }

  getAreasComunes():Observable<AreaComun>{
    const url : string = `${this.baseUrl}/all`;
    return this.http.get<AreaComun>(url);
  }

  getAreaComunById(id: number): Observable<AreaComun> {
    const url: string = `${this.baseUrl}/${id}`;
    return this.http.get<AreaComun>(url);
  }

  getTipoArea():Observable<TipoArea>{
    const url : string = `${this.baseUrl}/type`;
    return this.http.get<TipoArea>(url);
  }


  eliminarAreaComun(id: number): Observable<void> {
    const url: string = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  createAreaComun(areaComunCreate: AreaComunCreate): Observable<AreaComun> {
    const url = `${this.baseUrl}`;
    return this.http.post<AreaComun>(url, areaComunCreate).pipe(
      map(resp => {
        if (resp.responseCode !== 'CARE-0001') {
          // Si hay error, lanza excepción
          throw new Error(resp.errorMessage || 'Error desconocido');
        }
        // Si todo va bien, retorna el area común
        return resp as AreaComun;
      }),
    );
  }

  updateAreaComun(areComun: AreaComunCreate, id:number): Observable<AreaComun> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<AreaComun>(url, areComun).pipe(
      map(resp => {
        if (resp.responseCode !== 'CARE-0002') {
          // Si hay error, lanza excepción
          throw new Error(resp.errorMessage || 'Error desconocido');
        }
        // Si todo va bien, retorna el usuario
        return (resp as AreaComun);
      })
    );
  }

  




}
