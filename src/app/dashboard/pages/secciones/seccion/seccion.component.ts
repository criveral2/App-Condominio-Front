import { Component, inject } from '@angular/core';
import { AreaComunService } from '../../../service/area-comun.service';
import { AreaComunData } from '../../../interfaces/area-comun/area-comun.interface';
import Swal from 'sweetalert2';
import { SeccionService } from '../../../service/seccion.service';
import { SeccionData } from '../../../interfaces/seccion/seccion.interface';

@Component({
  selector: 'app-seccion',
  templateUrl: './seccion.component.html',
  styleUrl: './seccion.component.css'
})
export class SeccionComponent {
  public page: number = 1;       // página actual
  public pageSize: number = 7;
  private seccionService = inject(SeccionService);
  public secciones: SeccionData[] = [];
  public openModal = false;
  public isOpenUpdateSeccion = false;
  public seccion: SeccionData | undefined;
  public soloLectura: boolean = false; // 👈 flag de solo lectura


  constructor() {
    this.cargaSeccion();
  }


  cargaSeccion() {
    this.seccionService.getSeccion().subscribe({
      next: (resp) => {
        this.secciones = resp.data;
        this.secciones!.sort((a, b) => b.id! - a.id!);
      },
      error: (err) => {
        console.error('Error al cargar roles:', err);
      }
    });
  }

  openUpdateSeccion(seccion: SeccionData, soloLectura: boolean = false) {
    this.seccion = seccion;
    this.isOpenUpdateSeccion = true;
    this.soloLectura = soloLectura;  // 👈 flag de visualización
  }


  eliminarSeccion(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la sección de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.seccionService.eliminarSeccion(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'La sección ha sido eliminada correctamente.', 'success');
            this.cargaSeccion(); // notifica al padre
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
