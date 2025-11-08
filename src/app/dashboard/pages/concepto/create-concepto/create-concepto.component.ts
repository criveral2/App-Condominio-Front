import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AreaComunService } from '../../../service/area-comun.service';
import { TipoArea } from '../../../interfaces/area-comun/tipo-area.interface';
import { AreaComunCreate } from '../../../interfaces/area-comun/area-comun.interface';
import { SeccionService } from '../../../service/seccion.service';
import { Seccion } from '../../../interfaces/seccion/seccion.interface';
import { ConceptoService } from '../../../service/concepto.service';
import { ConceptoData } from '../../../interfaces/concepto/concepto.interface';

@Component({
  selector: 'app-create-concepto',
  templateUrl: './create-concepto.component.html',
  styleUrl: './create-concepto.component.css'
})
export class CreateConceptoComponent {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @Output() conceptoCreada = new EventEmitter<void>();
  private fb = inject(FormBuilder);
  private conceptoService = inject(ConceptoService);

  constructor() { }

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(5)], []],
  });

  isValid(field: string): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field]) return null;
    const errors = this.myForm.controls[field].errors || {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres`;
      }
    }
    return null;
  }


   onSave(): void {
    
     if (this.myForm.invalid) return;
     const conceptoData: ConceptoData = {
       ...this.myForm.value
     };
     
     this.conceptoService.createConcepto(conceptoData).subscribe({
       next: () => {
         this.conceptoCreada.emit(); // notifica al padre
         Swal.fire('Éxito', 'Concepto creado correctamente', 'success');
         this.onClose();
       },
       error: (message) => {
         const messages = message.error?.errorMessage || message.message || 'Error desconocido';
         Swal.fire('Error', messages.toString(), 'error');
       }
     });
   }

  onClose() {
    this.close.emit();
    this.myForm.reset({ idSection: '1', idTypeArea: '1' });
  }


}
