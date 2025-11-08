import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { DashboardRoutingModule } from './dashboard-routing.module';
import '@tailwindplus/elements';

import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { ProfileComponent } from './pages/profile/profile.component';
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
import { AreasComunesComponent } from './pages/areas-comunes/areas-comunes/areas-comunes.component';
import { CreateAreaComunComponent } from './pages/areas-comunes/create-area-comun/create-area-comun.component';
import { UpdateAreaComunComponent } from './pages/areas-comunes/update-area-comun/update-area-comun.component';
import { ActivoComponent } from './pages/activos/activo/activo.component';
import { ContratoComponent } from './pages/activos/contrato/contrato.component';
import { PagoComponent } from './pages/activos/pago/pago.component';
import { DetalleActivoComponent } from './pages/activos/detalle-activo/detalle-activo.component';
import { SeccionComponent } from './pages/secciones/seccion/seccion.component';
import { SeccionUpdateComponent } from './pages/secciones/seccion-update/seccion-update.component';
import { SeccionCreateComponent } from './pages/secciones/seccion-create/seccion-create.component';
import { ConceptoComponent } from './pages/concepto/concepto/concepto.component';
import { CreateConceptoComponent } from './pages/concepto/create-concepto/create-concepto.component';
import { UpdateConceptoComponent } from './pages/concepto/update-concepto/update-concepto.component';
import { ConceptoPipe } from './pipes/concepto.pipe';



@NgModule({
  declarations: [
    DashboardLayoutComponent,
    ProfileComponent,
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
    AreasComunesComponent,
    CreateAreaComunComponent,
    UpdateAreaComunComponent,
    ActivoComponent,
    ContratoComponent,
    PagoComponent,
    DetalleActivoComponent,
    SeccionComponent,
    SeccionUpdateComponent,
    SeccionCreateComponent,
    ConceptoComponent,
    CreateConceptoComponent,
    UpdateConceptoComponent,
    //pipes
    ConceptoPipe
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
