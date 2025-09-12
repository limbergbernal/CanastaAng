import { UsuarioService } from './usuario.service';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Presentacion, PresentacionPost, PresentacionResponse } from '../models/presentacion.model';
import { BaseGridService } from './base-grid.service';

const base_url = environment.base_url + "/presentaciones"
@Injectable({
  providedIn: 'root'
})
export class PresentacionService extends BaseGridService<Presentacion>{

  constructor(http: HttpClient){
    super(http, base_url)
  }
  protected override identify(item: Presentacion) {
    return item.id;
  }

  getSelectOptions(){
    let url = `${base_url}/getSelectOptions`
    return this.http.get<any>(url, this.usuarioService.headers);
  }
}
