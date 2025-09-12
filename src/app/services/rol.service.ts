import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BaseGridService } from './base-grid.service';
import { Rol } from '../models/rol.model';
import { Permiso } from '../models/permiso.model';
import { map, tap } from 'rxjs';

const base_url = environment.base_url + "/roles";
@Injectable({
  providedIn: 'root'
})
export class RolService extends BaseGridService<Rol>{

  constructor(http: HttpClient) {
    super(http, base_url)
  }
  protected override identify(item: Rol) {
    return item.id;
  }
  getPermisos(){
    return this.http.get<Permiso>(`${base_url}/getPermisos`, this.usuarioService.headers)
    .pipe(
      map( (resp: any) => resp.data.map( (permiso: any)=> new Permiso(permiso))),
      tap( resp => console.log(resp))
    );
  }

  asignarRoles(rolId, permisoId: number[]){
    return this.http.post<any>(`${base_url}/asignarPermiso`, {'role_id': rolId, 'permisos': permisoId}, this.usuarioService.headers)
  }

}
