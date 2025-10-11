import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AreaComunService } from '../../../service/area-comun.service';
import { TipoArea } from '../../../interfaces/area-comun/tipo-area.interface';
import { AreaComunCreate } from '../../../interfaces/area-comun/area-comun.interface';
import { SeccionService } from '../../../service/seccion.service';
import { Seccion, SeccionData } from '../../../interfaces/seccion/seccion.interface';
import { AuthService } from '../../../../auth/services/auth.service';
import { User } from '../../../../auth/interfaces';

@Component({
  selector: 'app-seccion-create',
  templateUrl: './seccion-create.component.html',
  styleUrl: './seccion-create.component.css'
})
export class SeccionCreateComponent {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @Output() seccionCreada = new EventEmitter<void>();


  private fb = inject(FormBuilder);
  private seccionService = inject(SeccionService);
  public seccion: Seccion | undefined;
  private authService = inject(AuthService);

  public myForm: FormGroup = this.fb.group({
    location: ['', [Validators.required, Validators.minLength(10)], []],
    name: ['', [Validators.required], []],
  });

  constructor() { }

  get usuario(): User | null {
    return this.authService.currentUser(); // se obtiene dinámicamente del signal
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


  onSave(): void {
    if (!this.usuario) return;

    if (this.myForm.invalid) return;
    const seccionCreate: SeccionData = {
      ...this.myForm.value,
      idUser: this.usuario.idUser
    };
    
    this.seccionService.createSeccion(seccionCreate).subscribe({
      next: () => {
        this.seccionCreada.emit(); // notifica al padre
        Swal.fire('Éxito', 'Sección creada correctamente', 'success');
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
