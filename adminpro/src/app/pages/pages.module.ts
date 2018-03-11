import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ShareModule } from '../shared/share.module';


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
        PagesComponent,
    ],
    imports: [
        ShareModule
    ]
})
export class PagesModule {}
