import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { ProfileComponent } from './profile/profile.component';



const pageRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [ LoginGuardGuard ],
    children: [
      { path: 'dashboard', component: DashbordComponent, data: {
          titulo: 'Dashboard',
          description: 'Página creada por JJ Fernandez con Angular 6',
          custom: 'Texto custom para analitica'
      } },
      { path: 'progress', component: ProgressComponent, data: {
          titulo: 'Progress',
          description: 'Página creada por JJ Fernandez con Angular 6',
          custom: 'Texto custom para analitica'
      } },
      { path: 'graficas1', component: Graficas1Component, data: {
          titulo: 'Gráficas',
          description: 'Página creada por JJ Fernandez con Angular 6',
          custom: 'Texto custom para analitica'
      } },
      { path: 'promesas', component: PromesasComponent, data: {
          titulo: 'Promesas',
          description: 'Página creada por JJ Fernandez con Angular 6',
          custom: 'Texto custom para analitica'
      } },
      { path: 'rxjs', component: RxjsComponent, data: {
          titulo: 'RxJS',
          description: 'Página creada por JJ Fernandez con Angular 6',
          custom: 'Texto custom para analitica'
      } },
      { path: 'account-settings', component: AccountSettingsComponent, data: {
          titulo: 'Ajustes del Tema',
          description: 'Página creada por JJ Fernandez con Angular 6',
          custom: 'Texto custom para analitica'
      } },
      { path: 'profile', component: ProfileComponent, data: {
        titulo: 'Perfil Usuario',
        description: 'Página creada por JJ Fernandez con Angular 6',
        custom: 'Texto custom para analitica'
    } },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    ],
  },
];


export const PAGES_ROUTES = RouterModule.forChild( pageRoutes );
