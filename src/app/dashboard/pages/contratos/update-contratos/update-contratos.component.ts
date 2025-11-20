import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AreaComun, AreaComunCreate, AreaComunData } from '../../../interfaces/area-comun/area-comun.interface';
import { AreaComunService } from '../../../service/area-comun.service';
import { TipoArea, TipoAreaData } from '../../../interfaces/area-comun/tipo-area.interface';
import Swal from 'sweetalert2';
import { SeccionService } from '../../../service/seccion.service';
import { Seccion } from '../../../interfaces/seccion/seccion.interface';
import { ContratoData, CreateContrato, UpdateContratoData } from '../../../interfaces/contrato/contrato.interface';
import { ContratoService } from '../../../service/contrato.service';
import { TipoContrato, TipoContratoData } from '../../../interfaces/contrato/tipo-contrato.interface';

@Component({
  selector: 'app-update-contratos',
  templateUrl: './update-contratos.component.html',
  styleUrl: './update-contratos.component.css'
})
export class UpdateContratosComponent {
  @Input() isOpenUpdateContrato = false;
  @Output() close = new EventEmitter<void>();
  @Input() soloLectura: boolean = false;
  @Output() contratoActualizado = new EventEmitter<void>();
  @Input() contrato: ContratoData | undefined;



  private fb = inject(FormBuilder);
  private contratoService = inject(ContratoService);
  public tipoArea: TipoArea | undefined;
   public tipoContratos: TipoContratoData[] = [];
  public updateContrato: CreateContrato | undefined;

  public myForm: FormGroup = this.fb.group({
    signatureDate: [1, [Validators.required]],
    endDate: [1, [Validators.required]],
    amount: [1, [Validators.required, Validators.min(1)]],
    idType: [1, [Validators.required]],
  });

  constructor() { }

  ngOnInit(): void {
    this.myForm.get('idType')!.valueChanges;
    this.contratoService.getTipoContrato().subscribe({
      next: (resp) => {
        this.tipoContratos = resp.data;
      },
      error: (err) => {
        console.error('Error al cargar las secciones:', err);
      }
    });
  }

  // 👀 Cuando cambie el input usuario
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contrato'] && this.contrato) {
      this.myForm.patchValue({
        idType: this.tipoContratos?.find(r => r.id == this.contrato?.contractType)?.id || '1', // buscar el id del tipo de area por su type;
        signatureDate: this.contrato.contractSignatureDate,
        endDate: this.contrato.contractEndDate,
        amount: this.contrato.contractAmount,
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
        case 'min':
          return `El valor debe ser mayor o igual a ${errors['min'].min}`;
      }
    }
    return null;
  }



  onUpdate(): void {
    if (this.myForm.invalid) return;

    // Mapear FormGroup a UpdateAreaComun
    this.updateContrato = {
      ...this.myForm.value,
      idProperty: this.contrato?.contractProperty, // conservar el id original
    };

    this.contratoService.updateContrato(this.updateContrato, this.contrato!.id).subscribe({
      next: () => {
        this.contratoActualizado.emit(); // notifica al padre
        Swal.fire('Éxito', 'Contrato actualizado correctamente', 'success');
        this.myForm.reset({ idType: '1' });
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
