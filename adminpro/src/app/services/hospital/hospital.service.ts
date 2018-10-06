import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO } from '../../config/config';

import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class HospitalService {
    token: string;
    hospital: Hospital;
    
    constructor(
        public http: HttpClient,
        public router: Router,
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

        return this.http.get( url );

    }
    obtenerHospital( id: string){

        let url = URL_SERVICIO + '/hospital?id=' +id;

        return this.http.get( url );
    }

    borrarHospital( id: string){
		let url = URL_SERVICIO + '/hospital/' + id;
		url += '?token=' + this.token;

		return this.http.delete( url )
			.map( resp => {
				swal( 'hospital borrado', 'El hospital ha sido elminiado correctamente', 'success');
				return true;
			})
    }

    crearHospital( hospital: Hospital) {

		let url = URL_SERVICIO + '/hospital';

		return this.http.post( url, hospital )
		.map( (resp: any) => {
			swal( 'Hospital creado', hospital.nombre, 'success');
			return resp.hospital;
		});
    }
    
    actualizarHospital( hospital: Hospital) {

		let url = URL_SERVICIO + '/hospital/' + hospital._id;
		url += '?token=' + this.token;

		return this.http.put( url, hospital )
				.map( (resp: any) => {

					if ( hospital._id === this.hospital._id) {
						let hospitalDB: Hospital = resp.hospital;
						this.guardarStorage( hospitalDB._id, this.token, hospitalDB);
					}

					
					swal('Usuario actualizado', hospital.nombre, 'success');

					return true;
				})
    }

    buscarHospitales( termino: string){
		let url = URL_SERVICIO + '/busqueda/coleccion/hospitales/' +termino;
		return this.http.get( url )
		.map( (resp: any) => resp.hospital );
	}
    
}
