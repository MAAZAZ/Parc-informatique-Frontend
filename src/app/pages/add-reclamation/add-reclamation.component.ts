import { Component, OnInit } from '@angular/core';
import {Reclamation} from '../../Model/Reclamation';
import {ReclamationService} from '../../services/reclamationservice/reclamation.service';
import {AgentService} from '../../services/agentservice/agent.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-reclamation',
  templateUrl: './add-reclamation.component.html',
  styleUrls: ['./add-reclamation.component.css']
})
export class AddReclamationComponent implements OnInit {

  reclamation:Reclamation=new Reclamation();
  agents:any;

  constructor(private reclamationService:ReclamationService, private agentService:AgentService, private  route:Router) { }

  ngOnInit(): void {
    this.agentService.getAll().subscribe(data=>{
      this.agents=data;
    })
  }

  add():void{
    let url="http://127.0.0.1:8000/api/";
    // par défault etat initial (0) == en attente
    this.reclamation.etat=""+0;
    this.reclamation.agent=url+"agents/"+this.reclamation.agent+"/";
    this.reclamationService.add(this.reclamation).subscribe(data=>{
      let reclamation:any=data;
      if(reclamation!=null)
        this.route.navigate(['/pannes/nouvelle'], { queryParams : { reclamation : reclamation.id } });
    })
  }

}
