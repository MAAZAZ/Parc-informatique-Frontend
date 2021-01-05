import {Marque} from './Marque';
import {Type} from './Type';
import {Contrat} from './Contrat';
import {Caracteristique} from './Caract';

export interface Produit{
  id?:number,
  reference?:string,
  designation?:string,
  marque?:string,
  type_produit?:string,
  caracteristiques?:Array<string>;
  quantite_totale?:number;
}

export class Produit{
  constructor(){

  }
}
