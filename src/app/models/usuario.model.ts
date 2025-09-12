import { Persona, PersonaBase, PersonaBaseInterface } from "./persona.model";

export interface UsuarioBaseInterface{
  email: string;
  username: string;
  password: string;
  telefono: string;
  estado: string;
  persona_id: number;
  foto?: string;
}
export interface UsuarioInterface extends UsuarioBaseInterface{
  id?: number | bigint;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  persona?: PersonaBase | null;
}
export interface UsuarioPersonaInterface extends UsuarioBaseInterface, PersonaBaseInterface{

}

export class UsuarioBase implements UsuarioBaseInterface{
  email: string;
  username: string;
  password: string;
  telefono: string;
  estado: string;
  persona_id: number;
  foto?: string;
  persona: PersonaBase | null = null;
  constructor(data: UsuarioBaseInterface) {
    this.email = data.email;
    this.username = data.username;
    this.password = data.password;
    this.telefono = data.telefono;
    this.estado = data.estado;
    this.persona_id = data.persona_id;
    this.foto = data.foto;
  }
  static fromForm(formValue: any) : UsuarioBase {
    return new UsuarioBase({
      email: formValue.email,
      username: formValue.username,
      password: formValue.password,
      telefono: formValue.telefono,
      estado: formValue.estado,
      persona_id: +formValue.persona_id,

    });
  }
}
export class UsuarioPost implements UsuarioPersonaInterface{
  email: string;
  username: string;
  password: string;
  telefono: string;
  estado: string;
  persona_id: number;
  foto?: string;
  nombres: string;
  apellido_p: string;
  apellido_m: string;
  ci: string;
  expedido: string;
  fecha_nac: Date;
  sexo: string;
  civil: string;
  constructor(data: UsuarioPersonaInterface){
    Object.assign(this, data);
  }
  toPayLoad(): UsuarioPersonaInterface{
    return {
      email: this.email,
      username: this.username,
      password: this.password,
      telefono: this.telefono,
      estado: this.estado,
      persona_id: this.persona_id,
      nombres: this.nombres,
      apellido_p: this.apellido_p,
      apellido_m: this.apellido_m,
      ci: this.ci,
      expedido: this.expedido,
      fecha_nac: this.fecha_nac,
      sexo: this.sexo,
      civil: this.civil,
    }
  }
}

export class Usuario extends UsuarioBase implements UsuarioInterface{
  id?: number | bigint;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  constructor(data: UsuarioInterface){
    super(data);
    this.id = data.id;
    this.created_at = data.created_at ? new Date(data.created_at) : undefined;
    this.updated_at = data.updated_at ? new Date(data.updated_at) : undefined;
    this.deleted_at = data.deleted_at ? new Date(data.deleted_at) : undefined;
    this.persona = data.persona ? Persona.fromApi(data.persona) : null;
  }
  get isDeleted(): boolean {
    return !!this.deleted_at;
  }
  get nombre_completo(): string{
    return this.persona ? `${this.persona.nombres} ${this.persona.apellido_p} ${this.persona.apellido_m}` : 'Sin nombre';
  }
  static fromApi(data: any): Usuario{
    return new Usuario({
      ...data,
      id: data.id,
      created_at: data.created_at,
      updated_at: data.updated_at,
      deleted_at: data.deleted_at,
      persona: data.persona ? Persona.fromApi(data.persona) : null,
    });
  }

}



// export {Usuario, UsuarioPost, PresentacionResponse};

