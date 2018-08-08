
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Rutas
import { APP_ROUTES } from './app.routes';


// Modulos
import { PagesModule } from './pages/pages.module';

// Temporal 
import { FormsModule } from "@angular/forms";


// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from "./login/register.component";
import { ChartsModule } from "ng2-charts";

//Servicios
import { ServiceModule } from './services/service.module';


@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    FormsModule,
    ChartsModule,
    ServiceModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
