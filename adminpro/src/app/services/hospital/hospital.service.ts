import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO } from '../../config/config';

import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class HospitalService {
    token: string;
	hospital: Hospital;
	
	totalHospitales: number = 0;
    
    constructor(
        public http: HttpClient,
		public router: Router,
		public _usuarioService: UsuarioService
    ) { 
        this.cargarStorage();
    }

    cargarStorage() {
		if ( localStorage.getItem('token') ) {
			this.token = localStorage.getItem('token');
			this.hospital = JSON.parse(localStorage.getItem('hospital'));
		} else {
			this.token = '';
			this.hospital = null;
		}
	}

	guardarStorage( id: string, token: string, hospital: Hospital) {
		localStorage.setItem('id', id);
		localStorage.setItem('token', token);
		localStorage.setItem('hospital', JSON.stringify(hospital) );

		this.hospital = hospital;
		this.token = token;
	}

    cargarHospitales( desde: number = 0 ) {

        let url = URL_SERVICIO + '/hospital?desde=' +desde;

		return this.http.get( url )
		.map( (resp: any) => {

			this.totalHospitales = resp.total;
			return resp.hospitales
		});

    }
    obtenerHospital( id: string){

		let url = URL_SERVICIO + '/hospital/' + id;

		return this.http.get( url )
					.map( (resp: any) => resp.hospital);
    }

    borrarHospital( id: string){
		let url = URL_SERVICIO + '/hospital/' + id;
		url += '?token=' + this._usuarioService.token;

		return this.http.delete( url )
			.map( resp => {
				swal( 'hospital borrado', 'El hospital ha sido elminiado correctamente', 'success');
				return true;
			})
    }

    crearHospital( nombre: string) {

		let url = URL_SERVICIO + '/hospital';
		url += '?token=' + this._usuarioService.token;

		return this.http.post( url, {nombre: nombre} )
			.map( (resp: any) => {
				swal( 'Hospital creado', nombre, 'success');
				return resp.hospital;
			});
    }
    
    actualizarHospital( hospital: Hospital) {

		let url = URL_SERVICIO + '/hospital/' + hospital._id;
		url += '?token=' + this._usuarioService.token;

		return this.http.put( url, hospital )
				.map( (resp: any) => {
					swal( 'Hospital actualizado', hospital.nombre, 'success');
					return resp.hospital;
				} );
    }

    buscarHospitales( termino: string){
		let url = URL_SERVICIO + '/busqueda/coleccion/hospitales/' +termino;
		return this.http.get( url )
			.map( (resp: any) => resp.hospitales );
	}
    
}
