import { Component, inject } from '@angular/core';
import { AreaComunService } from '../../../service/area-comun.service';
import { AreaComunData } from '../../../interfaces/area-comun/area-comun.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-areas-comunes',
  templateUrl: './areas-comunes.component.html',
  styleUrl: './areas-comunes.component.css'
})
export class AreasComunesComponent {

  public page: number = 1;       // página actual
  public pageSize: number = 5; 
  private areaComunService = inject(AreaComunService);
  public areasComunes: AreaComunData[] = [];
  public openModal = false;
  public isOpenUpdateAreaComun = false;
  public areacomun: AreaComunData | undefined;
  public soloLectura: boolean = false; // 👈 flag de solo lectura


  constructor() {
    this. cargaAreasComunes();
  }


  cargaAreasComunes(){
    this.areaComunService.getAreasComunes().subscribe({
        next: (resp) => {
          this.areasComunes = resp.data;
          this.areasComunes.sort((a, b) => b.id - a.id);
        },
        error: (err) => {
          console.error('Error al cargar roles:', err);
        }
    });
  }

  openUpdateAreaComun(areacomun: AreaComunData, soloLectura: boolean = false ) {
      this.areacomun = areacomun;
      this.isOpenUpdateAreaComun = true;
      this.soloLectura = soloLectura;  // 👈 flag de visualización
  }


  eliminarAreaComun(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el área común de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.areaComunService.eliminarAreaComun(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'El área común ha sido eliminada correctamente.', 'success');
            this.cargaAreasComunes(); // notifica al padre
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
