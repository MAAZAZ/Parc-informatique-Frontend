import { Component, OnInit } from '@angular/core';
import {Intervention_interneService} from '../../services/interventionservice/intervention_interne.service';
import {AgentService} from '../../services/agentservice/agent.service';
import {Router} from '@angular/router';
import {Agent} from '../../Model/Agent';
import {Intervention_interne} from '../../Model/Intervention';

@Component({
  selector: 'app-add-intervention-interne',
  templateUrl: './add-intervention-interne.component.html',
  styleUrls: ['./add-intervention-interne.component.css']
})
export class AddInterventionInterneComponent implements OnInit {

  interne:Intervention_interne=new Intervention_interne();
  agents:any;

  constructor(private interneService: Intervention_interneService, private agentService: AgentService, private route: Router) { }

  notUser(agent):boolean{
    if(agent.role!=2)
      return true;
    return false
  }

  UserExiste(agent,agent_intervenant):boolean{
    if("http://127.0.0.1:8000/api/agents/"+agent+"/"==agent_intervenant)
      return true;
    return false
  }

  ngOnInit(): void {

    this.agentService.getAll().subscribe(data=>{
      this.agents=data;
      this.agents=this.agents.filter(agent=> this.notUser(agent));
    })

    this.interneService.getAll().subscribe(data=>{
      let inter_interne:any=data;
      inter_interne.forEach(agent_intervenant=>{
        this.agents=this.agents.filter(agent=>this.UserExiste(agent,agent_intervenant))
      })
    })

  }

  add():void{
    this.interne.agent="http://127.0.0.1:8000/api/agents/"+this.agents[this.interne.agent].id+"/";
    this.interneService.add(this.interne).subscribe(data=>{
      this.route.navigate(['interventions']);
    })
  }

}
