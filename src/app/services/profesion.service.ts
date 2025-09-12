import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UsuarioService } from './usuario.service';
import { HttpClient } from '@angular/common/http';
import { Profesion, ProfesionPost } from '../models/profesion.model';
import { BaseGridService } from './base-grid.service';
import { Presentacion } from '../models/presentacion.model';


const base_url = environment.base_url + "/profesiones";

@Injectable({
  providedIn: 'root'
})
export class ProfesionService extends BaseGridService<Profesion>{

  constructor(http: HttpClient){
    super(http, base_url);
  }
  protected override identify(item: Profesion) {
    return item.id;
    }


}
