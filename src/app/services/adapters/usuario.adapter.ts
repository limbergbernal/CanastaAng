import { Injectable } from "@angular/core";
import { Usuario } from "../../models/usuario.model";

@Injectable({ providedIn: 'root'})
export class UsuarioAdapter{
  fromApi(data: any): Usuario{
    return Usuario.fromApi(data);
  }
  fromApiArray(dataArray: any[]): Usuario[]{
    return dataArray.map(data => this.fromApi(data));
  }
}
