import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';

import { ShareModule } from '../shared/share.module';
import { PAGES_ROUTES } from './pages.routes';


@NgModule({
  declarations: [
    DashbordComponent,
    ProgressComponent,
    Graficas1Component,
    PagesComponent
  ],
  exports: [
    DashbordComponent,
    ProgressComponent,
    Graficas1Component,
    PagesComponent
  ],
  imports: [ShareModule, PAGES_ROUTES]
})
export class PagesModule {}
