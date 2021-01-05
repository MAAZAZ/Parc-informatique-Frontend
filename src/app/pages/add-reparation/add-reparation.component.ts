import { Component, OnInit } from '@angular/core';
import {Piece} from '../../Model/Piece';
import {Panne} from '../../Model/Panne';
import {Reparation} from '../../Model/Reparation';
import {Intervention, Intervention_externe, Intervention_interne} from '../../Model/Intervention';
import {PanneService} from '../../services/panneservice/panne.service';
import {ReclamationService} from '../../services/reclamationservice/reclamation.service';
import {InterventionService} from '../../services/interventionservice/intervention.service';
import {ReparationService} from '../../services/reparationservice/reparation.service';
import {PieceService} from '../../services/pieceservice/piece.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Intervention_interneService} from '../../services/interventionservice/intervention_interne.service';
import {Intervention_externeService} from '../../services/interventionservice/intervention_externe.service';
import {TierService} from '../../services/tierservice/tier.service';
import {AgentService} from '../../services/agentservice/agent.service';

@Component({
  selector: 'app-add-reparation',
  templateUrl: './add-reparation.component.html',
  styleUrls: ['./add-reparation.component.css']
})
export class AddReparationComponent implements OnInit {
  piece:Piece=new Piece();
  panne:Panne=new Panne();
  reparation:Reparation=new Reparation();
  intervention:Intervention=new Intervention();
  piecesReparation:any=new Array();
  id:string;
  allinterventions:any=new Array();
  allpieces:any=new Array();
  interventions_internes:any;
  interventions_externes:any;

  constructor(private panneService: PanneService, private reclamationService: ReclamationService, private interventionService: InterventionService, private reparationService: ReparationService, private pieceService: PieceService, private route: Router, private routeActive: ActivatedRoute, private interventionInterneService: Intervention_interneService, private interventionExterneService: Intervention_externeService, private tier:TierService, private agent:AgentService) { }

  ngOnInit() {
    this.id=this.routeActive.snapshot.queryParamMap.get('panne');

    this.interventionInterneService.getAll().subscribe(data=>{
      this.interventions_internes=data;
      this.interventions_internes.forEach(intervention=>{
        this.agent.getByUrl(intervention.agent).subscribe(data=>{
          let agent_selected:any=data;
          intervention.agent=agent_selected.last_name+" "+agent_selected.first_name;
        })
      })
    })

    this.interventionExterneService.getAll().subscribe(data=>{
      this.interventions_externes=data;
      this.interventions_externes.forEach(intervention=> {
        this.tier.getByUrl(intervention.prestataire).subscribe(data => {
          let tier_selected: any = data;
          intervention.prestataire = tier_selected.raison_sociale;
        })
      })
    })

    this.reparationService.getAll().subscribe(data=>{
      let reparations:any=data;
      reparations.forEach(reparation=>{
        if(reparation.panne_concerne=="http://127.0.0.1:8000/api/pannes/"+this.id+"/")
          this.route.navigate(['reparations/modifier/', reparation.id]);
      })
    })

    this.interventionService.getAll().subscribe(data=>{
      this.allinterventions=data;
    })

    this.pieceService.getAll().subscribe(data=>{
      this.allpieces=data;
    })
  }

  add():void {
    let url="http://127.0.0.1:8000/api/"
    this.reparation.pieces=[];
    this.reparation.panne_concerne=url+"pannes/"+this.id+"/"

    this.piecesReparation.forEach(piece=>{
      this.reparation.prix_total=0;
      this.reparation.prix_total=this.reparation.prix_total+piece.prix_unitaire;
      this.reparation.prix_total=  this.reparation.prix_total+ this.reparation.prix_total*this.reparation.tva;
      this.reparation.pieces.push(url+"pieces/"+piece.id+"/");
    })
    this.reparation.intervention=url+"interventions/"+this.reparation.intervention+"/"
    this.reparationService.add(this.reparation).subscribe(response=>{
      let reparation:any=response;
      if(reparation.date_fin!=null) {
        this.panneService.getByUrl(reparation.panne_concerne).subscribe(data => {
          let panne:any=data;
          this.reclamationService.getByUrl(panne.reclamation).subscribe(data => {
            let reclamation: any = data;
            /// rendre en état cloturée
            reclamation.etat = 2;
            this.reclamationService.update(reclamation.id, reclamation).subscribe(data => {
            })
          })
        })
      }

      this.route.navigate(['reparations']);
    }, error => { console.log(error); })
  }
}
