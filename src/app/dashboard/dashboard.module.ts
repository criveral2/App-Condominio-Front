import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TablesComponent } from './pages/tables/tables.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CreateProfileComponent } from './pages/create-profile/create-profile.component';
import { NgxPaginationModule } from 'ngx-pagination';


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
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    NgxPaginationModule,
  ]
})
export class DashboardModule { }
