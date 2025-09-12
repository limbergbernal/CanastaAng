import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginForm } from '../interfaces/login-form.interface';
import { environment } from '../../environments/environment';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { Usuario, UsuarioPost } from '../models/usuario.model';
import { UsuarioAdapter } from './adapters/usuario.adapter';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient, private adapter: UsuarioAdapter, private router: Router, private localStorageService: LocalStorageService) {

   }


  get token(): string {
    return this.localStorageService.getItem('token') || '';
  }
  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  logout(){
    this.localStorageService.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  validarToken2(): Promise<boolean>{
    return new Promise((resolve,reject) => {

        this.http.get(`${base_url}/login/renew`,{
          headers: {
            'x-token': this.token
          }
        }).pipe(
          tap((resp:any) => {
            this.localStorageService.setItem('token', resp.data);
            // localStorage.setItem('token', resp.data);
          }),
          map(resp => true),
        ).subscribe({
          next: ()=>{
            console.log("true");
            resolve(true);
          },
          error:() => {
            resolve(false);
          }
        });
    });
  }

  validarToken(): Observable<boolean>{
    return this.http.get(`${base_url}/login/renew`,{
      headers: {
        'x-token': this.token
      }
    }).pipe(
      tap((resp:any) => {
        this.localStorageService.setItem('token', resp.data);
        // localStorage.setItem('token', resp.data);
      }),
      map(resp => true),
      catchError(error => of(false))
    );
  }
  login(formData: LoginForm){
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap( (resp:any) => {
        this.localStorageService.setItem('token', resp.data);
        // localStorage.setItem('token', resp.data)
      }));
  }

  isLocalStorageDisponible(): boolean{
    try{
      return typeof window !== 'undefined' && !!window.localStorage;
    }catch(e){
      return false;
    }
  }

  getAll(): Observable<Usuario[]>{
    return this.http.get<any>(`${base_url}/usuarios`, this.headers).pipe(
      map(resp => resp.data.map(usuario => Usuario.fromApi(usuario))),
    )
  }
  getById(id: number): Observable<Usuario>{
    return this.http.get<any>(`${base_url}/usuarios/${id}`, this.headers).pipe(
      map(resp => this.adapter.fromApi(resp.data))
    );
  }

  create(usuario: UsuarioPost): Observable<Usuario>{
    return this.http.post<any>(`${base_url}/usuarios`, usuario.toPayLoad(), this.headers).pipe(
      map(data => this.adapter.fromApi(data.data))
    );
  }
  update(usuario: UsuarioPost): Observable<Usuario>{
    return this.http.post<any>(`${base_url}/usuarios`, usuario.toPayLoad(), this.headers).pipe(
      map(data => this.adapter.fromApi(data.data))
    );
  }
}
