import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO } from '../../config/config';

import 'rxjs/add/operator/map';

@Injectable({})
export class UsuarioService {

  constructor(
    public http: HttpClient
  ) {
    console.log('Servicio de usuario listo');
  }


  crearUsuario( usuario: Usuario) {

    let url = URL_SERVICIO + '/usuario';

    return this.http.post( url, usuario )
    .map( (resp: any) => {
      swal( 'Usuario creado', usuario.email, 'success');
        return resp.usuario;
    });

  }
}