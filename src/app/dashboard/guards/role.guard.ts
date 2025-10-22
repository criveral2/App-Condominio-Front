import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, NavigationEnd, Router, RouterStateSnapshot} from '@angular/router';
import { filter, Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({providedIn: 'root'})
export class RoleGuard implements  CanActivate{
    private authService = inject( AuthService );
    private router = inject( Router);
    public currentRoute: string = '';
    activatedRoute: any;
    constructor() { }

    validaRolGuard():boolean | Observable<boolean>{
        const isAdmin =  this.authService.validaRol();
        if (!isAdmin) {
        this.router.navigate(['/dashboard/perfil']);
        this.router.events
              .pipe(filter(event => event instanceof NavigationEnd))
              .subscribe(() => {
                let child = this.activatedRoute.firstChild;
                while (child?.firstChild) {
                  child = child.firstChild; // bajar al nivel más profundo de la ruta
                }
                if (child && child.snapshot.data['title']) {
                  this.currentRoute = child.snapshot.data['title'];
                }
              });
        }
          return isAdmin;
    }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
       return this.validaRolGuard();
    }


    
}