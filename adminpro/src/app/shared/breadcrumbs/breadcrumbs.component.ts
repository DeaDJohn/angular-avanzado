import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from '../../../../node_modules/rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  titulo: string;
  description: string;
  custom: string;
  constructor( private router: Router,
              private title: Title,
              private meta: Meta) {
      this.getDataRoute().subscribe( data => {
      // console.log( data );
      this.titulo = data.titulo;
      this.title.setTitle( this.titulo);

      this.description = data.description;
      this.custom = data.custom;


      const metaDescTag: MetaDefinition = {
        name: 'description',
        content: this.description
      };
      const metaCustomTag: MetaDefinition = {
        name: 'custom',
        content: this.custom
      };

      this.meta.updateTag( metaDescTag );
      this.meta.updateTag( metaCustomTag );
    });
  }

  ngOnInit() {
  }


  getDataRoute() {
    return this.router.events.pipe(
      filter( evento => evento instanceof ActivationEnd),
      filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null),
      map( (evento: ActivationEnd) => evento.snapshot.data)
    );
  }

}
