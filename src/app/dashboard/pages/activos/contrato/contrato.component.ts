import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { User } from '../../../../auth/interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContratoService } from '../../../service/contrato.service';
import { ContratoUsuario } from '../../../interfaces/contrato/contrato-usuario.interface';


@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrl: './contrato.component.css'
})
export class ContratoComponent {
  @Input() isOpenContrato = false;
  @Input() usuario: User | undefined | null;
  @Output() close = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private contratoService = inject(ContratoService);
  public contratos: ContratoUsuario[] = [];
  constructor() { }

  // 👀 Cuando cambie el input usuario
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['usuario'] && this.usuario) {
      this.cargaContratos(this.usuario.idUser);
    }
  }

  mensajeSinContratos: string | null = null;

cargaContratos(id: number) {
  this.contratoService.getContratosUser(id).subscribe({
    next: (resp) => {

      this.contratos = resp;             // 👈 resp ya es un array de contratos completo
      console.log("Contratos:", this.contratos);

      // Mostrar mensaje si no hay
      this.mensajeSinContratos = this.contratos.length === 0
        ? "Este usuario no tiene contratos registrados."
        : null;
    },
    error: (err) => {
      console.error('Error al cargar contratos:', err);
      this.contratos = [];  
      this.mensajeSinContratos = "No se pudieron cargar los contratos.";
    }
  });
}

  onClose() {
    this.close.emit();
  }

}
