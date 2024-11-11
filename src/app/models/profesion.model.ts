interface ProfesionInterface{
  nombre: string;
  tipo: string;
  estado: string;
}

class ProfesionPost implements ProfesionInterface{
  nombre: string;
  tipo: string;
  estado: string;
  constructor(nombre: string, tipo: string,estado: string = "Activo"){
    this.nombre = nombre;
    this.tipo = tipo;
    this.estado = estado;
  }
}
class Profesion implements ProfesionInterface{
  id: bigint
  nombre: string;
  tipo: string;
  estado: string;
  created_at: Date;
  updated_at?: Date;
  deleted_at: Date;
  constructor(id:bigint, nombre: string, tipo: string,estado: string, created_at: Date, updated_at?: Date, deleted_at?: Date){
    this.id = id
    this.nombre = nombre;
    this.tipo = tipo;
    this.estado = estado;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
  }
}
export {ProfesionPost, Profesion}
