import { Component, OnInit } from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {AgentService} from '../../services/agentservice/agent.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  agents:any;

  constructor(private ngxSpinnerService:NgxSpinnerService, private agentService: AgentService) { }

  ngOnInit(): void {
    this.ngxSpinnerService.show();

    this.dtOptions = {
      "language": {
        "url": "//cdn.datatables.net/plug-ins/1.10.21/i18n/French.json"
      },
    };

    this.agentService.getAll().subscribe(response=>{
      this.agents=response;
    });
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.ngxSpinnerService.hide();
    }, 500)
  }


}
