interface PresentacionInterface
{
  nombre: string;
  abreviacion: string;
  estado: string;
}

class PresentacionPost implements PresentacionInterface{
  nombre: string;
  abreviacion: string;
  estado: string = "Activo";
  constructor(nombre: string, abreviacion: string, estado: string){
    this.nombre = nombre;
    this.abreviacion = abreviacion;
    this.estado = estado;
  }
}

class Presentacion implements PresentacionInterface{
  nombre: string;
  abreviacion: string;
  estado: string;
  id?: bigint;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  constructor(
    nombre: string,
    abreviacion: string,
    estado: string,
    id?: bigint,
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date
  ){
    this.nombre = nombre;
    this.abreviacion = abreviacion;
    this.estado = estado;
    this.id = id;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
  }
}

class PresentacionResponse{
  data: Presentacion[]|Presentacion;
  message: string;
  status: string;
  code?: number = 200;
  constructor(data: Presentacion[]|Presentacion, message: string, status: string, code?: number){
    this.data = data;
    this.message = message;
    this.status = status;
    this.code = code;
  }
}

export {Presentacion, PresentacionPost, PresentacionResponse};
