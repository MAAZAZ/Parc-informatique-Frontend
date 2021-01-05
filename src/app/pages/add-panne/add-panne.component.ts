import { Component, OnInit } from '@angular/core';
import {PanneService} from '../../services/panneservice/panne.service';
import {ProduitService} from '../../services/produitservice/produit.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ReclamationService} from '../../services/reclamationservice/reclamation.service';
import {Panne} from '../../Model/Panne';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-panne',
  templateUrl: './add-panne.component.html',
  styleUrls: ['./add-panne.component.css']
})
export class AddPanneComponent implements OnInit {

  allproduct:any;
  id:string;
  panne:Panne=new Panne();

  constructor(private panneService:PanneService, private produitService:ProduitService, private reclamationService:ReclamationService, private route:Router, private  router: ActivatedRoute) { }

  sameProduct(produit, produit2):boolean{
   if("http://127.0.0.1:8000/api/produits/"+produit.id+"/"==produit2)
     return false;
   return true
  }

  ngOnInit(): void {
    if(this.router.snapshot.queryParamMap.get('reclamation')==null)
      this.route.navigate(['pannes'])
    if(this.router.snapshot.queryParamMap.get('reclamation')!=null)
      this.id=this.router.snapshot.queryParamMap.get('reclamation')
    this.produitService.getAll().subscribe(data=>{
      this.allproduct=data;
      /*this.panneService.getAll().subscribe(data=>{
        let produits_defectueux:any=data;
        produits_defectueux.forEach(produit_def=>{
          this.allproduct=this.allproduct.filter(pro=> this.sameProduct(pro,produit_def.produit));
        })
      })*/
    })
  }

  add():void{
    let url:string="http://127.0.0.1:8000/api/";
    this.panne.produit=url+"produits/"+this.panne.produit+"/";
    this.panne.reclamation=url+"reclamations/"+this.id+"/";;
    this.panneService.add(this.panne).subscribe(data=>{
      this.route.navigate(['pannes']);
    })
    this.reclamationService.getById(this.id).subscribe(data=>{
      let reclamation:any=data;
      // reclamation transformé en état de traitement
      reclamation.etat=1;
      this.reclamationService.update(this.id,reclamation).subscribe(data=>{})
    })
  }

  async saveandadd(){
    let url:string="http://127.0.0.1:8000/api/";
    this.panne.produit=url+"produits/"+this.panne.produit+"/";
    this.panne.reclamation=url+"reclamations/"+this.id+"/";
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Vous avez ajouté ce produit avec succès.',
      showConfirmButton: false,
      timer: 500
    })
    this.panneService.add(this.panne).subscribe(data=>{
      this.route.navigate(['pannes/nouvelle'], { queryParams : { reclamation : this.id }});
    })
    let newProduct:Panne=new Panne();
    newProduct.quantite=0;
    this.panne=newProduct;

    this.reclamationService.getById(this.id).subscribe(data=>{
      let reclamation:any=data;
      // reclamation transformé en état de traitement
      if(reclamation.etat!=1){
        reclamation.etat=1;
        this.reclamationService.update(this.id,reclamation).subscribe(data=>{})
      }
    })
  }

}
