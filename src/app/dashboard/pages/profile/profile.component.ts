import { Component, inject } from '@angular/core';
import { ClientService } from '../../service/client.service';
import { User } from '../../../auth/interfaces';
import { AuthService } from '../../../auth/services/auth.service';
import Swal from 'sweetalert2';

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

  eliminarProfile(id: number) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará el área común de forma permanente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.clientService.eliminarUser(id).subscribe({
            next: () => {
              Swal.fire('Eliminado', 'El área común ha sido eliminada correctamente.', 'success');
              this.cargaResidentes(); // notifica al padre
            },
            error: (message) => {
              const messages = message.error?.errorMessage || message.message || 'Error desconocido';
              Swal.fire('Error', messages.toString(), 'error');
            }
          });
        }
      });
    }



}
