import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [


  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: 'general', component: DashboardComponent, data: { title: 'General' }},
      { path: 'residentes', component: ProfileComponent, data: { title: 'Residentes' }},
      { path: '**', redirectTo: 'general'}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
