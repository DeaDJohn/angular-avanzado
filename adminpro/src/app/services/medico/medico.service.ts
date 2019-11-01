import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from '../../models/medico.model';

@Injectable()
export class MedicoService {

    totalMedicos: number = 0;
    

    constructor(
        public _usuarioService: UsuarioService,
        public http: HttpClient
    ) { }

  cargarMedicos() {
      let url = URL_SERVICIO + '/medico';

      return this.http.get( url )
          .map( (resp: any) => {
              this.totalMedicos = resp.total;
              return resp.medicos;
          });
  }
    cargarMedico( id: string) {
        let url = URL_SERVICIO + '/medico/' + id;
        return this.http.get( url )
            .map( (resp: any) => resp.medico);

    }
    buscarMedicos( termino: string) {
        let url = URL_SERVICIO + '/busqueda/coleccion/medicos/' +termino;
        return this.http.get( url )
        .map( (resp: any) => resp.medicos );
    }
    borrarMedico( id: string) {
            let url = URL_SERVICIO + '/medico/' + id;
            url += '?token=' + this._usuarioService.token;
    
            return this.http.delete( url )
                .map( resp => {
                    swal( 'Médico borrado', 'El médico ha sido elminiado correctamente', 'success');
                    return true;
                })
    }

    guardarMedico( medico: Medico ){
        
        let url = URL_SERVICIO + '/medico';

        if( medico._id){
            // Actualizando
            url += '/' + medico._id;
            url += '?token=' + this._usuarioService.token;

            return this.http.put( url, medico)
                .map( (resp: any )=> {
                    swal('Médico actualizado', medico.nombre, 'success');
                    return resp.medico;
                })
        }else{
            // Creando
            url += '?token=' + this._usuarioService.token;
    
            return this.http.post( url, medico)
                .map( ( resp: any ) =>{
                    swal('Médico creado', medico.nombre, 'success');
                    return resp.medico;
                })
        }



    }
}
