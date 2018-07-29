import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { PagesComponent } from './pages.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
// ng2-charts
import { ChartsModule } from 'ng2-charts';
import { ShareModule } from '../shared/share.module';
import { PAGES_ROUTES } from './pages.routes';


//Temporal
import { IncrementadorComponent } from "../components/incrementador/incrementador.component";
import { GraficoDonaComponent } from "../components/grafico-dona/grafico-dona.component";
import { AccountSettingsComponent } from './account-settings/account-settings.component';


@NgModule({
  declarations: [
    DashbordComponent,
    ProgressComponent,
    Graficas1Component,
    PagesComponent,
    IncrementadorComponent,
    GraficoDonaComponent,
    AccountSettingsComponent
  ],
  exports: [
    DashbordComponent,
    ProgressComponent,
    Graficas1Component,
    PagesComponent
  ],
  imports: [ShareModule, PAGES_ROUTES, FormsModule, ChartsModule]
})
export class PagesModule {}
