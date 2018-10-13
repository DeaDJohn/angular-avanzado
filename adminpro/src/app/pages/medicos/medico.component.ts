import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { MedicoService, HospitalService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

    hospitales: Hospital[] = [];
    medico: Medico = new Medico('','','','');
    hospital: Hospital = new Hospital('');

    constructor(
        public _medicoService: MedicoService,
        public _hospitalService: HospitalService
    ) { }

    ngOnInit() {

        this._hospitalService.cargarHospitales()
            .subscribe( hospitales => this.hospitales = hospitales );

            console.log(this.hospitales);
    }

    guardarMedico( f:NgForm ) {
        console.log( f.valid );
        console.log( f.value );

        if( f.invalid ){
            return;
        }

        this._medicoService.guardarMedico( this.medico )
            .subscribe( ( medico ) =>{
                console.log( medico );
            })
    }

    cambioHospital( id: string ){
        
        this._hospitalService.obtenerHospital( id )
            .subscribe( hospital => {
                this.hospital = hospital
                console.log(this.hospital);
            });
    }

}
