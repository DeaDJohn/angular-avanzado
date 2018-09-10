import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO } from '../../config/config';

import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class UsuarioService {

	usuario: Usuario;
	token: string;

  constructor(
	public http: HttpClient,
	public router: Router
  ) {
	console.log('Servicio de usuario listo');
	this.cargarStorage();
  }

  logout() {
	this.usuario = null;
	this.token = '';
	localStorage.removeItem('token');
	localStorage.removeItem('usuario');
	this.router.navigate(['/login']);
  }

	loginGoogle( token: string) {

		let url = URL_SERVICIO + '/login/google';

		return this.http.post( url, { token  })
			.map( (resp: any) => {
				this.guardarStorage( resp.id, resp.token, resp.usuario);
				return true;
			});

	}

	estaLogueado() {
	  console.log(this.token);
	  return( this.token.length > 5) ? true : false;
	}

	cargarStorage() {
	  if ( localStorage.getItem('token') ) {
		this.token = localStorage.getItem('token');
		this.usuario = JSON.parse(localStorage.getItem('usuario'));
	  } else {
		this.token = '';
		this.usuario = null;
	  }
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

	actualizarUsuario( usuario: Usuario) {

		let url = URL_SERVICIO + '/usuario/' + usuario._id;
		url += '?token=' + this.token;

		console.log(url);

		return this.http.put( url, usuario );

	}
}
