import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { User } from '../../../../auth/interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../../../service/role.service';
import { ClientService } from '../../../service/client.service';
import { UpdateUserData } from '../../../interfaces/usuario/update-user.interface';
import { RoleType } from '../../../interfaces/usuario/tipo-usuario.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.css'
})
export class UpdatePasswordComponent {
    @Input() isOpenUpdatePasswordProfile = false;
    @Input() usuario: User | undefined;
    @Output() close = new EventEmitter<void>();
    @Output() usuarioActualizado = new EventEmitter<void>();
  
    private fb = inject( FormBuilder );
    public tipoUsuario: RoleType | undefined;
    constructor( ) { console.log("Constructor Update Password", this.usuario); }
  

    // 👀 Cuando cambie el input usuario
    ngOnChanges(changes: SimpleChanges): void {
      if (changes['usuario'] && this.usuario) {
        this.myForm.patchValue({
          name: this.usuario.name,
          username: this.usuario.usename,   // ojo aquí, en el JSON viene como "usename"
        });
      }
    }

  public myForm: FormGroup = this.fb.group({
    password: [ '', [ Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/)]],
    repeatPassword: ['', [Validators.required, this.matchPasswordValidator.bind(this)]], 
  });   // << validador extra
  

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

  // Validador personalizado para confirmar contraseña
  matchPasswordValidator(control: any) {
    if (!this.myForm) return null; // para evitar error antes de inicializar
    const password = this.myForm.get('password')?.value;
    if (control.value !== password) {
      return { passwordMismatch: true };
    }
    return null;
  }

  
  onUpdate(): void {
     console.log("Actualizar Contraseña 1");
    if (this.myForm.invalid) return;
    if (!this.usuario) return;
    console.log("USUARIO A ACTUALIZAR Constraseña", this.usuario);
     this.myForm.reset();
     this.close.emit();

  }
  
  onClose() {
  this.close.emit();
  this.myForm.reset();
  }
  

}
