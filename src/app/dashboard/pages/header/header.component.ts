import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { User } from '../../../auth/interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

   private authService = inject( AuthService );
   private router = inject( Router );
   private activatedRoute = inject( ActivatedRoute );
   public currentRoute: string = '';
   

   constructor(){
    this.ngOnInit();
   }

  ngOnInit() {
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
  get usuario(): User | null {
       return this.authService.currentUser(); // se obtiene dinámicamente del signal
     }


  onLogout(){
    this.authService.logout();
  }
}
