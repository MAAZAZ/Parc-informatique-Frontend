import { Component, OnInit } from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {ReparationService} from '../../services/reparationservice/reparation.service';
import {Panne} from '../../Model/Panne';
import {PanneService} from '../../services/panneservice/panne.service';
import Swal from "sweetalert2";
import {ReclamationService} from '../../services/reclamationservice/reclamation.service';
import {Reparation} from '../../Model/Reparation';
import {ProduitService} from '../../services/produitservice/produit.service';

@Component({
  selector: 'app-reparation',
  templateUrl: './reparation.component.html',
  styleUrls: ['./reparation.component.css']
})
export class ReparationComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  reparations:any;
  panne:Panne=new Panne();
  reparation:Reparation=new Reparation();
  page:number = 1;
  pageSize:number=5;
  length_data:number=0;
  searchText:string;

  constructor(private ngxSpinnerService:NgxSpinnerService, private reclamationService: ReclamationService , private reparationService: ReparationService, private panneService: PanneService, private produitService: ProduitService) { }

  ngOnInit(): void {
    this.ngxSpinnerService.show();

    this.dtOptions = {
      "language": {
        "url": "//cdn.datatables.net/plug-ins/1.10.21/i18n/French.json"
      },
    };

    this.reparationService.getAll().subscribe(response=>{
      this.reparations=response;
      this.length_data=this.reparations.length;
      this.reparations.forEach(reparation=>{
        this.panneService.getByUrl(reparation.panne_concerne).subscribe(data=>{
          this.panne=data;
          this.produitService.getByUrl(this.panne.produit).subscribe(data=>{
            let produit:any=data;
            reparation.panne_concerne=produit.designation;
          })
        })
      })
    });
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.ngxSpinnerService.hide();
    }, 500)
  }

  deleteReparation(id){
    Swal.fire({
      title: 'Êtes-vous sûr de supprimer cette réparation ?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    }).then((result) => {
      if (result.value) {

        this.reclamationService.getByUrl(this.panne.reclamation).subscribe(data=>{
          let reclamation:any=data;
          /// rendre en état cloturée
          reclamation.etat=1;
          this.reclamationService.update(reclamation.id, reclamation).subscribe(data=>{})
        })

        this.reparationService.delete(id).subscribe(response=>{
          if(response==null){
            window.location.reload();
          }
        })

        Swal.fire(
          'Supprimer!',
          'Cette réparation a été supprimée.',
          'success'
        )
      }
    })
  }

  DetailReperation(id){
    this.reparationService.getById(id).subscribe(data=>{
      this.reparation=data;
    })
    if(this.reparation.motif!=null)
      Swal.fire({
        icon: 'info',
        title: 'Motif/Rapport',
        'confirmButtonText':'Fermer',
        html: '<div class="container mt-2"><p class="text-white text-left text-justify bg-dark p-2">'+this.reparation.motif+'</p></div>',
      })
  }

}
