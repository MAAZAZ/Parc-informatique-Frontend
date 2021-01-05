import {Component, OnInit, ViewChild} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {PanneService} from '../../services/panneservice/panne.service';
import {ReclamationService} from '../../services/reclamationservice/reclamation.service';
import {ProduitService} from '../../services/produitservice/produit.service';
import {Produit} from '../../Model/Produit';
import {Reclamation} from '../../Model/Reclamation';
import Swal from "sweetalert2";
import {Panne} from '../../Model/Panne';
import { ApexNonAxisChartSeries, ApexResponsive, ApexChart, ChartComponent } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-panne',
  templateUrl: './panne.component.html',
  styleUrls: ['./panne.component.css']
})


export class PanneComponent implements OnInit {

  pannes:any;
  produit:Produit=new Produit();
  reclamation:Reclamation=new Reclamation();
  page:number = 1;
  pageSize:number=5;
  length_data:number=0;
  searchText:string;

  constructor(private ngxSpinnerService:NgxSpinnerService, private panneService: PanneService, private produitService: ProduitService, private reclamationService: ReclamationService) { }

  ngOnInit(): void {
    this.ngxSpinnerService.show();

    this.panneService.getAll().subscribe(response=>{
      this.pannes=response;
      this.length_data=this.pannes.length;
      this.pannes.forEach(panne=>{
        this.produitService.getByUrl(panne.produit).subscribe(data=>{
          this.produit=data;
          panne.produit=this.produit.designation;
        })
        this.reclamationService.getByUrl(panne.reclamation).subscribe(data=>{
          this.reclamation=data;
          panne.reclamation="Réclamation N° "+this.reclamation.id;
        })
      })
    });
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.ngxSpinnerService.hide();
    }, 500)
  }


  deletePanne(id):void{
    Swal.fire({
      title: 'Êtes-vous sûr de supprimer ce produit défectueux ?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    }).then((result) => {
      if (result.value) {
        this.panneService.getById(id).subscribe(data=>{
          let panne:Panne=data;
          this.reclamationService.getByUrl(panne.reclamation).subscribe(data=>{
            let reclamation:Reclamation=data;
            // rendre la réclamation en état d'attente
            reclamation.etat=""+0;
            this.reclamationService.update(reclamation.id,reclamation).subscribe(data=>{});
          })
        })
        this.panneService.delete(id).subscribe(response=>{
          if(response==null){
            window.location.reload();
          }
        })

        Swal.fire(
          'Supprimer!',
          'Ce produit défectueux a été supprimée.',
          'success'
        )
      }
    })
  }


}
