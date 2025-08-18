import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPagesComponent } from './pages/login-pages/login-pages.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';


@NgModule({
  declarations: [
    LoginPagesComponent,
    RegisterPageComponent,
    AuthLayoutComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
     ReactiveFormsModule,
  ]
})
export class AuthModule { }
