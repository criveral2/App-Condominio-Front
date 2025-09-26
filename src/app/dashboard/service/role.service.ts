import { Injectable } from '@angular/core';
import { RoleType } from '../interfaces/usuario/tipo-usuario.interfaces';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private baseUrl : string = 'http://localhost:8080/api/v1/user';

  constructor(private http : HttpClient) { }

  getTipoUsuario():Observable<RoleType>{
    const url : string = `${this.baseUrl}/type/all`;
    console.log(url);
    return this.http.get<RoleType>(url)
      .pipe(
        tap( resp => console.log( {resp} ))
    )
  }


}
