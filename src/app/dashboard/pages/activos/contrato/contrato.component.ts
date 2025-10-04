import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { User } from '../../../../auth/interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrl: './contrato.component.css'
})
export class ContratoComponent {
  @Input() isOpenContrato = false;
  @Input() usuario: User | undefined;
  @Output() close = new EventEmitter<void>();

  private fb = inject( FormBuilder );
  constructor( ) { }
  
  public myForm: FormGroup = this.fb.group({
      password: [ '', [ Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/)]],
      repeatPassword: ['', [Validators.required]], 
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
          return 'Debe tener al menos 8 caracteres, una mayúscula y un caracter especial';
        case 'passwordMismatch':
          return 'Las contraseñas no coinciden';
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
