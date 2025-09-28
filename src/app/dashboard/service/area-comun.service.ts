import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AreaComun, AreaComunData } from '../interfaces/area-comun/area-comun.interface';
import { Observable } from 'rxjs';

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

  




}
