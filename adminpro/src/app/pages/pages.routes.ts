import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';



const pageRoutes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      { path: "dashboard", component: DashbordComponent },
      { path: "progess", component: ProgressComponent },
      { path: "graficas1", component: Graficas1Component },
      { path: "", redirectTo: "/dashboard", pathMatch: "full" }
    ]
  }
];


export const PAGES_ROUTES = RouterModule.forChild( pageRoutes );