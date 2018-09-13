import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {
  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard' },
        { titulo: 'ProgressBar', url: '/progress' },
        { titulo: 'Gráficas', url: '/graficas1' },
        { titulo: 'RxJS', url: '/rxjs' },
        { titulo: 'Promesas', url: '/promesas' }
      ]
    },
    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folfer-lock-open',
      submenu: [
        { titulo: 'Usuarios', url: '/usuarios'},
        { titulo: 'Hospitales', url: '/hospitales'},
        { titulo: 'Médicos', url: '/medicos'}
      ]
    }
  ];
  constructor() { }

}
