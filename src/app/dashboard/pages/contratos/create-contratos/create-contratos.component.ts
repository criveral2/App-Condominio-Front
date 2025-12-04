import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { User } from '../../../../auth/interfaces';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { PropiedadData } from '../../../interfaces/Propiedad/propiedad.interface';
import Swal from 'sweetalert2';
import { ContratoService } from '../../../service/contrato.service';
import { TipoContratoData } from '../../../interfaces/contrato/tipo-contrato.interface';
import { CreateContrato } from '../../../interfaces/contrato/contrato.interface';
import { ClientService } from '../../../service/client.service';

@Component({
  selector: 'app-create-contratos',
  templateUrl: './create-contratos.component.html',
  styleUrl: './create-contratos.component.css'
})
export class CreateContratosComponent {
  @Input() isOpenCreateContrato = false;
  @Input() propiedad: PropiedadData | undefined;
  @Output() close = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private contratoService = inject(ContratoService);
  public tipoContratos: TipoContratoData[] = [];
   private clientService = inject(ClientService);
   public usuarios: User[] = [];

  constructor() { }

  ngOnInit(): void {
    this.myForm.get('idType')!.valueChanges;
    this.contratoService.getTipoContrato().subscribe({
      next: (resp) => {
        this.tipoContratos = resp.data;
      },
      error: (err) => console.error('Error cargando tipos', err)
    });
    this.cargaResidentes();
  }
  ngOnChanges(): void {
    if (this.propiedad) {
      this.myForm.reset({
        idType: 1
      });
    }
  }

  public myForm: FormGroup = this.fb.group({
    signatureDate: [1, [Validators.required]],
    endDate: [1, [Validators.required]],
    amount: [1, [Validators.required, Validators.min(1)]],
    idType: [1, [Validators.required]],
    idUser: [null, [Validators.required]]
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
    if (!this.propiedad) return;
    const contrato: CreateContrato = {
      ...this.myForm.value,    // ← lo que viene del formulario
      idProperty: this.propiedad.id
    };

    this.contratoService.createContrato(contrato).subscribe({
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

  cargaResidentes() {
    this.clientService.getUsers().subscribe({
      next: (resp) => {
        this.usuarios = resp.data;
        this.usuarios.sort((a, b) => b.idUser - a.idUser);
      },
      error: (err) => {
        console.error('Error al cargar roles:', err);
      }
    });
  }

  onClose() {
    this.close.emit();
    this.myForm.reset();
  }
}
