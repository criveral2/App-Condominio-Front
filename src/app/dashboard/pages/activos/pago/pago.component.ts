import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { User } from '../../../../auth/interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { minDateValidator } from '../../../validators/validator-date';
import { AuthService } from '../../../../auth/services/auth.service';
import { Pago, PagoData } from '../../../interfaces/Pago/pago.interface';
import { PagoService } from '../../../service/pago.service';
import Swal from 'sweetalert2';
import { ConceptoService } from '../../../service/concepto.service';
import { Concepto } from '../../../interfaces/concepto/concepto.interface';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrl: './pago.component.css'
})
export class PagoComponent {
  @Input() isOpenPago = false;
  @Input() usuario: User | null | undefined;
  @Output() close = new EventEmitter<void>();

  public today: string = new Date().toISOString().split('T')[0];
  private authService = inject(AuthService);
  private pagoService = inject(PagoService);
  private conceptoService = inject(ConceptoService);
  private fb = inject(FormBuilder);
  public conceptos: Concepto | undefined;

  constructor() { }

  ngOnInit(): void {
    this.conceptoService.getConcepto().subscribe({
      next: (resp) => {
        this.conceptos = resp;
      },
      error: (err) => {
        console.error('Error al cargar tipo de areas:', err);
      }
    });


  }

  public myForm: FormGroup = this.fb.group({
    idConcept: [1, [Validators.required]],
    detail: ['', [Validators.required, Validators.minLength(8)]],
    amount: ['1.00', [Validators.required, Validators.min(1)]],
    date: ['', [Validators.required]],
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
        case 'minDate': // tu validador personalizado
          return 'La fecha debe ser mayor o igual a hoy';
      }
    }
    return null;
  }

  get usuarioVendedor(): User | null {
    return this.authService.currentUser(); // se obtiene dinámicamente del signal
  }

  onUpdate(): void {
    if (this.myForm.invalid) return;
    if (!this.usuario) return;
    if (!this.usuarioVendedor) return;

    // Mapear FormGroup a UpdateUserData
    const pagoData: any = {
      ...this.myForm.value, // copia todos los campos del formulario
      idUserPays: this.usuario.idUser,
      idUserReceives: this.usuarioVendedor.idUser
    };

    this.pagoService.createPago(pagoData).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Activo creado correctamente', 'success');
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
    this.myForm.reset({ amount: '1' });
  }





}
