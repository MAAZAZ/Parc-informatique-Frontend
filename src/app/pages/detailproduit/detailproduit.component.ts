import { Component, OnInit } from '@angular/core';
import {ProduitService} from '../../services/produitservice/produit.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Produit} from '../../Model/Produit';
import {Marque} from '../../Model/Marque';
import {Type} from '../../Model/Type';
import {MarqueService} from '../../services/marqueservice/marque.service';
import {CategorieService} from '../../services/categorieservice/categorie.service';
import {CaracteristiqueService} from '../../services/caracteristiqueservice/caracteristique.service';
import Swal, {SweetAlertResult} from 'sweetalert2';
import {Caracteristique} from '../../Model/Caract';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-detailproduit',
  templateUrl: './detailproduit.component.html',
  styleUrls: ['./detailproduit.component.css']
})
export class DetailproduitComponent implements OnInit {

  id:string;
  prod:Produit=new Produit()
  marque:Marque=new Marque();
  categorie:Type=new Type();
  caracterisitiques:any=new Array();
  Allcaracterisitiques:any=new Array();
  formeCache:boolean=true;

  constructor(private produitService: ProduitService, private marqueService: MarqueService, private categorieService: CategorieService, private caracteristiqueService: CaracteristiqueService, private route:ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.produitService.getById(this.id).subscribe(data=>{
      this.prod=data;
      this.marqueService.getByUrl(this.prod.marque).subscribe(response=>{
        this.marque = response;
      });
      this.categorieService.getByUrl(this.prod.type_produit).subscribe(response=>{
        this.categorie = response;
      });
      this.prod.caracteristiques.forEach(caract=>{
        this.caracteristiqueService.getByUrl(caract).subscribe(response=>{
          this.caracterisitiques.push(response);
        });
      })
    });
    this.caracteristiqueService.getAll().subscribe(data=>{
      this.Allcaracterisitiques=data;
    })
  }

  deleteProduit():void{
    Swal.fire({
      title: 'Êtes-vous sûr de supprimer ce produit?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    }).then((result) => {
      if (result.value) {
        this.produitService.delete(this.id).subscribe(response=>{
          if(response==null){
            this.router.navigate(['produits']);
          }
        })

        Swal.fire(
          'Supprimer!',
          'Ce produit a été supprimé.',
          'success'
        )
      }
    })
  }

  deleteCaractFromProduit(idCaract):void{
    Swal.fire({
      title: 'Êtes-vous sûr de supprimer cette caractéristique pour ce produit : '+this.prod.designation+' ?',
      text: "",
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        for(let val of this.caracterisitiques) {
          if (val.id == idCaract) {
            let index = this.caracterisitiques.indexOf(val);
            this.caracterisitiques.splice(index, 1);
          }
        }
        this.prod.caracteristiques.splice(0,this.prod.caracteristiques.length)
        for(let val of this.caracterisitiques){
          this.prod.caracteristiques.push("http://127.0.0.1:8000/api/caracteristiques/"+val.id+"/");
        }

        this.produitService.update(this.id, this.prod).subscribe(response=>{
          return response;
        })

        Swal.fire(
          'Supprimer!',
          'Cette caractéristique a été supprimée pour ce produit.',
          'success'
        )
      }
    })
  }

  formeCacheChange(){
    this.formeCache=!this.formeCache;
  }

  addCaract(){

    this.prod.caracteristiques.splice(0,this.prod.caracteristiques.length)
    for(let val of this.caracterisitiques){
      this.prod.caracteristiques.push("http://127.0.0.1:8000/api/caracteristiques/"+val.id+"/");
    }
    this.produitService.update(this.id, this.prod).subscribe(response=>{
      return response;
    })

    this.formeCache=!this.formeCache;
  }

}
