import { UsuarioService } from './usuario.service';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Presentacion, PresentacionPost } from '../models/presentacion.model';

const base_url = environment.base_url + "/presentaciones"
@Injectable({
  providedIn: 'root'
})
export class PresentacionService {

  private usuarioService = inject(UsuarioService);
  private _presentacion;
  constructor(private http: HttpClient) {

  }
  set presentacion(newPresentacion: Presentacion){
    this._presentacion = newPresentacion;
  }

  getAll(){
    return this.http.get<any>(base_url, this.usuarioService.headers);
  }
  create(presentacion: PresentacionPost){
    return this.http.post<any>(base_url, presentacion, this.usuarioService.headers);
  }
  update(presentacion: Presentacion){
    const url = `${base_url}/${this._presentacion.id}`;
    return this.http.put<any>(url, presentacion, this.usuarioService.headers);
  }
  delete(id: bigint){
    const url = `${base_url}/${id}`;
    return this.http.delete<any>(url, this.usuarioService.headers);
  }

}
