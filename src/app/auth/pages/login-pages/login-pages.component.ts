import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login-pages',
  templateUrl: './login-pages.component.html',
  styleUrl: './login-pages.component.css'
})
export class LoginPagesComponent {

  public show: boolean = true;

  private fb          = inject( FormBuilder);
  private authService = inject( AuthService);
  private router      = inject( Router );

  public myForm: FormGroup = this.fb.group({
    username: ['Cmacancelaaa', [Validators.required, Validators.email]], 
    password: ['a12d232dsdS.', [Validators.required]]
  });

  login(){
    const {username, password } = this.myForm.value;
    this.authService.login(username, password)
    .subscribe({
      next: () => this.router.navigateByUrl('/dashboard'),
      error: (message) => {
        Swal.fire('Error', message, 'error')
      }
      
    })
  }






}
