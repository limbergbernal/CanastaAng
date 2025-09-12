
export interface PersonaBaseInterface {
  nombres: string;
  apellido_p: string;
  apellido_m: string;
  ci: string;
  expedido: string;
  fecha_nac: Date;
  sexo: string;
  civil: string;
}

export interface PersonaInferface extends PersonaBaseInterface {
  id?: number | bigint;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export class PersonaBase implements PersonaBaseInterface {
  nombres: string;
  apellido_p: string;
  apellido_m: string;
  ci: string;
  expedido: string;
  fecha_nac: Date;
  sexo: string;
  civil: string;
  constructor(data: PersonaBaseInterface) {
    this.nombres = data.nombres;
    this.apellido_p = data.apellido_p;
    this.apellido_m = data.apellido_m;
    this.ci = data.ci;
    this.expedido = data.expedido;
    this.fecha_nac = data.fecha_nac;
    this.sexo = data.sexo;
    this.civil = data.civil;
  }
  static fromForm(formValue: any): PersonaBase {
    return new PersonaBase({
      nombres: formValue.nombres,
      apellido_p: formValue.apellido_p,
      apellido_m: formValue.apellido_m,
      ci: formValue.ci,
      expedido: formValue.expedido,
      fecha_nac: formValue.fecha_nac,
      sexo: formValue.sexo,
      civil: formValue.civil
    });
  }
}
export class PersonaPost extends PersonaBase{
  constructor(data: PersonaBaseInterface){
    super(data);
  }
  toPayLoad(): PersonaBaseInterface {
    return {
      nombres: this.nombres,
      apellido_p: this.apellido_p,
      apellido_m: this.apellido_m,
      ci: this.ci,
      expedido: this.expedido,
      fecha_nac: this.fecha_nac,
      sexo: this.sexo,
      civil: this.civil
    }
  }
}
export class Persona extends PersonaBase implements PersonaInferface {
  id?: number | bigint;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  constructor(data: PersonaInferface){
    super(data);
    this.id = data.id;
    this.created_at = data.created_at ? new Date(data.created_at) : undefined;
    this.updated_at = data.updated_at ? new Date(data.updated_at) : undefined;
    this.deleted_at = data.deleted_at ? new Date(data.deleted_at) : undefined;
  }
  get isDeleted(): boolean {
    return !!this.deleted_at;
  }
  static fromApi(data: any): Persona{
    return new Persona({
      ...data,
      id: data.id,
      created_at: data.created_at,
      updated_at: data.updated_at,
      deleted_at: data.deleted_at,
    });
  }
}

