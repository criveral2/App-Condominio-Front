import { Component, inject } from '@angular/core';
import { AreaComunService } from '../../../service/area-comun.service';
import { AreaComunData } from '../../../interfaces/area-comun/area-comun.interface';
import Swal from 'sweetalert2';
import { PropiedadService } from '../../../service/propiedad.service';
import { PropiedadData } from '../../../interfaces/Propiedad/propiedad.interface';
import { ContratoService } from '../../../service/contrato.service';
import { ContratoData } from '../../../interfaces/contrato/contrato.interface';

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrl: './contratos.component.css'
})
export class ContratosComponent {
 public page: number = 1;       // página actual
  public pageSize: number = 7;
  private contratoService = inject(ContratoService);
  public contratos: ContratoData[] = [];
  public openModal = false;
  public isOpenUpdateContrato= false;
  public isOpenCreateContrato = false;
  public contrato: ContratoData | undefined;
  public soloLectura: boolean = false; // 👈 flag de solo lectura


  constructor() {
    this.cargaContratos();
  }


  cargaContratos() {
    this.contratoService.getContratos().subscribe({
      next: (resp) => {
        this.contratos = resp.data;
        this.contratos.sort((a, b) => b.id - a.id);
      },
      error: (err) => {
        console.error('Error al cargar roles:', err);
      }
    });
  }

  openUpdateContrato(propiedad: ContratoData, soloLectura: boolean = false) {
    this.contrato = propiedad;
    this.isOpenUpdateContrato = true;
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
        this.contratoService.eliminarContrato(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'El área común ha sido eliminada correctamente.', 'success');
            this.cargaContratos(); // notifica al padre
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
