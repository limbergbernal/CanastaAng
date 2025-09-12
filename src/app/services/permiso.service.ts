import { Injectable } from '@angular/core';
import { BaseGridService } from './base-grid.service';
import { Permiso } from '../models/permiso.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const base_url = environment.base_url + "/permisos";

@Injectable({
  providedIn: 'root'
})
export class PermisoService extends BaseGridService<Permiso> {


  constructor(http: HttpClient){
    super(http, base_url);
  }

  protected override identify(item: Permiso) {
    return item.id;
  }
}
