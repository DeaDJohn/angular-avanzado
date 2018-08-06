import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
})
export class PromesasComponent implements OnInit {

    constructor() {

        this.contarTres().then(
            // aqui se mostrará el mensaje que se escriba en el resolve.
            // le he puesto mensaje pero puede ser cualquier nombre
            mensaje => console.log('Termino!', mensaje),
        )
        // el error sera el mensaje que escriba en el reject.
        .catch ( error => console.log('Error en la promesa', error ));
  }

  ngOnInit() {
  }

    contarTres() {
        return new Promise( (resolve, reject) => {
            let contador = 0;
            let intervalo = setInterval( () => {
                contador += 1;
                console.log( contador );
                if ( contador === 3 ) {
                    resolve('OK!!!!');
                    clearInterval(intervalo);
                } else if ( contador > 3 ) {
                    reject('Algo a pasado que te has pasado!!!!');
                    clearInterval(intervalo);
                }
            });
        });
    }
}
