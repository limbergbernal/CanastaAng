import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Barrio } from '../models/barrio.model';
import { BaseGridService } from './base-grid.service';

const base_url = environment.base_url + "/barrios";

@Injectable({
  providedIn: 'root',
})

export class BarrioService extends BaseGridService<Barrio>{
  constructor(http: HttpClient){
    super(http, base_url)
  }
  protected override identify(item: Barrio) {
    return item.id;
  }
}
