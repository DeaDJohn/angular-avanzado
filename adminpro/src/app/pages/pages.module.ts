import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { PagesComponent } from './pages.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';

import { ShareModule } from '../shared/share.module';
import { PAGES_ROUTES } from './pages.routes';

//Temporal
import { IncrementadorComponent } from "../components/incrementador/incrementador.component";


@NgModule({
  declarations: [
    DashbordComponent,
    ProgressComponent,
    Graficas1Component,
    PagesComponent,
    IncrementadorComponent
  ],
  exports: [
    DashbordComponent,
    ProgressComponent,
    Graficas1Component,
    PagesComponent
  ],
  imports: [ShareModule, PAGES_ROUTES, FormsModule]
})
export class PagesModule {}
