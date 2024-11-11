export class Usuario{
  constructor(
    public email: string,
    public username: string,
    public password: string,
    public telefono: string,
    public estado: string,
    public persona_id: number,
    public foto?: string,
    public id?: string
  ){

  }
}
