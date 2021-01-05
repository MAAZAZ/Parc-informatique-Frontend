export interface Intervention{
  id?:number,
  resourcetype?:string
}

export class Intervention{
  constructor(){

  }
}

export interface Intervention_interne extends Intervention{
  agent?: string
}

export class Intervention_interne extends Intervention{
  constructor(){
    super()
  }
}

export interface Intervention_externe extends Intervention{
  prestataire?: string,
}

export class Intervention_externe extends Intervention{
  constructor(){
    super()
  }
}
