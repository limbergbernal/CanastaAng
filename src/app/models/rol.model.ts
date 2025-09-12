import { Permiso } from "./permiso.model";

export interface RolBaseInterface{
  name: string;
  guard_name: string;
}

export interface RolInterface extends RolBaseInterface{
  id?: number | bigint;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  permissions?: Permiso[];
}

export class RolBase implements RolBaseInterface{
  name: string;
  guard_name: string;
  constructor(data: RolBaseInterface){
    this.name = data.name;
    this.guard_name = data.guard_name;
  }
  /**
   *
   * @param formValue
   * @returns valor formateado en un objeto RolBase
   */
  static fromForm(formValue: any): RolBase{
    return new RolBase({
      name: formValue.name,
      guard_name: formValue.guard_name
    });
  }
}

export class RolPost extends RolBase{
  constructor(data: RolBaseInterface){
    super(data);
  }
  toPayLoad(): RolBaseInterface{
    return {
      name: this.name,
      guard_name: this.guard_name
    };
  }
}

export class Rol extends RolBase implements RolInterface{
  id?: number | bigint;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  permisos?: Permiso[];
  constructor(data: RolInterface){
    super(data);
    this.id = data.id;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
    this.deleted_at = data.deleted_at;
    this.permisos = data.permissions?.map(permiso => Permiso.fromApi(permiso)) || [];
  }
  get isDeleted(): boolean{
    return !!this.deleted_at;
  }
  /**
   *
   * @param data
   * @returns instancia de Rol a partir de datos de la API
   */
  static fromApi(data: any): Rol{
    return new Rol({
      ...data,
      id: data.id,
      created_at: data.created_at,
      updated_at: data.updated_at,
      deleted_at: data.deleted_at,
    })
  }
}


