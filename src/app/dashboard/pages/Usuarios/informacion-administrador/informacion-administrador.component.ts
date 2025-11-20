import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { AuthService } from '../../../../auth/services/auth.service';
import { User } from '../../../../auth/interfaces';
import { ClientService } from '../../../service/client.service';

@Component({
  selector: 'app-informacion-administrador',
  templateUrl: './informacion-administrador.component.html',
  styleUrl: './informacion-administrador.component.css'
})
export class InformacionAdministradorComponent {

  public isOpen = false;
  private authService = inject(AuthService);
  private clientService = inject(ClientService);
  private elRef = inject(ElementRef);
  public usuario: User | null = null;

  ngOnInit(): void {
    this.clientService.getUserById(1).subscribe({
      next: (resp) => this.usuario = resp.data,
      error: (err) => console.error('Error al cargar usuario', err)
    });
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
