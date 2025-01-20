import { Unidad } from "./unidad.model";

interface ProductoInterface {
  nombre: string;
  peso: string;
  estado: string;
  unidad_id: bigint,
  presentacion_id: bigint
}
class ProductoPost implements ProductoInterface {
  nombre: string;
  peso: string;
  estado: string = 'Activo';
  unidad_id: bigint;
  presentacion_id: bigint;
  constructor(
    nombre: string,
    peso: string,
    estado: string,
    unidad_id: bigint,
    presentacion_id:bigint) {
    this.nombre = nombre;
    this.peso = peso;
    this.estado = estado;
    this.unidad_id = unidad_id;
    this.presentacion_id = presentacion_id;
  }
}
class Producto implements ProductoInterface {
  nombre: string;
  peso: string;
  estado: string;
  unidad_id: bigint;
  presentacion_id: bigint;
  id?: bigint;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  unidad: Unidad;
  presentacion:any
  constructor(
    nombre: string,
    peso: string,
    estado: string,
    unidad_id: bigint,
    presentacion_id: bigint,
    id?: bigint,
    created_at?: Date,
    updated_at?: Date,
    deleted_at?: Date
  ) {
    this.nombre = nombre;
    this.peso = peso;
    this.estado = estado;
    this.unidad_id = unidad_id;
    this.presentacion_id = presentacion_id;
    this.id = id;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.deleted_at = deleted_at;
  }
}

export { Producto, ProductoPost };
