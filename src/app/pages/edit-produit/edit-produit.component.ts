import { Component, OnInit } from '@angular/core';
import {Produit} from '../../Model/Produit';
import {Marque} from '../../Model/Marque';
import {Type} from '../../Model/Type';
import {ProduitService} from '../../services/produitservice/produit.service';
import {CategorieService} from '../../services/categorieservice/categorie.service';
import {MarqueService} from '../../services/marqueservice/marque.service';
import {CaracteristiqueService} from '../../services/caracteristiqueservice/caracteristique.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-produit',
  templateUrl: './edit-produit.component.html',
  styleUrls: ['./edit-produit.component.css']
})
export class EditProduitComponent implements OnInit {

  id:string
  produit:Produit=new Produit();
  marques:any;
  categories:any;
  marque:Marque=new Marque()
  type:Type=new Type();
  url:string="http://127.0.0.1:8000/api/"

  constructor(private produitService: ProduitService, private categorieService:CategorieService, private marqueService:MarqueService, private route: Router, private router: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.id=this.router.snapshot.params['id'];
    this.produitService.getById(this.id).subscribe(data=>{
      this.produit=data;
      this.categorieService.getByUrl(this.produit.type_produit).subscribe(data=>{
        this.type=data;
      });
      this.marqueService.getByUrl(this.produit.marque).subscribe(data=>{
        this.marque=data;
      })
    })
    this.categorieService.getAll().subscribe(data=>{
      this.categories=data;
    })
    this.marqueService.getAll().subscribe(data=>{
      this.marques=data;
    })
  }

  update():void {
    this.produit.marque=this.url+"marques/"+this.marque.id+"/";
    this.produit.type_produit=this.url+"types/"+this.type.id+"/";
    this.produitService.update(this.id, this.produit).subscribe(response=>{
      this.route.navigate(['/produits/'+this.id]);
    }, error => { console.log(error); })

  }

}
