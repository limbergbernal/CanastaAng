export class Barrio{
  constructor(
    public nombre: string,
    public tipo: string,
    public distrito: string,
    public estado: string = "Activo",
    public id?: bigint,
    public created_at?: Date
  ){}
}
