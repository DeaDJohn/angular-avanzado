import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  constructor( public _ajustes: SettingsService
	) { }

  ngOnInit() { this.colocarCheck(); }


  cambiarColor( tema: string, link: any ){
	//   console.log(link);
	
	  this.aplicarCheck(link);
	  this._ajustes.aplicarTema(tema);
  }

  aplicarCheck( link: any){
	// seleccionar los elementos
	let selectores : any = document.getElementsByClassName('selector');

	for( let ref of selectores ){
		// se eliminan de todos los elementos la clase working
		ref.classList.remove('working');
	}
	// se añade la clase working al elemento que tenga el nombre del link
	link.classList.add('working')

  }

	colocarCheck() {
		// seleccionar los elementos
		let selectores: any = document.getElementsByClassName("selector");
		// obtenemos el nombre del tema
		let tema = this._ajustes.ajustes.tema;
		for (let ref of selectores) {
			// el elemento que tenga el nombre del tema en el data-theme
			if (ref.getAttribute("data-theme") === tema) {
				// se añade la clase working
				ref.classList.add("working");
				// se rompe el bucle
				break;
			}
		}
	}
}
