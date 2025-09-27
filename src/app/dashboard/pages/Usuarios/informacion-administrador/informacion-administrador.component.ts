import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';
import { User } from '../../../../auth/interfaces';

@Component({
  selector: 'app-informacion-administrador',
  templateUrl: './informacion-administrador.component.html',
  styleUrl: './informacion-administrador.component.css'
})
export class InformacionAdministradorComponent {

  public isOpen = false;
  private authService = inject( AuthService );
  private elRef = inject( ElementRef );


  get usuario(): User | null {
    return this.authService.currentUser(); // se obtiene dinámicamente del signal
  }

  togglePopover() {
    this.isOpen = !this.isOpen;
  }

    // Detecta clics fuera del componente
  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    const clickedInside = this.elRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.isOpen = false;
    }
  }
  
}
