import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
// Rutas
import {APP_ROUTES} from './app.routes';

// Modulos Temporal
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// Componentes
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './login/register.component';
import {ChartsModule} from 'ng2-charts';
import {PagesComponent} from './pages/pages.component';

// Servicios
import {ServiceModule} from './services/service.module';
import {ShareModule} from './shared/share.module';

@NgModule({
    declarations: [
        AppComponent, LoginComponent, RegisterComponent, PagesComponent
    ],
    imports: [
        BrowserModule,
        APP_ROUTES,

        ShareModule,
        FormsModule,
        ReactiveFormsModule,
        ServiceModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}