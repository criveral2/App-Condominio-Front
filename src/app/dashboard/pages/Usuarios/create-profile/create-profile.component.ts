import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../../../service/role.service';
import { ClientService } from '../../../service/client.service';
import { RoleType } from '../../../interfaces/usuario/tipo-usuario.interfaces';
import { User } from '../../../../auth/interfaces';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrl: './create-profile.component.css'
})
export class CreateProfileComponent implements OnInit {
  
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @Output() usuarioCreado = new EventEmitter<void>();


  private fb               = inject( FormBuilder );
  private tipoRolesService = inject( RoleService );
  private clientService    = inject( ClientService ) ;

  public tipoUsuario: RoleType | undefined;
  constructor( ) { }

  ngOnInit(): void {
  this.myForm.get('idTypeUser')!.valueChanges;

  this.tipoRolesService.getTipoUsuario().subscribe({
    next: (resp) => {
      this.tipoUsuario = resp;
    },
    error: (err) => {
      console.error('Error al cargar roles:', err);
    }
  });
  
  }
  public myForm: FormGroup = this.fb.group({
    name: [ '', [Validators.required, Validators.minLength(3)], [] ],
    username: [ '', [Validators.required], [] ],
    password: [ '', [ Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/)]],
    email: [ '', [Validators.required], [] ],
    ci: [ '', [Validators.required], [] ],
    phone: [ '', [Validators.required], [] ],
    idTypeUser: [ '1', [Validators.required], [] ],
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
          return 'Debe tener al menos 8 caracteres, una mayúscula y un caracter especial';
        case 'passwordMismatch':
          return 'Las contraseñas no coinciden';
      }
    }
    return null;
   }


  onSave(): void {
    if (this.myForm.invalid) return;
    const usuario: User = this.myForm.value;
    this.clientService.createUser(usuario).subscribe({
      next: () => {
        this.usuarioCreado.emit(); // notifica al padre
        Swal.fire('Éxito', 'Usuario creado correctamente', 'success');
        this.myForm.reset({ idTypeUser: '1' });
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
