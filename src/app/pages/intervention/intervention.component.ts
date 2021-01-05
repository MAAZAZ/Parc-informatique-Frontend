import { Component, OnInit } from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {Intervention_interneService} from '../../services/interventionservice/intervention_interne.service';
import {Intervention_externeService} from '../../services/interventionservice/intervention_externe.service';
import {Agent} from '../../Model/Agent';
import {Tier} from '../../Model/Tier';
import {AgentService} from '../../services/agentservice/agent.service';
import {TierService} from '../../services/tierservice/tier.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-intervention',
  templateUrl: './intervention.component.html',
  styleUrls: ['./intervention.component.css']
})
export class InterventionComponent implements OnInit {

  internes: any;
  externes: any;
  agent: Agent = new Agent();
  prestataire: Tier = new Tier();
  page:number = 1;
  pageSize:number=5;
  length_data_in:number=0;
  length_data_ex:number=0;
  searchText:string;
  searchText2:string;

  constructor(private ngxSpinnerService: NgxSpinnerService, private intervention_interne: Intervention_interneService, private intervention_externe: Intervention_externeService, private agentService: AgentService, private tierService: TierService) {
  }

  ngOnInit(): void {
    this.ngxSpinnerService.show();
    this.intervention_interne.getAll().subscribe(response => {
      this.internes = response;
      this.length_data_in=this.internes.length;
      this.internes.forEach(interne => {
        this.agentService.getByUrl(interne.agent).subscribe(data => {
          this.agent = data;
          interne.agent = this.agent;
        })
      })
    });

    this.intervention_externe.getAll().subscribe(response => {
      this.externes = response;
      this.length_data_ex=this.externes.length;
      this.externes.forEach(externe => {
        this.tierService.getByUrl(externe.prestataire).subscribe(data => {
          this.prestataire = data;
          externe.prestataire = this.prestataire;
        })
      })

    });

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.ngxSpinnerService.hide();
    }, 500)
  }
}
