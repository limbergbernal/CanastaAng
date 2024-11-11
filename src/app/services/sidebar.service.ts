import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu:[
        { titulo: 'Main', url: '/'},
        { titulo: 'ProgressBar', url: 'progress'},
        { titulo: 'Grafica', url: 'grafica'},
        { titulo: 'Rxjs', url: 'rxjs'},
      ]
    },
    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu:[
        { titulo: 'Usuarios', url: 'usuarios'},
        { titulo: 'Barrios', url: 'barrios'},
        { titulo: 'Profesiones', url: 'profesiones'},
        { titulo: 'Unidades', url: 'unidades'},
      ]
    }
  ]
  constructor() { }
}
