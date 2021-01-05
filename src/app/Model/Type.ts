export interface Type{
  id?:number,
  libelle?:string,
  image?:string
}

export class Type{
  constructor(){

  }
}

export interface Materiel extends Type{
  date_ajout?: string
}

export class Materiel extends Type{
  constructor(){
    super()
  }
}

export interface Logiciel extends Type{
  version?: string,
  description?: string,
  date_installation?: Date
}

export class Logiciel extends Type{
  constructor(){
    super()
  }
}
