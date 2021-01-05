export interface Agent{
  id?:number,
  username?:string,
  first_name?:string,
  last_name?:string,
  matricule?:string,
  role?:string,
  service?:string,
  specialite?:string,
  telephone?:string,
  email?:string,
  password?:string,
  is_staff?:boolean
}

export class Agent{
  constructor(){

  }
}
