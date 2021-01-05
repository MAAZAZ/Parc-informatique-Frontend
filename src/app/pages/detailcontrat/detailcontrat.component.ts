import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from "sweetalert2";
import {Contrat} from '../../Model/Contrat';
import {ContratService} from '../../services/contratservice/contrat.service';
import {TierService} from '../../services/tierservice/tier.service';
import {Tier} from '../../Model/Tier';
import {ProduitService} from '../../services/produitservice/produit.service';
import {CommandeService} from '../../services/commandeservice/commande.service';
import {Commande} from '../../Model/Commande';

@Component({
  selector: 'app-detailcontrat',
  templateUrl: './detailcontrat.component.html',
  styleUrls: ['./detailcontrat.component.css']
})
export class DetailcontratComponent implements OnInit {

  id:string;
  contrat:Contrat=new Contrat();
  tier:Tier=new Tier();
  url:string="http://127.0.0.1:8000/api/contrats/"
  produits:any;
  commandes:any;
  produits_contrat:any;
  prix_total:number=0;
  formeCache:boolean=true;
  commande:Commande=new Commande();
  allproducts:any;
  commandeModifier:boolean=true;
  types:any=['Achat','Réparation','Achat et réparation'];
  valable:boolean=true;
  url_tier:string;

  constructor(private contratService: ContratService, private commandeService:CommandeService, private tierService:TierService, private produitService:ProduitService, private route:ActivatedRoute, private router: Router) { }


  changeQuantiteproduit(idProduit,status){
    let commandes:any;
    let qte_total:number=0;
    this.commandeService.getAll().subscribe(data=>{
      commandes=data;
      commandes.forEach(commande=>{
        if(commande.produit=="http://127.0.0.1:8000/api/produits/"+idProduit+"/" && status=="a") {
          qte_total = qte_total + commande.quantite;
          this.produitService.getByUrl(commande.produit).subscribe(data => {
            let produit: any = data;
            produit.quantite_totale = qte_total;
            this.produitService.update(idProduit, produit).subscribe(data => {
            })
          })
        }
        if(commande.produit=="http://127.0.0.1:8000/api/produits/"+idProduit+"/" && status=="d"){
          this.produitService.getByUrl(commande.produit).subscribe(data => {
            let produit: any = data;
            produit.quantite_totale = produit.quantite_totale-commande.quantite;
            this.produitService.update(idProduit, produit).subscribe(data => {
            })
          })
        }
      })

    })
  }

  produitContrat(urlContrat,commande):boolean{
      if(urlContrat===commande.contrat)
        return true;
    return false;
  }

  produitCommande(idproduit, idproduitCommande):boolean{
    if(idproduit===idproduitCommande)
      return false;
    return true;
  }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.contratService.getById(this.id).subscribe(data=>{
      // @ts-ignore
      this.contrat=data;
      this.url_tier=this.contrat.fournisseur;
      let DateAct:Date=new Date();
      let Datefin:Date=new Date(this.contrat.date_fin_contrat);
      if(Datefin.getTime()<=DateAct.getTime() && Datefin.getFullYear()<=DateAct.getFullYear())
        this.valable=false;

      this.tierService.getByUrl(this.contrat.fournisseur).subscribe(data=>{
        this.tier=data;
        this.contrat.fournisseur=this.tier.raison_sociale;
      })
    });

    this.produitService.getAll().subscribe(data=>{
      this.allproducts=data;
    })

