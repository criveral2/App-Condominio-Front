import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login-pages',
  templateUrl: './login-pages.component.html',
  styleUrl: './login-pages.component.css'
})
export class LoginPagesComponent {

  public show: boolean = true;
  private fb = inject( FormBuilder);
  private authService = inject( AuthService);

  public myForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.email]], 
    password: ['', [Validators.required]]
  });

  login(){
    const {username, password } = this.myForm.value;
    this.authService.login(username, password)
    .subscribe( success => {
      console.log(success);
    })
  }






}
