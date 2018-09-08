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
    numero: string;
    error: string;
    texto: string;
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
            numero => this.numero = 'Número: ' + numero,
            // se acciona cuando se llama en el observable error()
            error => this.error = error,
            // Cuando se llama al metodo del observable complete().
            () => this.texto = 'El observador se terminó'
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
        map( (resp: any) => {
            return resp.valor;
        }),
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
