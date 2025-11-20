import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AreaComun, AreaComunCreate, AreaComunData } from '../../../interfaces/area-comun/area-comun.interface';
import { AreaComunService } from '../../../service/area-comun.service';
import { TipoArea, TipoAreaData } from '../../../interfaces/area-comun/tipo-area.interface';
import Swal from 'sweetalert2';
import { SeccionService } from '../../../service/seccion.service';
import { Seccion } from '../../../interfaces/seccion/seccion.interface';
import { TipoPropiedadData } from '../../../interfaces/Propiedad/tipo-propiedad.interface';
import { PropiedadData } from '../../../interfaces/Propiedad/propiedad.interface';
import { PropiedadService } from '../../../service/propiedad.service';
@Component({
  selector: 'app-update-propiedades',
  templateUrl: './update-propiedades.component.html',
  styleUrl: './update-propiedades.component.css'
})
export class UpdatePropiedadesComponent {
  @Input() isOpenUpdatePropiedad = false;
  @Output() close = new EventEmitter<void>();
  @Input() soloLectura: boolean = false;
  @Output() propiedadActualizado = new EventEmitter<void>();
  @Input() propiedad: PropiedadData | undefined;

  private fb = inject(FormBuilder);
  private propiedadService = inject(PropiedadService);
  public tipoPropiedades: TipoPropiedadData[] = [];


  public myForm: FormGroup = this.fb.group({
    propertyDimensions: [1, [Validators.required, Validators.min(1)]],
    propertyDescription: ['', [Validators.required, Validators.minLength(8)]],
    propertyValue: [1, [Validators.required, Validators.min(1)]],
    propertyIdType: [1, [Validators.required]],
  });

  constructor() { }

  ngOnInit(): void {
    this.myForm.get('propertyIdType')!.valueChanges;
    this.propiedadService.getTipoPropiedad().subscribe({
      next: (resp) => {
        this.tipoPropiedades = resp.data;
      },
      error: (err) => console.error('Error cargando tipos', err)
    });
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



  // 👀 Cuando cambie el input usuario
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['propiedad'] && this.propiedad) {
      this.myForm.patchValue({
        id: this.propiedad.id,
        propertyDimensions: this.propiedad.propertyDimensions,   // ojo aquí, en el JSON viene como "area comun"
        propertyDescription: this.propiedad.propertyDescription,
        propertyValue: this.propiedad.propertyValue,
        propertyIdType: this.tipoPropiedades?.find(r => r.type == this.propiedad?.propertyType)?.id ?? 1 // buscar el id del tipo de area por su type;
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


  onUpdate(): void {
    if (this.myForm.invalid) return;
    if (!this.propiedad) return;
    // Mapear FormGroup 
    const propiedadUpdate: any = {
      ...this.myForm.value,
      propertyIdType: Number(this.myForm.value.propertyIdType),
      propertyEnvironments: 1,
      propertyImage: "no hay",
      propertyIdSection: this.propiedad.propertyIdSection
    };



    this.propiedadService.updatePropiedad(propiedadUpdate, this.propiedad.id).subscribe({
      next: () => {
        this.propiedadActualizado.emit(); // notifica al padre
        Swal.fire('Éxito', 'Área común actualizada correctamente', 'success');
        this.myForm.reset({ propertyIdType: '1' });
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
