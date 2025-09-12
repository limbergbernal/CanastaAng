import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ModalHelper } from '../helpers/modal.helper';
import { UsuarioService } from './usuario.service';
import { Unidad, UnidadPost, UnidadResponse } from '../models/unidad.model';
import { BaseGridService } from './base-grid.service';

const base_url = environment.base_url + "/unidades";

@Injectable({
  providedIn: 'root'
})
export class UnidadService extends BaseGridService<Unidad> {

  constructor(http: HttpClient){
    super(http, base_url);
  }
  protected override identify(item: Unidad) {
    return item.id;
  }

  getSelectOptions(){
    let url = `${base_url}/getSelectOptions`
    return this.http.get<any>(url, this.usuarioService.headers);
  }


}
