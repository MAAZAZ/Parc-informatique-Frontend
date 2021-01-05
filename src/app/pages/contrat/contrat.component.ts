import { Component, OnInit } from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import Swal from "sweetalert2";
import {ContratService} from '../../services/contratservice/contrat.service';
import {TierService} from '../../services/tierservice/tier.service';
import {Tier} from '../../Model/Tier';

@Component({
  selector: 'app-contrat',
  templateUrl: './contrat.component.html',
  styleUrls: ['./contrat.component.css']
})
export class ContratComponent implements OnInit {

  contrats:any;
  dtOptions: DataTables.Settings = {};
  tier:Tier=new Tier();

  constructor(private ngxSpinnerService:NgxSpinnerService, private contratService: ContratService, private tierService: TierService) { }

  ngOnInit(): void {
    this.ngxSpinnerService.show();

    this.dtOptions = {
      "language": {
        "url": "//cdn.datatables.net/plug-ins/1.10.21/i18n/French.json"
      },
    };

    this.contratService.getAll().subscribe(response=>{
      this.contrats=response;
      this.contrats.forEach(contrat=>{
        this.tierService.getByUrl(contrat.fournisseur).subscribe(data=>{
          this.tier=data;
          contrat.fournisseur=this.tier.raison_sociale;
        })
      })
    });
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.ngxSpinnerService.hide();
    }, 500)
  }

}
