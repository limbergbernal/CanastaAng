import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { Barrio } from '../models/barrio.model';
import { ModalHelper } from '../helpers/modal.helper';
import { UsuarioService } from './usuario.service';

const base_url = environment.base_url + "/barrios";

@Injectable({
  providedIn: 'root',
})

export class BarrioService extends ModalHelper{

  private usuarioService = inject(UsuarioService);
  private _barrio: Barrio;
  constructor(private http: HttpClient) {
    super();
  }
  set barrio(barrio: Barrio){
    this._barrio = {...barrio};
  }

  getAll(desde: number = 0){
    return this.http.get<Barrio[]>(base_url, this.usuarioService.headers)
      .pipe(
        map( (resp: any) => resp.data)
      );
  }
  create(barrio: Barrio){
    return this.http.post<any>(base_url, barrio ,this.usuarioService.headers);
  }
  update(barrio: Barrio){
    const url = `${base_url}/${this._barrio.id}`;
    return this.http.put<any>(url, barrio, this.usuarioService.headers);
  }
  delete(id: bigint){
    const url = `${base_url}/${id}`;
    return this.http.delete<any>(url, this.usuarioService.headers);
  }
}
