import { Component, inject } from '@angular/core';
import { ClientService } from '../../service/client.service';
import { User } from '../../../auth/interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  openModal = false;
  public page: number = 1;       // página actual
  public pageSize: number = 5; 
  public usuarios: User[] = [];

private clientService = inject(ClientService);
  
  constructor() {
    this.cargaResidentes()
  }

  cargaResidentes(){

    this.clientService.getUsers().subscribe({
        next: (resp) => {
          this.usuarios = resp.data;
          this.usuarios.sort((a, b) => b.idUser - a.idUser);
        },
        error: (err) => {
          console.error('Error al cargar roles:', err);
        }
    });
  }
 
}
