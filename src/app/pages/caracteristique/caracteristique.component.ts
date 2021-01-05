import { Component, OnInit } from '@angular/core';
import {CaracteristiqueService} from '../../services/caracteristiqueservice/caracteristique.service';
import Swal from "sweetalert2";
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-caracteristique',
  templateUrl: './caracteristique.component.html',
  styleUrls: ['./caracteristique.component.css']
})
export class CaracteristiqueComponent implements OnInit {

  caracteristiques:any;
  dtOptions: DataTables.Settings = {};

  constructor(private ngxSpinnerService:NgxSpinnerService, private caracteristiqueService: CaracteristiqueService) { }

  ngOnInit(): void {
    this.ngxSpinnerService.show();

    this.dtOptions = {
      "language": {
        "url": "//cdn.datatables.net/plug-ins/1.10.21/i18n/French.json"
      },
    };

    this.caracteristiqueService.getAll().subscribe(response=>{
      this.caracteristiques=response;
    });
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.ngxSpinnerService.hide();
    }, 500)
  }

  deleteCaracteristique(id):void{
    Swal.fire({
      title: 'Êtes-vous sûr de supprimer cette caractéristique ?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    }).then((result) => {
      if (result.value) {
        this.caracteristiqueService.delete(id).subscribe(response=>{
          if(response==null){
            window.location.reload();
          }
        })

        Swal.fire(
          'Supprimer!',
          'Cette caractéristique a été supprimée.',
          'success'
        )
      }
    })
  }

}
