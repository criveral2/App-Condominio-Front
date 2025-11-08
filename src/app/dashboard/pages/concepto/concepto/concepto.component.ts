import { Component, inject } from '@angular/core';
import { AreaComunService } from '../../../service/area-comun.service';
import { AreaComunData } from '../../../interfaces/area-comun/area-comun.interface';
import Swal from 'sweetalert2';
import { ConceptoService } from '../../../service/concepto.service';
import { ConceptoData } from '../../../interfaces/concepto/concepto.interface';
@Component({
  selector: 'app-concepto',
  templateUrl: './concepto.component.html',
  styleUrl: './concepto.component.css'
})
export class ConceptoComponent {


  public page: number = 1;       // página actual
  public pageSize: number = 5;
  private conceptoService = inject(ConceptoService);
  public conceptos: ConceptoData[] = [];
  public openModal = false;
  public isOpenUpdateConcepto = false;
  public concepto: ConceptoData | undefined;
  public soloLectura: boolean = false; // 👈 flag de solo lectura


  constructor() {
    this.cargaConcepto();
  }


  cargaConcepto() {
    this.conceptoService.getConcepto().subscribe({
      next: (resp) => {
        this.conceptos = resp.data;
        this.conceptos.sort((a, b) => b.id - a.id);
      },
      error: (err) => {
        console.error('Error al cargar concepto:', err);
      }
    });
  }

  openUpdateConcepto(concepto: ConceptoData, soloLectura: boolean = false) {
    this.concepto = concepto;
    this.isOpenUpdateConcepto = true;
    this.soloLectura = soloLectura;  // 👈 flag de visualización
  }


  eliminarConcepto(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la sección de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.conceptoService.eliminarConcepto(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'La sección ha sido eliminada correctamente.', 'success');
            this.cargaConcepto(); // notifica al padre
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
