import { Component, OnInit } from '@angular/core';
import {TierService} from '../../services/tierservice/tier.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-tier',
  templateUrl: './tier.component.html',
  styleUrls: ['./tier.component.css']
})
export class TierComponent implements OnInit {

  tiers:any;
  dtOptions: DataTables.Settings = {};

  constructor(private ngxSpinnerService:NgxSpinnerService, private tierService: TierService) { }

  ngOnInit(): void {
    this.ngxSpinnerService.show();

    this.dtOptions = {
      "language": {
        "url": "//cdn.datatables.net/plug-ins/1.10.21/i18n/French.json"
      },
    };

    this.tierService.getAll().subscribe(response=>{
      this.tiers=response;
    });
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.ngxSpinnerService.hide();
    }, 500)
  }

}
