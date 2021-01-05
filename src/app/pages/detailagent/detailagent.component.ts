import { Component, OnInit } from '@angular/core';
import {AgentService} from '../../services/agentservice/agent.service';
import {DepartementService} from '../../services/departementservice/departement.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Agent} from '../../Model/Agent';
import {Service} from '../../Model/Service';
import Swal from "sweetalert2";
import {Intervention_interneService} from '../../services/interventionservice/intervention_interne.service';
import { Intervention_interne} from '../../Model/Intervention';

@Component({
  selector: 'app-detailagent',
  templateUrl: './detailagent.component.html',
  styleUrls: ['./detailagent.component.css']
})
export class DetailagentComponent implements OnInit {

  id:string;
  agent:Agent=new Agent();
  service:Service=new Service();
  modifier:boolean=true;
  services:any;
  password:string=null;
  roles:any=['Administrateur','Intervenant','Utilisateur'];
  ancienrole:string;

  constructor(private route: Router, private router: ActivatedRoute, private agentService:AgentService, private departementService:DepartementService, private interventionService: Intervention_interneService) { }

  ngOnInit(): void {
    this.id=this.router.snapshot.params['id'];
    this.agentService.getById(this.id).subscribe(response=>{
      this.agent=response;
      this.ancienrole=this.agent.role;
      this.departementService.getByUrl(this.agent.service).subscribe(service=>{
        this.service=service
        this.agent.service=""+this.service.id;
      })
    })
    this.departementService.getAll().subscribe(data=>{
      this.services=data;
    })
  }

  changerModifer(){
    this.modifier=!this.modifier;
  }

  modifierAgent(){
    let url="http://127.0.0.1:8000/api/";
    let ancien_id_service=this.agent.service;
    this.agent.service=url+"services/"+this.agent.service+"/";
    if(this.password!=null)
        this.agent.password=this.password;
    if(this.agent.role==""+0)
      this.agent.is_staff=true;

    if(this.ancienrole!=this.agent.role){
      if (this.agent.role != "" + 2) {
        let interne: Intervention_interne = new Intervention_interne();
        interne.agent = "http://127.0.0.1:8000/api/agents/"+this.agent.id+"/";
        this.interventionService.add(interne).subscribe(data => {})
      } else {
        this.interventionService.getAll().subscribe(data => {
          let interventions: any = data;
          interventions.forEach(intervention => {
            if (intervention.agent == "http://127.0.0.1:8000/api/agents/"+this.agent.id+"/")
              this.interventionService.delete(intervention.id).subscribe(data => {
              })
          })
        })
      }
    }

    this.agentService.update(this.agent.id, this.agent).subscribe(data=>{
      return data;
    })
    this.agent.service=ancien_id_service;
    this.modifier=!this.modifier;
  }

  deleteAgent(){
    Swal.fire({
      title: 'Êtes-vous sûr de supprimer cet agent?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    }).then((result) => {
      if (result.value) {
        this.agentService.delete(this.id).subscribe(response=>{
          if(response==null){
            this.route.navigate(['agents']);
          }
        })

        Swal.fire(
          'Supprimer!',
          'Cet agent a été supprimé avec succès.',
          'success'
        )
      }
    })
  }

}
