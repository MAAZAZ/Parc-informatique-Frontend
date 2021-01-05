import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ProduitService} from '../../services/produitservice/produit.service';
import {Produit} from '../../Model/Produit';
import {MarqueService} from '../../services/marqueservice/marque.service';
import {CaracteristiqueService} from '../../services/caracteristiqueservice/caracteristique.service';
import {CategorieService} from '../../services/categorieservice/categorie.service';
import {Marque} from '../../Model/Marque';
import {Type} from '../../Model/Type';
import {Caracteristique} from '../../Model/Caract';

@Component({
  selector: 'app-add-produit',
  templateUrl: './add-produit.component.html',
  styleUrls: ['./add-produit.component.css']
})
export class AddProduitComponent implements OnInit {

  produit:Produit=new Produit();
  marques:any;
  caracteristiques:any;
  categories:any;
  marque:Marque=new Marque()
  type:Type=new Type();
  caracteristiquesSelected:any;
  url:string="http://127.0.0.1:8000/api/"

  constructor(private produitService: ProduitService, private categorieService:CategorieService, private marqueService:MarqueService, private caracteristiqueService: CaracteristiqueService, private route: Router) {

  }

  ngOnInit(): void {
      this.categorieService.getAll().subscribe(data=>{
        this.categories=data;
        this.type=this.categories[Math.floor(Math.random() * this.categories.length)];
      });
    this.marqueService.getAll().subscribe(data=>{
      this.marques=data;
      this.marque=this.marques[Math.floor(Math.random() * this.marques.length)];
    })
    this.caracteristiqueService.getAll().subscribe(data=>{
      this.caracteristiques=data;
    })
  }

  add():void {
    this.produit.marque=this.url+"marques/"+this.marque.id+"/";
    this.produit.type_produit=this.url+"types/"+this.type.id+"/";
    this.produit.caracteristiques=new Array<string>();
    if(this.caracteristiquesSelected!=null)
      this.caracteristiquesSelected.forEach(caract=>{
        this.produit.caracteristiques.push(this.url+"caracteristiques/"+caract.id+"/");
      })

    this.produitService.add(this.produit).subscribe(response=>{
      this.route.navigate(['/produits']);
    }, error => { console.log(error); })

  }

}
