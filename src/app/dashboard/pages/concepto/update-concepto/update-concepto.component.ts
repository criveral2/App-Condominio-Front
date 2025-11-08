import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { SeccionData } from '../../../interfaces/seccion/seccion.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeccionService } from '../../../service/seccion.service';
import Swal from 'sweetalert2';
import { ConceptoData } from '../../../interfaces/concepto/concepto.interface';
import { ConceptoService } from '../../../service/concepto.service';

@Component({
  selector: 'app-update-concepto',
  templateUrl: './update-concepto.component.html',
  styleUrl: './update-concepto.component.css'
})
export class UpdateConceptoComponent {

  @Input() isOpenUpdateConcepto = false;
  @Output() close = new EventEmitter<void>();
  @Input() soloLectura: boolean = false;
  @Output() conceptoActualizado = new EventEmitter<void>();
  @Input() concepto: ConceptoData | undefined;

  private fb = inject(FormBuilder);
  private conceptoService = inject(ConceptoService);

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(5)], []],
  });

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['concepto'] && this.concepto) {
      this.myForm.patchValue({  // ojo aquí, en el JSON viene como "area comun"
        name: this.concepto.name,
      });
    }
    if (changes['soloLectura']) {
      if (this.soloLectura) {
        this.myForm.disable(); // deshabilita todos los inputs
      } else {
        this.myForm.enable();  // habilita todos los inputs
      }
    }
  }

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
  onUpdate(): void {

    if (this.myForm.invalid) return;
    if (!this.concepto) return;

    const conceptoData: ConceptoData = {
      ...this.myForm.value,
      id: this.concepto.id
    }

    this.conceptoService.updateConcepto(conceptoData).subscribe({
      next: () => {
        this.conceptoActualizado.emit(); // notifica al padre
        Swal.fire('Éxito', 'Concepto actualizado correctamente', 'success');
        this.myForm.reset({ idSection: '1', idTypeArea: '1' });
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
  }


}
