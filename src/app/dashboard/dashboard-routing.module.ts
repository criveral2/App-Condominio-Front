import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PersonalProfileComponent } from './pages/Usuarios/personal-profile/personal-profile.component';
import { AreasComunesComponent } from './pages/areas-comunes/areas-comunes/areas-comunes.component';
import { ActivoComponent } from './pages/activos/activo/activo.component';
import { SeccionComponent } from './pages/secciones/seccion/seccion.component';
import { RoleGuard } from './guards/role.guard';
import { ConceptoComponent } from './pages/concepto/concepto/concepto.component';

const routes: Routes = [


  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: 'general', component: DashboardComponent, data: { title: 'General' }, canActivate: [ RoleGuard ] },
      { path: 'residentes', component: ProfileComponent, data: { title: 'Residentes' }, canActivate: [ RoleGuard ] },
      { path: 'perfil', component: PersonalProfileComponent, data: { title: 'perfil' }},
      { path: 'areacomun', component: AreasComunesComponent, data: { title: 'Areas Comunes' }, canActivate: [ RoleGuard ] },
      { path: 'activos', component: ActivoComponent, data: { title: 'Activos' }, canActivate: [ RoleGuard ] },
      { path: 'secciones', component: SeccionComponent, data: { title: 'Secciones' }, canActivate: [ RoleGuard ] },
      { path: 'concepto', component: ConceptoComponent, data: { title: 'Concepto' }, canActivate: [ RoleGuard ] },
      { path: '**', redirectTo: 'general'}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
