import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, take, tap } from 'rxjs';
import { User, AuthStatus, LoginResponse } from '../interfaces'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient);

  private _currentUser = signal<User|null>(null);
  private _authStatus = signal<AuthStatus>( AuthStatus.checking );

  public currentUser = computed( () => this._currentUser );
  public authStatus = computed( () => this._authStatus );

  constructor() { }

  login( email: string, password: string): Observable<boolean> {

    const url = `${ this.baseUrl }/api/v1/user/login`;
    const body = {username:email, password};

    return this.http.post<LoginResponse>(url,body)
    .pipe(
      tap( ({data, responseCode}) => {
        this._currentUser.set(data);
        this._authStatus.set(AuthStatus.authenticated);
        localStorage.setItem('token', responseCode );
        console.log(data, responseCode);
      }),
      map( () => true )
    )

  }

}
