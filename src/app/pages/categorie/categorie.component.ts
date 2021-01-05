import { Component, OnInit } from '@angular/core';
import {MaterielService} from '../../services/categorieservice/materiel.service';
import {LogicielService} from '../../services/categorieservice/logiciel.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {

  logiciels:any;
  materiels:any;
  dtOptions: DataTables.Settings = {};

  constructor(private ngxSpinnerService:NgxSpinnerService, private logicielService: LogicielService, private  materielService: MaterielService) { }

  ngOnInit(): void {
    this.ngxSpinnerService.show();

    this.dtOptions = {
      "language": {
        "url": "//cdn.datatables.net/plug-ins/1.10.21/i18n/French.json"
      },
    };

    this.materielService.getAll().subscribe(response=>{
      this.materiels=response;
    });
    this.logicielService.getAll().subscribe(response=>{
      this.logiciels=response;
    });
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.ngxSpinnerService.hide();
    }, 500)
  }


}
