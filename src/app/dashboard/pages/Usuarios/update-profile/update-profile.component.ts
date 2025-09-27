import { Component, EventEmitter, inject, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { RoleService } from '../../../service/role.service';
import { ClientService } from '../../../service/client.service';
import { RoleType } from '../../../interfaces/usuario/tipo-usuario.interfaces';
import { UpdateUser, UpdateUserData } from '../../../interfaces/usuario/update-user.interfaces';
import { User } from '../../../../auth/interfaces';



@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css'
})
export class UpdateProfileComponent implements OnInit{
    @Input() isOpenUpdateProfile = false;
    @Input() usuario: User | undefined;
    @Output() close = new EventEmitter<void>();
    @Input() soloLectura: boolean = false;
  
  
    private fb               = inject( FormBuilder );
    private tipoRolesService = inject( RoleService );
    private clientService    = inject( ClientService ) ;
    private updateUser : UpdateUserData | undefined;
  
    public tipoUsuario: RoleType | undefined;
    constructor( ) {}
  
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

    // 👀 Cuando cambie el input usuario
    ngOnChanges(changes: SimpleChanges): void {
      if (changes['usuario'] && this.usuario) {
        this.myForm.patchValue({
          name: this.usuario.name,
          username: this.usuario.usename,   // ojo aquí, en el JSON viene como "usename"
          email: this.usuario.email,
          ci: this.usuario.ci,
          phone: this.usuario.phone// puedes mapearlo a un ID si viene como string
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


    public myForm: FormGroup = this.fb.group({
      name: [ '', [Validators.required, Validators.minLength(3)], [] ],
      username: [ '', [Validators.required], [] ],
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
        }
      }
      return null;
     }
  
  @Output() usuarioActualizado = new EventEmitter<void>();
  
  onUpdate(): void {
   
    if (this.myForm.invalid) return;
    if (!this.usuario) return;

    // buscar el rol por id
    const rol = this.tipoUsuario?.data?.find( r => r.id == this.myForm.value.idTypeUser );
  
     // Mapear FormGroup a UpdateUserData
    this.updateUser = {
      idUser: this.usuario.idUser, // conservar el id original
      name: this.myForm.value.name,
      usename: this.myForm.value.username,
      email: this.myForm.value.email,
      phone: this.myForm.value.phone,
      typeUser: rol ? rol.permission : '',
      warnings: null,
      roleAssignation: null,
      ci: this.myForm.value.ci
    };
  
    this.clientService.updateUser(this.updateUser).subscribe({
      next: () => {
        this.usuarioActualizado.emit(); // notifica al padre
        Swal.fire('Éxito', 'Usuario actualizado correctamente', 'success');
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
