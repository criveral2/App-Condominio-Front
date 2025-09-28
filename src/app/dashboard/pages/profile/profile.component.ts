import { Component, inject } from '@angular/core';
import { ClientService } from '../../service/client.service';
import { User } from '../../../auth/interfaces';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  public openModal = false;
  public isOpenUpdateProfile = false;
  public isOpenUpdatePasswordProfile = false;
  
  public page: number = 1;       // página actual
  public pageSize: number = 5; 
  public usuarios: User[] = [];
  public usuario: User | undefined;
  public soloLectura: boolean = false; // 👈 flag de solo lectura

  private clientService = inject(ClientService);
  private authService = inject( AuthService );
    
  constructor() {
    this.cargaResidentes();
    this.validaRolEditor();
  }

  get usuarioLogeado(): User | null {
      return this.authService.currentUser(); // se obtiene dinámicamente del signal
  }
  validaRolEditor(): boolean {
    if (this.usuarioLogeado?.typeUser === "Admin") {
      return true;
    }
   return false;
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

  openUpdateProfile(usuario: User, soloLectura: boolean = false ) {
    this.usuario = usuario;
    this.isOpenUpdateProfile = true;
    this.soloLectura = soloLectura;  // 👈 flag de visualización
  }

  openPasswordProfile(usuario: User) {
    this.usuario = usuario;
    this.isOpenUpdatePasswordProfile = true;
  }
}
