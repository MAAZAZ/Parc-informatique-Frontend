import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Agent} from '../../Model/Agent';
import {AgentService} from '../../services/agentservice/agent.service';
import {DepartementService} from '../../services/departementservice/departement.service';
import {Intervention_externe, Intervention_interne} from '../../Model/Intervention';
import {Intervention_interneService} from '../../services/interventionservice/intervention_interne.service';

@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.css']
})
export class AddAgentComponent implements OnInit {


  agent:Agent=new Agent();
  roles:any=['Administrateur','Intervenant','Utilisateur'];
  services:any;

  constructor(private agentService: AgentService, private route: Router, private departementService:DepartementService, private intervention: Intervention_interneService) { }

  ngOnInit(): void {
    this.departementService.getAll().subscribe(data=>{
      this.services=data;
    })
  }

  add():void {
    this.agent.username=this.agent.last_name+"."+this.agent.last_name;
    let url="http://127.0.0.1:8000/api/";
    this.agent.service=url+"services/"+this.agent.service+"/";

    if(this.agent.role!=""+0)
      this.agent.password="0000";

    if(this.agent.role==""+0)
      this.agent.is_staff=true;

    this.agentService.add(this.agent).subscribe(response=>{

      let agent:any=response;
      if(this.agent.role=='0' || this.agent.role=='1') {
        let interne: Intervention_interne = new Intervention_interne();
        interne.agent = "http://127.0.0.1:8000/api/agents/" + agent.id + "/";
        this.intervention.add(interne).subscribe(data => {
        })
      }

      this.route.navigate(['agents']);
    }, error => { console.log(error); })
  }

}
