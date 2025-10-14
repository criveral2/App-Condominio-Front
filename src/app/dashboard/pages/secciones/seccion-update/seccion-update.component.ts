import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { SeccionData } from '../../../interfaces/seccion/seccion.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SeccionService } from '../../../service/seccion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seccion-update',
  templateUrl: './seccion-update.component.html',
  styleUrl: './seccion-update.component.css'
})
export class SeccionUpdateComponent {
  @Input() isOpenUpdateSeccion = false;
  @Output() close = new EventEmitter<void>();
  @Input() soloLectura: boolean = false;
  @Output() seccionActualizado = new EventEmitter<void>();
  @Input() seccion: SeccionData | undefined;

  private fb = inject(FormBuilder);
  private seccionService = inject(SeccionService);

  public myForm: FormGroup = this.fb.group({
    location: ['', [Validators.required, Validators.minLength(10)], []],
    name: ['', [Validators.required], []],
  });

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['seccion'] && this.seccion) {
      this.myForm.patchValue({
        location: this.seccion.location,   // ojo aquí, en el JSON viene como "area comun"
        name: this.seccion.name,
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
    if (!this.seccion) return;

    const seccionUpdate: SeccionData = {
      ...this.myForm.value,
      id: this.seccion.id,
      idUser: this.seccion.idUser
    }

    this.seccionService.updateSeccion(seccionUpdate).subscribe({
      next: () => {
        this.seccionActualizado.emit(); // notifica al padre
        Swal.fire('Éxito', 'Sección creada correctamente', 'success');
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
