import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO } from '../../config/config';

import 'rxjs/add/operator/map';

@Injectable({})
export class UsuarioService {

    usuario: Usuario;
    token: string;

  constructor(
    public http: HttpClient
  ) {
    console.log('Servicio de usuario listo');
  }

    loginGoogle( token: string){

        let url = URL_SERVICIO + '/login/google';

        return this.http.post( url, { token  })
            .map( (resp: any) => {
                this.guardarStorage( resp.id, resp.token, resp.usuario);
                return true;
            });

    }

    guardarStorage( id: string, token: string, usuario: Usuario) {
        localStorage.setItem('id', id);
        localStorage.setItem('token', token);
        localStorage.setItem('usuario', JSON.stringify(usuario) );

        this.usuario = usuario;
        this.token = token;
    }


  login( usuario: Usuario, recordar: boolean = false ) {

    if ( recordar ) {
        localStorage.setItem('email', usuario.email);
    } else {
        localStorage.removeItem('email');
    }


    let url = URL_SERVICIO + '/login';

    return this.http.post( url, usuario)
    .map( (resp: any) => {
        // localStorage.setItem('id', resp.id);
        // localStorage.setItem('token', resp.token);
        // localStorage.setItem('usuario', JSON.stringify(resp.usuario) );
        this.guardarStorage( resp.id, resp.token, resp.usuario);
        return true;
    });
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
