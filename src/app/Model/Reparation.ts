export interface Reparation{
  id?:number,
  panne_concerne?:string,
  date_debut?:Date,
  date_fin?:Date,
  motif?:string,
  intervention?:string,
  pieces?:Array<string>,
  prix_total?:number,
  tva?:number
}

export class Reparation{
  constructor(){

  }
}
