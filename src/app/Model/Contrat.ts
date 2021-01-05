export interface Contrat{
  id?:number,
  reference?:string,
  date_signe_contrat:Date,
  date_fin_contrat?:Date,
  type:string,
  fournisseur?:string,
  prix_total?:number
}

export class Contrat{
  constructor(){

  }
}
