import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: "app-incrementador",
  templateUrl: "./incrementador.component.html"
})
export class IncrementadorComponent implements OnInit {
  @Input('nombre') leyenda: string = "Leyenda";
  @Input() progreso: number = 50;

  @Output('actualizaValor') cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {
    console.log('Leyenda', this.leyenda);
    console.log("Progreso", this.progreso);
  }

  ngOnInit() {
    console.log('Leyenda', this.leyenda);
    console.log("Progreso", this.progreso);
  }

  cambiarValor(valor) {
    if (this.progreso >= 100 && valor > 0) {
      this.progreso = 100;
      return;
    } else if (this.progreso <= 0 && valor < 0) {
      this.progreso = 0;
      return;
    } else {
      this.progreso = this.progreso + valor;
      this.cambioValor.emit(this.progreso);
    }
  }
}
