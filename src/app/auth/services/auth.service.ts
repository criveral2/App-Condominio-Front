import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, take, tap, throwError } from 'rxjs';
import { User, AuthStatus, LoginResponse } from '../interfaces'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl;
  private http = inject( HttpClient);

  private _currentUser = signal<User|null>(null);
  private _authStatus = signal<AuthStatus>( AuthStatus.checking );

  public currentUser = computed( () => this._currentUser() );
  public authStatus = computed( () => this._authStatus() );

  constructor() { 
    this.ngOnInit();
  }
  ngOnInit() {
    const emailres = localStorage.getItem('username');
    const passwordres = localStorage.getItem('password');

    if (emailres && passwordres) {
      this.login(emailres, passwordres).subscribe({
        next: (res) => console.log('Login ok'),
        error: (err) => console.error('Error al reautenticar:', err)
      });
    }else{
      this._authStatus.set(AuthStatus.notAuthenticated);
    }
    
  }

  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/api/v1/user/login`;
    const body = { username: email, password };

    return this.http.post<LoginResponse>(url, body).pipe(

      // Validar la respuesta
      map(({ data, responseCode }) => {
        if (data == null && responseCode === 'USER-6001') {
          // 🚨 Lanzamos un error aunque sea 200
          throw new Error('El usuario o la contraseña son incorrectos');
        }
        return { data, responseCode };
      }),

      // Efectos secundarios si es login válido
      tap(({ data, responseCode }) => {
        this._currentUser.set(data);
        this._authStatus.set(AuthStatus.authenticated);
        localStorage.setItem('token', responseCode);
        localStorage.setItem('username', email);
        localStorage.setItem('password', password);
      }),

      // Convertimos a booleano para cumplir con la firma del método
      map(() => true),

      // Manejo de error
      catchError(err => {
        return throwError(() => err.message);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);

  }


}
