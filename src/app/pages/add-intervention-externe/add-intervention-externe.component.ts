import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Tier} from '../../Model/Tier';
import {Intervention_externeService} from '../../services/interventionservice/intervention_externe.service';
import {TierService} from '../../services/tierservice/tier.service';
import {Intervention_externe} from '../../Model/Intervention';

@Component({
  selector: 'app-add-intervention-externe',
  templateUrl: './add-intervention-externe.component.html',
  styleUrls: ['./add-intervention-externe.component.css']
})
export class AddInterventionExterneComponent implements OnInit {

  externe:Intervention_externe=new Intervention_externe();
  tiers:any;

  constructor(private externeService: Intervention_externeService, private tierService: TierService, private route: Router) { }

  TierExiste(prestataire_int,tier):boolean{
    if("http://127.0.0.1:8000/api/agents/"+tier+"/"==prestataire_int)
      return true;
    return false
  }

  ngOnInit(): void {

    this.tierService.getAll().subscribe(data=>{
      this.tiers=data;
    })

    this.externeService.getAll().subscribe(data=>{
      let inter_ext:any=data;
      inter_ext.forEach(prestataire_int=>{
        this.tiers=this.tiers.filter(tier=>this.TierExiste(prestataire_int,tier))
      })
    })

  }

  add():void {
    this.externe.prestataire = "http://127.0.0.1:8000/api/tiers/" + this.tiers[this.externe.prestataire].id + "/";
    this.externeService.add(this.externe).subscribe(data => {
      this.route.navigate(['interventions']);
    })
  }
  }
