
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Rutas
import { APP_ROUTES } from './app.routes';


// Modulos
import { PagesModule } from './pages/pages.module';

// Temporal 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { ChartsModule } from 'ng2-charts';

// Servicios
import { ServiceModule } from './services/service.module';
import { MedicoComponent } from './pages/medicos/medico.component';


@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent, MedicoComponent],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    ServiceModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
