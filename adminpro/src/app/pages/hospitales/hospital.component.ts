import {Component, OnInit} from '@angular/core';
import {Hospital} from '../../models/hospital.model';
import {Medico} from '../../models/medico.model';
import {MedicoService, HospitalService} from '../../services/service.index';
import {Router, ActivatedRoute} from '@angular/router';
import {ModalUploadService} from '../../components/modal-upload/modal-upload.service';

@Component({selector: 'app-hospital', templateUrl: './hospital.component.html'})
export class HospitalComponent implements OnInit {

	medicos: Medico[] = [];
    hospital : Hospital = new Hospital('');
    constructor(	
		public _medicoService : MedicoService, 
		public _hospitalService : HospitalService, 
		public router : Router, 
		public activatedRoute : ActivatedRoute, 
		public _modalUoloadService : ModalUploadService
	) {
		activatedRoute.params.subscribe( params => {
            let id = params['id'];

            if( id !== 'nuevo' ) {
                this.cargarHospital( id );
            }
        });
	}

    ngOnInit() {
		this._medicoService.cargarMedicos()
			.subscribe( medicos => this.medicos = medicos );
			
		this._modalUoloadService.notificacion
            .subscribe( resp =>{
                this.hospital.img = resp.hospital.img;
			});
			console.log(this.medicos);
	}
	
	cargarHospital( id: string) {
        this._hospitalService.obtenerHospital( id )
            .subscribe( hospital => {
                console.log( hospital );
                
                this.hospital = hospital;
            });
	}
	
	cambiarFoto(){
        this._modalUoloadService.mostarModal( 'hospitales', this.hospital._id);
    }

}
