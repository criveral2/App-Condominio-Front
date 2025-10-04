import { Component, inject } from '@angular/core';
import { AreaComunData } from '../../../interfaces/area-comun/area-comun.interface';
import Swal from 'sweetalert2';
import { ClientService } from '../../../service/client.service';
import { User } from '../../../../auth/interfaces';

@Component({
  selector: 'app-activo',
  templateUrl: './activo.component.html',
  styleUrl: './activo.component.css'
})
export class ActivoComponent {
  
    public page: number = 1;       // página actual
    public pageSize: number = 7; 
    public areasComunes: AreaComunData[] = [];
    public openModal = false;
    public isOpenPago = false;
    public isOpenContrato = false;
    public isOpenVisualizar = false;
    public areacomun: AreaComunData | undefined;
    public soloLectura: boolean = false; // 👈 flag de solo lectura
    public usuarios: User[] = [];
    public usuario: User | undefined;
    private clientService = inject(ClientService);
  

    constructor() {
      this.cargaResidentes();
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

    openPago(usuario: User) {
      this.usuario = usuario;
      this.isOpenPago = true;
    }

    openContrato(usuario: User) {
      this.usuario = usuario;
      this.isOpenContrato = true;
    }

     openVisualizar(usuario: User) {
      this.usuario = usuario;
      this.isOpenVisualizar = true;
    }
  


}
