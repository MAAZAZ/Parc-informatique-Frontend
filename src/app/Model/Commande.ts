import {Produit} from './Produit';

export interface Commande{
  id?:string,
  contrat?:string,
  date_signe_contrat?:Date,
  prix_unitaire?:number,
  quantite?:number,
  produit?:Produit
}

export class Commande{
  constructor(){

  }
}
