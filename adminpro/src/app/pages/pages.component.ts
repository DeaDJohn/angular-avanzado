import { Component, OnInit } from '@angular/core';
// Declaramos la funcion que hemos hecho en el custom.js envolviendo a todo el contenido
// para poder llamar a estas inicializaciones.
declare function init_plugins();
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}
