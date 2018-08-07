import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from '../../../../node_modules/rxjs';
import { retry, map, filter } from '../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
})
export class RxjsComponent implements OnInit, OnDestroy {

    // creamos una propiedad de tipo Subscription
    subscription: Subscription;

    constructor() {

        // Guardamos el observable en la propiedad.
        this.subscription = this.regresaObservable()
        // .pipe(
        //     // con esto se indica las veces que se quiere repetir el observable
        //     // en el caso de fallar.
        //     retry(2)
        // )
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

    ngOnDestroy() {
        console.log('La pagina se va a cerrar');
        // utilizando el OnDestroy junto a la propiedad y utilizamos
        // el metodo unsubscribe del observable
        this.subscription.unsubscribe();
    }

  regresaObservable(): Observable<any> {
    return new Observable( observer => {

        let contador = 0;
        const intervalo = setInterval( () => {
            contador += 1;

            let salida = {
                valor: contador
            };

            observer.next(salida);

            // if ( contador === 3) {
            //     clearInterval( intervalo );
            //     observer.complete();
            // }
            // if ( contador === 2) {
            //     // clearInterval( intervalo );
            //     observer.error( 'Auxilio' );
            // }
        }, 1000);
    })
    .pipe(
        map( resp =>  resp.valor ),
        filter( ( valor , index ) => {
            // console.log( valor, index);
            if ( (valor % 2) ) {

                // impar
                return true;
            } else {
                // par
                return false;
            }
        })

    );
  }

}
