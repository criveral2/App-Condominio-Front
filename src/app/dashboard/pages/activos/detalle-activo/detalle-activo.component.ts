import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { User } from '../../../../auth/interfaces';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { minDateValidator } from '../../../validators/validator-date';

@Component({
  selector: 'app-detalle-activo',
  templateUrl: './detalle-activo.component.html',
  styleUrl: './detalle-activo.component.css'
})
export class DetalleActivoComponent {
  @Input() isOpenVisualizar = false;
  @Input() usuario: User | undefined;
  @Output() close = new EventEmitter<void>();

  private fb = inject( FormBuilder );
  constructor( ) { }
  
  public myForm: FormGroup = this.fb.group({
    concept: ['', [Validators.required]],
    detail: ['', [Validators.required, Validators.minLength(8)]],
    amount: ['', [Validators.required, Validators.min(1)]],
    date: ['', [Validators.required, minDateValidator(new Date())]],
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
        case 'pattern':
          return 'Formato inválido';
        case 'min':
          return `El valor debe ser mayor o igual a ${errors['min'].min}`;
        case 'minDate': // tu validador personalizado
          return 'La fecha debe ser mayor o igual a hoy';
      }
    }
    return null;
  }

   onUpdate(): void {
    if (this.myForm.invalid) return;
    if (!this.usuario) return;
    this.myForm.reset();
    this.close.emit();
  }

  onClose() {
    this.close.emit();
    this.myForm.reset();
  }
}
