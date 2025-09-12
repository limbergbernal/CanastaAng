import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UsuarioService } from './usuario.service';
import { HttpClient } from '@angular/common/http';
import { Producto, ProductoPost } from '../models/producto.model';
import { BaseGridService } from './base-grid.service';

const base_url = environment.base_url + "/productos";

@Injectable({
  providedIn: 'root'
})
export class ProductoService extends BaseGridService<Producto>{

  constructor(http: HttpClient){
    super(http, base_url);
  }
  protected override identify(item: Producto) {
    return item.id;
  }

}
