import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UsuarioService } from './usuario.service';
import { HttpClient } from '@angular/common/http';
import { Profesion, ProfesionPost } from '../models/profesion.model';


const base_url = environment.base_url + "/profesiones";

@Injectable({
  providedIn: 'root'
})
export class ProfesionService {
  private usuarioService = inject(UsuarioService);
  public profesion: Profesion;
  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<any>(base_url, this.usuarioService.headers);
  }
  store(profesion: ProfesionPost){
    return this.http.post<any>(base_url,profesion, this.usuarioService.headers);
  }
  update(profesion: Profesion){
    const url = `${base_url}/${this.profesion.id}`;
    return this.http.put<any>(url, profesion, this.usuarioService.headers);
  }
  delete(id: bigint){
    const url = `${base_url}/${id}`;
    return this.http.delete<any>(url, this.usuarioService.headers);
  }

}
