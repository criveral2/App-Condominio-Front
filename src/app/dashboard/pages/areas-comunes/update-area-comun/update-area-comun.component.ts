import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AreaComun, AreaComunCreate, AreaComunData } from '../../../interfaces/area-comun/area-comun.interface';
import { AreaComunService } from '../../../service/area-comun.service';
import { TipoArea, TipoAreaData } from '../../../interfaces/area-comun/tipo-area.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-area-comun',
  templateUrl: './update-area-comun.component.html',
  styleUrl: './update-area-comun.component.css'
})
export class UpdateAreaComunComponent {
  @Input() isOpenUpdateAreaComun = false;
  @Output() close = new EventEmitter<void>();
  @Input() soloLectura: boolean = false;
  @Output() areaComunActualizado = new EventEmitter<void>();
  @Input() areacomun : AreaComunData | undefined;
  @Output() areacomunUpdate : AreaComunCreate | undefined;
  
  
  
  private fb               = inject( FormBuilder );
  private areaComunService = inject( AreaComunService );
  public tipoArea : TipoArea | undefined;
  public seccion : TipoArea | undefined;

  public myForm: FormGroup = this.fb.group({
        description: [ '', [Validators.required, Validators.minLength(10)], [] ],
        idSection: [ '1', [Validators.required], [] ],
        idTypeArea: [ '1', [Validators.required], [] ],
  });
  
  constructor( ) {}
  
  ngOnInit(): void {
    this.myForm.get('idSection')!.valueChanges;
    this.myForm.get('idTypeArea')!.valueChanges;
    this.areaComunService.getTipoArea().subscribe({
      next: (resp) => {
        this.tipoArea = resp;
        this.seccion = resp;
      },
      error: (err) => {
        console.error('Error al cargar tipo de areas:', err);
      }
    });
  }

    // 👀 Cuando cambie el input usuario
    ngOnChanges(changes: SimpleChanges): void {
      if (changes['areacomun'] && this.areacomun) {
        this.myForm.patchValue({
          description: this.areacomun.commonAreaDescription,   // ojo aquí, en el JSON viene como "area comun"
          idSection: this.areacomun.commonAreaSection,
          idTypeArea: this.tipoArea?.data?.find( r => r.type == this.areacomun?.commonAreaTypeArea)?.id || '1' // buscar el id del tipo de area por su type;
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
    if (!this.areacomun) return;

    // buscar el rol por id
    const seccion = this.tipoArea?.data?.find( r => r.id == this.myForm.value.idSection);
    const tipoArea = this.tipoArea?.data?.find( r => r.id == this.myForm.value.idTypeArea);
  
     // Mapear FormGroup a UpdateAreaComun
    this.areacomunUpdate = {// conservar el id original
      description: this.myForm.value.description, // conservar el id original
      idSection: seccion ? seccion.id : 0,
      idTypeArea: tipoArea ? String(tipoArea.id) : "0",
    };
  
    this.areaComunService.updateAreaComun(this.areacomunUpdate, this.areacomun.id).subscribe({
      next: () => {
        this.areaComunActualizado.emit(); // notifica al padre
        Swal.fire('Éxito', 'Área común actualizada correctamente', 'success');
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
