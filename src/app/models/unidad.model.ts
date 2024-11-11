interface UnidadInterface {
  nombre: string;
  abreviacion: string;
  estado: string;
}
class UnidadPost implements UnidadInterface {
  nombre: string;
  abreviacion: string;
  estado: string = 'Activo';
  constructor(nombre: string, abreviacion: string) {
    this.nombre = nombre;
    this.abreviacion = abreviacion;
  }
}
class Unidad implements UnidadInterface {
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
  ) {
    this.nombre = nombre;
    this.abreviacion = abreviacion;
    this.estado = estado;
    this.id = id;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
  }
}

export { Unidad, UnidadPost };
