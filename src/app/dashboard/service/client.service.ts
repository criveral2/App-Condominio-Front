import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../../auth/interfaces';
import { map, Observable, of, tap } from 'rxjs';
import { ApiResponseUser } from '../interfaces/usuario/create-response.interface';
import { UpdateUser, UpdateUserData } from '../interfaces/usuario/update-user.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl : string = 'http://localhost:8080/api/v1/user';

  constructor(private http: HttpClient) { }


    getUsers():Observable<User>{
      const url : string = `${this.baseUrl}/all`;
      return this.http.get<User>(url);
    }

  createUser(user: User): Observable<User> {
    const url = `${this.baseUrl}/signup`;
    return this.http.post<ApiResponseUser>(url, user).pipe(
      map(resp => {
        if (resp.responseCode !== 'USER-0002') {
          // Si hay error, lanza excepción
          throw new Error(resp.errorMessage || 'Error desconocido');
        }
        // Si todo va bien, retorna el usuario
        return resp.data as User;
      }),
    );
  }

    updateUser(user: UpdateUserData): Observable<UpdateUserData> {
    const url = `${this.baseUrl}/update`;
    return this.http.put<UpdateUser>(url, user).pipe(
      map(resp => {
        if (resp.responseCode !== 'USER-0003') {
          // Si hay error, lanza excepción
          throw new Error(resp.errorMessage || 'Error desconocido');
        }
        // Si todo va bien, retorna el usuario
        return resp.data as UpdateUserData;
      })
    );
  }


}
