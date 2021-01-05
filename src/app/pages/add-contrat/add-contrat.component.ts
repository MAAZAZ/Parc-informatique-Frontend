import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Contrat} from '../../Model/Contrat';
import {ContratService} from '../../services/contratservice/contrat.service';
import {TierService} from '../../services/tierservice/tier.service';
import {Intervention_externe} from '../../Model/Intervention';
import {Intervention_externeService} from '../../services/interventionservice/intervention_externe.service';

@Component({
  selector: 'app-add-contrat',
  templateUrl: './add-contrat.component.html',
  styleUrls: ['./add-contrat.component.css']
})
export class AddContratComponent implements OnInit {

  contrat:Contrat=new Contrat();
  tiers:any;
  types:any=['Achat','Réparation','Achat et réparation'];
  interventions:any;

  constructor(private contratService: ContratService, private tierService: TierService, private route: Router, private interventionService : Intervention_externeService) { }

  ngOnInit(): void {
    this.tierService.getAll().subscribe(data=>{
      this.tiers=data;
    })
  }

  add():void {
    this.contrat.fournisseur="http://127.0.0.1:8000/api/tiers/"+this.contrat.fournisseur+"/";
    this.contratService.add(this.contrat).subscribe(response=>{
      if(this.contrat.type=='1' || this.contrat.type=='2'){
        let externe:Intervention_externe=new Intervention_externe();
        externe.prestataire=this.contrat.fournisseur;
        this.interventionService.getAll().subscribe(data=>{
          let externes:any=data;
          let find:boolean=false;
          externes.forEach(externe=>{
            if(externe.prestataire==this.contrat.fournisseur)
              find=true
          })
          if(find==false)
            this.interventionService.add(externe).subscribe(data=>{})
        })
      }
      this.route.navigate(['contrats']);
    }, error => { console.log(error); })
  }

}
