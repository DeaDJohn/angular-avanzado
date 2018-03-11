import {RouterModule, Routes, Router } from '@angular/router';

import { DashbordComponent } from './pages/dashbord/dashbord.component';
import { LoginComponent } from './login/login.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Graficas1Component } from './pages/graficas1/graficas1.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';





const appRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            {path: 'dashboard', component: DashbordComponent},
            {path: 'progess', component: ProgressComponent},
            {path: 'graficas1', component: Graficas1Component},
            {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
        ]
    },
    {path: 'login', component: LoginComponent},
    {path: 'register', component: LoginComponent},
    {path: '**', component: NopagefoundComponent}
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash: true});
