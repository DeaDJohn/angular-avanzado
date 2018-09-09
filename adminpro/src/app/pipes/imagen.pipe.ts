import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIO } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {
// por defecto sera un usuario
  transform(img: string, tipo: string = 'usuario'): any {

    let url = URL_SERVICIO + '/img';

    if ( !img ) {
      return url + '/usuarios/xxx';
    }
    if ( img.indexOf('https') >= 0 ) {
      return img;
    }
    switch ( tipo ) {
      case 'usuario':
          url += '/usuario/' + img;
      break;

      case 'medico':
        url += '/medicos/' + img;
      break;

      case 'hospital':
        url += '/hospitales/' + img;
      break;

      default:
        console.log('tipo de imagen no existe, usuarios, medicos u hospitales');
        url += '/usuarios/xxx';
    }

    return url;
  }

}