    this.commandeService.getAll().subscribe(data=>{
      this.commandes=data;
      this.produits_contrat=this.commandes.filter(commande=>this.produitContrat(this.url+this.contrat.id+"/",commande));
      this.produits_contrat.forEach(produit_contrat=>{
        this.prix_total=this.prix_total+produit_contrat.prix_unitaire*produit_contrat.quantite;
        this.produitService.getByUrl(produit_contrat.produit).subscribe(data=>{
          produit_contrat.produit=data;
          this.allproducts=this.allproducts.filter(produit=>this.produitCommande(produit_contrat.produit.id,produit.id));
        })
      })
    })
  }

  deleteContrat():void{
    Swal.fire({
      title: 'Êtes-vous sûr de supprimer ce contrat ?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    }).then((result) => {
      if (result.value) {

        this.contratService.delete(this.id).subscribe(response=>{
          if(response==null){
            this.router.navigate(['contrats']);
          }
        })

        Swal.fire(
          'Supprimer!',
          'Ce contrat a été supprimé.',
          'success'
        )
      }
    })
  }

  deleteProduitContrat(id){
    Swal.fire({
      title: 'Êtes-vous sûr de supprimer ce produit de ce contrat ?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    }).then((result) => {
      if (result.value) {
        this.prix_total=0;
            for(let val of this.produits_contrat) {
              if (val.id == id) {
                let index = this.produits_contrat.indexOf(val);
                if(this.contrat.type!="1")
                  this.changeQuantiteproduit(val.produit.id,"d");
                this.produitService.getById(val.produit.id).subscribe(data=>{
                  this.allproducts.push(data);
                })
                this.produits_contrat.splice(index, 1);
              }
              else{
                this.prix_total=this.prix_total+val.prix_unitaire*val.quantite;
                this.contrat.prix_total=this.prix_total;
                this.contrat.fournisseur=this.url_tier;
                this.contratService.update_partial(this.contrat.id,this.contrat).subscribe(data=>{})
              }
          }
        this.commandeService.delete(id).subscribe(response=>{
          return response;
          })

        Swal.fire(
          'Supprimer!',
          'Ce produit a été supprimé.',
          'success'
        )
      }
    })
  }

  formeCacheChange(){
    this.formeCache=!this.formeCache;
  }

  changeCommande(){
    this.commandeModifier=!this.commandeModifier;
  }

  changeCommandeinfo(f){
    let commande:any={id:0,contrat:"",produit:"",prix_unitaire:0,quantite:0};
    let url="http://127.0.0.1:8000/api/"
    commande.id=f.value.id;
    commande.produit=url+"produits/"+f.value.produit.id+"/";
    commande.contrat=url+"contrats/"+this.id+"/";
    commande.quantite=f.value.quantite;
    commande.prix_unitaire=f.value.prix_unitaire;
    this.prix_total=0;
    if(this.contrat.type!="1")
      this.changeQuantiteproduit(f.value.produit.id,"a");
    this.commandeService.update(commande.id, commande).subscribe(data=>{
      for(let val of this.produits_contrat) {
          this.prix_total=this.prix_total+val.prix_unitaire*val.quantite;
          this.contrat.prix_total=this.prix_total;
          this.contrat.fournisseur=this.url_tier;
          this.contratService.update_partial(this.contrat.id,this.contrat).subscribe(data=>{})
        }
    })
    this.commandeModifier=!this.commandeModifier;
  }

  addCommande(){
    let commande:any={contrat:"",produit:"",prix_unitaire:0,quantite:0};
    let url="http://127.0.0.1:8000/api/";
    commande.produit=url+"produits/"+this.commande.produit.id+"/";
    commande.contrat=url+"contrats/"+this.id+"/";
    commande.quantite=this.commande.quantite;
    if(this.commande.prix_unitaire==null)
      commande.prix_unitaire=0;
    else
      commande.prix_unitaire=this.commande.prix_unitaire;

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Le produit a été ajouté avec succès.',
      showConfirmButton: false,
      timer: 3000
    })
    this.commandeService.add(commande).subscribe(data=>{
      for(let val of this.produits_contrat) {
        this.prix_total=this.prix_total+val.prix_unitaire*val.quantite;
      }
      let newCommade:Commande=data;
      this.produitService.getByUrl(newCommade.produit).subscribe(res=>{
        newCommade.produit=res;
        this.produits_contrat.push(newCommade);
        this.allproducts=this.allproducts.filter(produit=>this.produitCommande(newCommade.produit.id,produit.id));
        let commandevide:Commande=new Commande();
        this.commande=commandevide;
        if(this.contrat.type!="1")
          this.changeQuantiteproduit(newCommade.produit.id,"a");
      })
    },error => console.log(error))
    this.formeCache=!this.formeCache;

    this.contrat.prix_total=this.prix_total;
    this.contrat.fournisseur=this.url_tier;
    console.log(this.contrat)
    this.contratService.update_partial(this.contrat.id,this.contrat).subscribe(data=>{
      console.log("add")
    })

  }

}
