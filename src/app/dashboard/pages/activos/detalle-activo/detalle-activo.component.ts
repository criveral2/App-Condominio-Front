import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { User } from '../../../../auth/interfaces';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { minDateValidator } from '../../../validators/validator-date';
import { SeccionData } from '../../../interfaces/seccion/seccion.interface';
import { PropiedadService } from '../../../service/propiedad.service';
import { TipoPropiedad, TipoPropiedadData } from '../../../interfaces/Propiedad/tipo-propiedad.interface';
import { PropiedadData } from '../../../interfaces/Propiedad/propiedad.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-activo',
  templateUrl: './detalle-activo.component.html',
  styleUrl: './detalle-activo.component.css'
})
export class DetalleActivoComponent {
  @Input() isOpenCrearPropiedad = false;
  @Input() seccion: SeccionData | undefined;
  @Output() close = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private propiedadService = inject(PropiedadService);
  public tipoPropiedades: TipoPropiedadData[] = [];

  constructor() { }

  ngOnInit(): void {
    this.propiedadService.getTipoPropiedad().subscribe({
      next: (resp) => {
        this.tipoPropiedades = resp.data;
      },
      error: (err) => console.error('Error cargando tipos', err)
    });
  }

  public myForm: FormGroup = this.fb.group({
    propertyDimensions: [1, [Validators.required, Validators.min(1)]],
    propertyDescription: ['', [Validators.required, Validators.minLength(8)]],
    propertyValue: [1, [Validators.required, Validators.min(1)]],
    propertyIdType: [1, [Validators.required]],
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

  onSave(): void {
    if (this.myForm.invalid) return;
    if (!this.seccion) return;
    const propiedad: PropiedadData = {
      ...this.myForm.value,    // ← lo que viene del formulario
      propertyEnvironments: 1,
      propertyImage: "no hay",
      propertyIdSection: this.seccion.id
    };

    this.propiedadService.createPropiedad(propiedad).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Área Comun creada correctamente', 'success');
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
    this.myForm.reset();
  }
}
