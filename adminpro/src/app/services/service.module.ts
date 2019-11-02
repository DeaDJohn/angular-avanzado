import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsService, SidebarService, AdminGuard, SharedService, UsuarioService, HospitalService, SubirArchivoService, MedicoService } from "./service.index";
import { HttpClientModule } from '@angular/common/http';
import { LoginGuardGuard } from './guards/login-guard.guard';

import { ModalUploadService } from '../components/modal-upload/modal-upload.service';



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [ SettingsService, SidebarService, SharedService, UsuarioService, HospitalService, LoginGuardGuard, AdminGuard, SubirArchivoService, ModalUploadService, MedicoService ],
  declarations: []
})
export class ServiceModule { }
