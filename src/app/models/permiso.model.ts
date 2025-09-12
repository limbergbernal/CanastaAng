import { PersonaBaseInterface } from "./persona.model";

export interface PermisoBaseInterface{
  name: string;
  guard_name: string;
}

export interface PermisoInterface extends PermisoBaseInterface{
  id?: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export class PermisoBase implements PermisoBaseInterface{
  name: string;
  guard_name: string;
  constructor(data: PermisoBaseInterface){
    this.name = data.name;
    this.guard_name = data.guard_name;
  }
  /**
   *
   * @param formValue
   * @returns valor formateado en un objeto RolBase
   */
  static fromForm(formValue: any): PermisoBase{
    return new PermisoBase({
      name: formValue.name,
      guard_name: formValue.guard_name
    });
  }
}

export class PermisoPost extends PermisoBase{
  constructor(data: PermisoBaseInterface){
    super(data);
  }
  toPayLoad(): PermisoBaseInterface{
    return {
      name: this.name,
      guard_name: this.guard_name
    };
  }
}

export class Permiso extends PermisoBase implements PermisoInterface{
  id?: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  constructor(data: PermisoInterface){
    super(data);
    this.id = data.id;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
    this.deleted_at = data.deleted_at;
  }
  get isDeleted(): boolean{
    return !!this.deleted_at;
  }
  /**
   *
   * @param data
   * @returns instancia de Rol a partir de datos de la API
   */
  static fromApi(data: any): Permiso{
    return new Permiso({
      ...data,
      id: data.id,
      created_at: data.created_at,
      updated_at: data.updated_at,
      deleted_at: data.deleted_at,
    })
  }
}


