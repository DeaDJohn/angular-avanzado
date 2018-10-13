import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIO } from '../../config/config';

@Injectable()
export class MedicoService {

    totalMedicos: number = 0;

  constructor(
    public http: HttpClient
  ) { }

  cargarMedico() {
      let url = URL_SERVICIO + '/medico';

      return this.http.get( url )
          .map( (resp: any) => {
              this.totalMedicos = resp.total;
              return resp.medicos;
          });
  }
    buscarMedicos( termino: string) {
        let url = URL_SERVICIO + '/busqueda/coleccion/medicos/' +termino;
        return this.http.get( url )
        .map( (resp: any) => resp.medicos );
    }
}
