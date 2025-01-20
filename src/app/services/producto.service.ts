import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UsuarioService } from './usuario.service';
import { HttpClient } from '@angular/common/http';
import { Producto, ProductoPost } from '../models/producto.model';

const base_url = environment.base_url + "/productos";
const base_urlG = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private usuarioService = inject(UsuarioService);
  private _producto: Producto;
  constructor(private http: HttpClient) { }

  set producto(newProducto: Producto){
    this._producto = newProducto;
  }
  getAll(){
    const url = `${base_url}`;
    return this.http.get<any>(url, this.usuarioService.headers);
  }
  create(producto:ProductoPost){
    const url = `${base_url}`;
    return this.http.post<any>(url, producto, this.usuarioService.headers);
  }

  update(producto: Producto){
    const url = `${base_url}/${this._producto.id}`;
    return this.http.put<any>(url, producto, this.usuarioService.headers);
  }
  delete(id: bigint){
    const url = `${base_url}/${id}`;
    return this.http.delete<any>(url, this.usuarioService.headers);
  }

  getUnidades(){
    const url = `${base_urlG}/unidades/selectUnidades`;
    return this.http.get<any>(url, this.usuarioService.headers);
  }
  getPresentaciones(){
    const url = base_urlG + "/presentaciones/selectPresent"
    return this.http.get<any>(url, this.usuarioService.headers);
  }
}
