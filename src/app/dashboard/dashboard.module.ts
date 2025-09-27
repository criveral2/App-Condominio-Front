import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { DashboardRoutingModule } from './dashboard-routing.module';
import '@tailwindplus/elements';

import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TablesComponent } from './pages/tables/tables.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CreateProfileComponent } from './pages/Usuarios/create-profile/create-profile.component';
import { UpdateProfileComponent } from './pages/Usuarios/update-profile/update-profile.component';
import { InformacionAdministradorComponent } from './pages/Usuarios/informacion-administrador/informacion-administrador.component';
import { UpdatePasswordComponent } from './pages/Usuarios/update-password/update-password.component';
import { PersonalProfileComponent } from './pages/Usuarios/personal-profile/personal-profile.component';
import { PersonalConfigurationComponent } from './pages/Usuarios/personal-configuration/personal-configuration.component';



@NgModule({
  declarations: [
    DashboardLayoutComponent,
    ProfileComponent,
    TablesComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    CreateProfileComponent,
    UpdateProfileComponent,
    InformacionAdministradorComponent,
    UpdatePasswordComponent,
    PersonalProfileComponent,
    PersonalConfigurationComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule { }
