import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { GridBaseService } from '../interfaces/GridBaseService.interface';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseGridService<T> implements GridBaseService<T> {

  protected items: T[] = [];
  public message: string = '';
  public status: string = '';
  public code: number = 200;
  private _usuarioService = inject(UsuarioService);

  private _item: T;
  set item(newItem: T){
    this._item = newItem;
  }
  get item(){
    return this._item;
  }
  get usuarioService(): UsuarioService{
    return this._usuarioService;
  }
  constructor(protected http: HttpClient, private baseUrl: string) { }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl,this._usuarioService.headers)
            .pipe(
              map((resp: any) => {
                this.items = resp.data;
                this.message = resp.message;
                this.status = resp.status;
                this.code = resp.code || 200;
                return this.items;
              })
            );
  }

  getById(id: number): Observable<T>{
    return this.http.get<T>(`${this.baseUrl}/${id}`, this._usuarioService.headers);
  }

  create(item: T): Observable<T> {
    return this.http.post<T>(this.baseUrl, item, this._usuarioService.headers)
    .pipe(
      map((resp: any) => {
        this.message = resp.message;
        this.status = resp.status;
        this.code = resp.code || 200;
        return resp.data;
      })
    );
  }
  update(item: T): Observable<T> {
    const url = `${this.baseUrl}/${this.identify(this.item)}`;
    return this.http.put<T>(url, item, this._usuarioService.headers)
    .pipe(
      map((resp: any) => {
        this.message = resp.message;
        this.status = resp.status;
        this.code = resp.code || 200;
        return resp.data;
      })
    );;
  }
  delete(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<T>(url, this._usuarioService.headers);
  }

  protected abstract identify(item: T): any;

}
