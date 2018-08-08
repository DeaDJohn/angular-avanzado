import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
})
export class PromesasComponent implements OnInit {

    mensaje: string;
    contador: number;
    mensajeShow: boolean;
    constructor() {
        this.mensajeShow = false;
        this.contarTres().then(
            // aqui se mostrará el mensaje que se escriba en el resolve.
            // le he puesto mensaje pero puede ser cualquier nombre
            mensaje => {
                this.mensajeShow = true;
                this.mensaje = 'Terminó ' + mensaje;
            },
        )
        // el error sera el mensaje que escriba en el reject.
        .catch ( error => this.mensaje = 'Error en la promesa ' + error );
  }

  ngOnInit() {
  }

    contarTres() {
        return new Promise( (resolve, reject) => {
            let contador = 0;
            const intervalo = setInterval( () => {
                contador += 1;
                this.contador = contador;
                if ( contador === 3 ) {
                    resolve('OK!!!!');
                    clearInterval(intervalo);
                } else if ( contador > 3 ) {
                    reject('Algo a pasado que te has pasado!!!!');
                    clearInterval(intervalo);
                }
            }, 1000);
        });
    }
}
