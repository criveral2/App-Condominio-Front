import { Component, inject } from '@angular/core';
import { AreaComunService } from '../../../service/area-comun.service';
import { AreaComunData } from '../../../interfaces/area-comun/area-comun.interface';
import Swal from 'sweetalert2';
import { PropiedadService } from '../../../service/propiedad.service';
import { PropiedadData } from '../../../interfaces/Propiedad/propiedad.interface';

@Component({
  selector: 'app-propiedades',
  templateUrl: './propiedades.component.html',
  styleUrl: './propiedades.component.css'
})
export class PropiedadesComponent {
  public page: number = 1;       // página actual
  public pageSize: number = 7;
  private propiedadService = inject(PropiedadService);
  public propiedades: PropiedadData[] = [];
  public openModal = false;
  public isOpenUpdatePropiedad = false;
  public isOpenCreateContrato = false;
  public propiedad: PropiedadData | undefined;
  public soloLectura: boolean = false; // 👈 flag de solo lectura


  constructor() {
    this.cargaPropiedades();
  }


  cargaPropiedades() {
    this.propiedadService.getPropiedades().subscribe({
      next: (resp) => {
        this.propiedades = resp.data;
        this.propiedades.sort((a, b) => b.id - a.id);
      },
      error: (err) => {
        console.error('Error al cargar roles:', err);
      }
    });
  }

  openUpdatePropiedad(propiedad: PropiedadData, soloLectura: boolean = false) {
    this.propiedad = propiedad;
    this.isOpenUpdatePropiedad = true;
    this.soloLectura = soloLectura;  // 👈 flag de visualización
  }

  openCreaContrato(propiedad: PropiedadData, soloLectura: boolean = false) {
    this.propiedad = propiedad;
    this.isOpenCreateContrato = true;
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
        this.propiedadService.eliminarPropiedad(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'El área común ha sido eliminada correctamente.', 'success');
            this.cargaPropiedades(); // notifica al padre
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
