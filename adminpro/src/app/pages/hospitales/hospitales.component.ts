import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
    hospitales: Hospital[] = [];
    desde: number = 0;

    totalRegistros: number = 0;

    cargando: boolean = true;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();

    this._modalUploadService.notificacion.subscribe( resp => this.cargarHospitales());
  }
    cargarHospitales(){

        this.cargando = true;

        this._hospitalService.cargarHospitales( this.desde )
            .subscribe( (resp: any) => {
                this.totalRegistros = resp.total;
                this.hospitales = resp.hospitales;
                this.cargando = false;
            })
    }
    cambiarDesde( valor: number ){

        let desde = this.desde + valor;

        if(desde >= this.totalRegistros ){
            return;
        }
        if( desde < 0){
            return;
        }

        this.desde += valor;
        this.cargarHospitales();
    }
    buscarHospital( termino: string ){

        if( termino.length <= 0){
            this.cargarHospitales();
            return;
        }
        this.cargando = true;

        this._hospitalService.buscarHospitales( termino )
            .subscribe( (hospitales: Hospital[] ) => {
                this.hospitales = hospitales;
                this.cargando = false;
            })
    }

    borrarHospital( hospital: Hospital){

        if ( hospital._id === this._hospitalService.hospital._id ) {
            swal( 'No puede borrar hospital', 'No se puede borrar a si mismo', 'error');
            return;
        }

        swal({
            title: '¿Estas seguro?',
            text: 'Esta a punto de borrar a ' + hospital.nombre,
            icon: 'warning',
            buttons: ["No", "Si"],
            dangerMode: true,
        })
        .then( borrar => {
            if ( borrar ) {
                this._hospitalService.borrarHospital( hospital._id )
                    .subscribe( resp => {
                        this.cargarHospitales();
                    });
            }
        });
    }
    guardarHospital( hospital: Hospital) {

        this._hospitalService.actualizarHospital( hospital )
            .subscribe();
    }

}
