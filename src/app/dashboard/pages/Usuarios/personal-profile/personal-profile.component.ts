import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';
import { User } from '../../../../auth/interfaces';

@Component({
  selector: 'app-personal-profile',
  templateUrl: './personal-profile.component.html',
  styleUrl: './personal-profile.component.css'
})
export class PersonalProfileComponent {
    private authService = inject( AuthService );
 
    get usuario(): User | null {
      return this.authService.currentUser(); // se obtiene dinámicamente del signal
    }
  

}
