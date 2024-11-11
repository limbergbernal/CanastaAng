import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ModalHelper } from '../helpers/modal.helper';
import { UsuarioService } from './usuario.service';
import { Unidad, UnidadPost } from '../models/unidad.model';

const base_url = environment.base_url + "/unidades";

@Injectable({
  providedIn: 'root'
})
export class UnidadService extends ModalHelper {

  private usuarioService = inject(UsuarioService)
  private _unidad:Unidad;
  constructor(private  http: HttpClient) {
    super();
  }

  set unidad(newUnidad: Unidad){
    this._unidad = newUnidad;
  }

  getAll(){
    const url = `${base_url}`;
    return this.http.get<any>(url, this.usuarioService.headers);
  }
  create(unidad: UnidadPost){
    const url = `${base_url}`;
    return this.http.post<any>(url, unidad, this.usuarioService.headers);
  }
  update(unidad: Unidad){
    const url = `${base_url}/${this._unidad.id}`;
    return this.http.put<any>(url, unidad, this.usuarioService.headers);
  }
  delete(id: bigint){
    const url = `${base_url}/`+ id;
    return this.http.delete<any>(url, this.usuarioService.headers);
  }

}
