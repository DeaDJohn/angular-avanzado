import { Injectable } from '@angular/core';
import { URL_SERVICIO } from '../../config/config';



@Injectable()
export class SubirArchivoService {

  constructor() { }


	subirArchivo( archivo: File, tipo: string, id: string ) {

		return new Promise( (resolve, reject ) => {

			let formData = new FormData();
			let xhr = new XMLHttpRequest();
			console.log(archivo);
			formData.append( 'imagen', archivo, archivo.name.toLowerCase() );

			xhr.onreadystatechange = function() {
				if ( xhr.readyState === 4 ) {
					
					if ( xhr.status === 200 ) {
						console.log( 'Imagen subida' );
						resolve( JSON.parse( xhr.response ) );
					} else {
						console.log( 'Fallo la subida' );
						console.log( xhr.response );
						reject( xhr.response );
				}

			}
			};

			let url = URL_SERVICIO + '/upload/' + tipo + '/' + id;

			xhr.open('PUT', url, true );
			xhr.send( formData );

		});
	}

}
