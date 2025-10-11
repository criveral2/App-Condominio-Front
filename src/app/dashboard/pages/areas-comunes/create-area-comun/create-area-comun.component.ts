import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AreaComunService } from '../../../service/area-comun.service';
import { TipoArea } from '../../../interfaces/area-comun/tipo-area.interface';
import { AreaComunCreate } from '../../../interfaces/area-comun/area-comun.interface';
import { SeccionService } from '../../../service/seccion.service';
import { Seccion } from '../../../interfaces/seccion/seccion.interface';

@Component({
  selector: 'app-create-area-comun',
  templateUrl: './create-area-comun.component.html',
  styleUrl: './create-area-comun.component.css'
})
export class CreateAreaComunComponent {

    @Input() isOpen = false;
    @Output() close = new EventEmitter<void>();
    @Output() areaComunCreada = new EventEmitter<void>();
  
  
    private fb               = inject( FormBuilder );
    private areaComunService = inject( AreaComunService );
    private seccionService = inject( SeccionService );
    public tipoArea : TipoArea | undefined;
    public seccion : Seccion | undefined;

    public myForm: FormGroup = this.fb.group({
      description: [ '', [Validators.required, Validators.minLength(10)], [] ],
      idSection: [ '1', [Validators.required], [] ],
      idTypeArea: [ '1', [Validators.required], [] ],
    });

    constructor( ) { }
  
    ngOnInit(): void {
      
      this.myForm.get('idSection')!.valueChanges;
      this.areaComunService.getTipoArea().subscribe({
        next: (resp) => {
          this.tipoArea = resp;
        },
        error: (err) => {
          console.error('Error al cargar tipo de areas:', err);
        }
      });
      this.seccionService.getSeccion().subscribe({
        next: (resp) => {
          this.seccion = resp;
        },
        error: (err) => {
          console.error('Error al cargar las secciones:', err);
        }
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
        }
      }
      return null;
     }
  
  
    onSave(): void {
      if (this.myForm.invalid) return;
      const areaComun: AreaComunCreate = this.myForm.value;
      this.areaComunService.createAreaComun(areaComun).subscribe({
        next: () => {
          this.areaComunCreada.emit(); // notifica al padre
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
      this.myForm.reset({ idSection: '1', idTypeArea: '1' });
     }

}
