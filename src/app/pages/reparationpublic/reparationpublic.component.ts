import { Component, OnInit } from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {ReparationpublicService} from '../../services/reparationpublicservice/reparationpublic.service';
import {InterventionpublicService} from '../../services/reparationpublicservice/interventionpublic.service';
import {AgentpublicService} from '../../services/agentpublicservice/agentpublic.service';
import {TierpublicService} from '../../services/tierpublicservice/tierpublic.service';
import {PannepublicService} from '../../services/pannepublicservice/pannepublic.service';
import {ReclamationpublicService} from '../../services/reclamationpublicservice/reclamationpublic.service';
import {Reclamation} from '../../Model/Reclamation';
import Swal from "sweetalert2";

@Component({
  selector: 'app-reparationpublic',
  templateUrl: './reparationpublic.component.html',
  styleUrls: ['./reparationpublic.component.css']
})
export class ReparationpublicComponent implements OnInit {

  reparations:any;
  page:number = 1;
  pageSize:number=5;
  length_data:number=0;
  searchText:string;
  reclamation:Reclamation=new Reclamation();
  agents:any;

  constructor(private ngxSpinnerService:NgxSpinnerService, private reparationService: ReparationpublicService, private intervention: InterventionpublicService, private agent: AgentpublicService, private tier: TierpublicService, private panne: PannepublicService, private reclamationService: ReclamationpublicService) { }

  ngOnInit(): void {
    this.ngxSpinnerService.show();

    this.reparationService.getAll().subscribe(response=>{
      this.reparations=response;
      this.reparations.forEach(reparation=>{
        this.panne.getByUrl(reparation.panne_concerne).subscribe(data=>{
          let panne:any=data;
          this.panne.getByUrl(panne.produit).subscribe(data=>{
            let produit:any=data;
            reparation.panne_concerne=produit.designation+" ("+panne.quantite+")";
          })
        })
      })
      this.length_data=this.reparations.length;
      this.reparations.forEach(reparation=>{
        this.intervention.getByUrl(reparation.intervention).subscribe(data=>{
          let int:any=data;
          if(int.resourcetype=="Intervention_interne"){
            this.intervention.getByIdInterventionInterne(int.id).subscribe(data=>{
              let intervention_interne:any=data;
              this.agent.getByUrl(intervention_interne.agent).subscribe(data=>{
                let agent:any=data;
                reparation.intervention=agent.last_name+" "+agent.first_name;
              })
            })
          }
          if(int.resourcetype=="Intervention_externe"){
            this.intervention.getByIdInterventionExterne(int.id).subscribe(data=>{
              let intervention_externe:any=data;
              this.tier.getByUrl(intervention_externe.prestataire).subscribe(data=>{
                let tier:any=data;
                reparation.intervention=tier.raison_sociale;
              })
            })
          }
        })
      })
    });
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.ngxSpinnerService.hide();
    }, 1000)
  }

  add():void{
    let newReclamation:Reclamation=new Reclamation();
    this.agent.getAll().subscribe(data=> {
      this.agents = data;
      this.agents.forEach(agent=>{
        if (agent.matricule == this.reclamation.agent) {
          newReclamation.agent = "http://127.0.0.1:8000/api/agents/" + agent.id + "/";
          // etat d'attente
          newReclamation.etat=0+"";
          newReclamation.description=this.reclamation.description;
          let UpdateReclamtion:Reclamation=new Reclamation();
          this.reclamationService.add(newReclamation).subscribe(data=>{
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              text: 'Nous avons bien reçu votre réclamation et nous vous en remercions.',
              showConfirmButton: false,
              timer: 1500
            })
          })
          this.reclamation=UpdateReclamtion
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            text: 'Le matricule saisie ne figure pas dans la liste des agents de l\'office.',
            showConfirmButton: false,
            timer: 1000
          })
        }
      });
    })
  }

}
