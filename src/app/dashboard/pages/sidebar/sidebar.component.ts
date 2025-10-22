import { Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  private authService = inject( AuthService );

  visible(): boolean {
      return this.authService.validaRol();
  }
  


}
