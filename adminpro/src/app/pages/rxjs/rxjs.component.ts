import { Component, OnInit } from '@angular/core';
import { Observable } from '../../../../node_modules/rxjs';
import { retry } from '../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
})
export class RxjsComponent implements OnInit {

    constructor() {

        let obs = new Observable( observer => {
            let contador = 0;
            let intervalo = setInterval( () => {
                contador += 1;
                observer.next(contador);

                if ( contador === 3) {
                    clearInterval( intervalo );
                    observer.complete();
                }
                if ( contador === 2) {
                    // clearInterval( intervalo );
                    observer.error( 'Auxilio' );
                }
            }, 1000);
        } );

        obs.pipe(
            // con esto se indica las veces que se quiere repetir el observable
            // en el caso de fallar.
            retry(2)
        )
        .subscribe(
            // se acciona en cada intervalo
            numero => console.log( 'Subs', numero),
            // se acciona cuando se llama en el observable error()
            error => console.error('Error en el obs', error),
            // Cuando se llama al metodo del observable complete().
            () => console.log('El observador se terminó')
        );

    }

  ngOnInit() {
  }

}
