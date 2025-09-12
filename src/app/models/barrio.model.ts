interface BarrioInterface{
  nombre:string;
  tipo: string;
  distrito: string;
  estado: string;
}

class Barrio implements BarrioInterface{
  constructor(
    public nombre: string,
    public tipo: string,
    public distrito: string,
    public estado: string,
    public id?: bigint,
    public created_at?: Date,
    public updated_at?: Date,
    public deleted_at?: Date,
  ){}
}
class BarrioResponse{
  constructor(
    public data: Barrio[]|Barrio,
    public message: string,
    public status: string,
    public code: number = 200,
  ){}
}

export {Barrio, BarrioResponse};

