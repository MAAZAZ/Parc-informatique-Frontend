import { Component, OnInit } from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {ReclamationpublicService} from '../../services/reclamationpublicservice/reclamationpublic.service';
import {Reclamation} from '../../Model/Reclamation';
import {AgentpublicService} from '../../services/agentpublicservice/agentpublic.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reclamation-public',
  templateUrl: './reclamation-public.component.html',
  styleUrls: ['./reclamation-public.component.css']
})
export class ReclamationPublicComponent implements OnInit {

  reclamation:Reclamation=new Reclamation();
  agents:any;

  constructor(private route: Router, private ngxSpinnerService:NgxSpinnerService, private reclamationService: ReclamationpublicService, private agentpublicService: AgentpublicService) { }

  ngOnInit(): void {
    this.ngxSpinnerService.show()

    this.agentpublicService.getAll().subscribe(data=>{
      this.agents=data;
    })

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.ngxSpinnerService.hide();
    }, 1000)
  }

  add():void{
    let newReclamation:Reclamation=new Reclamation();
    for(let agent of this.agents){
      if(agent.matricule==this.reclamation.agent){
        newReclamation.agent="http://127.0.0.1:8000/api/agents/"+agent.id+"/";
        break;
      }
      else{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Le matricule saisie n\'existe pas.',
          showConfirmButton: false,
          timer: 1500
        })
        return;
      }
    }
    // etat d'attente
    newReclamation.etat=0+"";
    newReclamation.description=this.reclamation.description;
    let UpdateReclamtion:Reclamation=new Reclamation();
    this.reclamation=UpdateReclamtion;
    this.reclamationService.add(newReclamation).subscribe(data=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Votre réclamation à été envoyée avec succès',
        showConfirmButton: false,
        timer: 1500
      })
      this.route.navigate(['public']);
    })
  }

}
