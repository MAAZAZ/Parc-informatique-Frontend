import { Component, OnInit } from '@angular/core';
import {ProduitService} from '../../services/produitservice/produit.service';
import {MarqueService} from '../../services/marqueservice/marque.service';
import {CategorieService} from '../../services/categorieservice/categorie.service';
import {Produit} from '../../Model/Produit';
import {Marque} from '../../Model/Marque';
import {Type} from '../../Model/Type';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})

export class ProduitComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  produits:Produit[];
  marque:Marque=new Marque();
  type:Type=new Type();

  constructor(private ngxSpinnerService:NgxSpinnerService, private produitService:ProduitService, private marqueService: MarqueService, private categorieService: CategorieService) { }

  ngOnInit(): void {
    this.ngxSpinnerService.show();

    this.dtOptions = {
      "language": {
        "url": "//cdn.datatables.net/plug-ins/1.10.21/i18n/French.json"
      },
    };

    this.produitService.getAll().subscribe(response=>{
      // @ts-ignore
      this.produits = response;
      if(this.produits.length>=1)
        this.produits.forEach(p=>{
          this.marqueService.getByUrl(p.marque).subscribe(response=>{
            this.marque = response;
            p.marque  = this.marque.designation;
          });
          this.categorieService.getByUrl(p.type_produit).subscribe(response=>{
            this.type = response;
            p.type_produit  = this.type.libelle;
          });
        })
    });
    setTimeout(() => {
      this.ngxSpinnerService.hide();
    }, 500)
  }

}
