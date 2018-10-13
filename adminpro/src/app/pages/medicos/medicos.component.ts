import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/service.index';
import { relative } from 'path';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];

  constructor(
    public _medicoService: MedicoService
  ) { }

    ngOnInit() {
        this.cargarMedicos();
    }

    cargarMedicos() {
        this._medicoService.cargarMedico()
        .subscribe(medicos => this.medicos = medicos);
    }

    buscarMedico( termino: string ) {
        if ( termino.length <= 0 ) {
            return;
        }
        this._medicoService.buscarMedicos( termino )
            .subscribe( medicos => this.medicos = medicos );
    }

    crearMedico() {

    }

}
