import { Component, OnInit } from '@angular/core';
import {MarqueService} from '../../services/marqueservice/marque.service';
import {NgxSpinnerService} from 'ngx-spinner';
import Swal from "sweetalert2";
import { Router } from '@angular/router';

@Component({
  selector: 'app-marque',
  templateUrl: './marque.component.html',
  styleUrls: ['./marque.component.css']
})
export class MarqueComponent implements OnInit {

  marques:any;
  constructor(private ngxSpinnerService:NgxSpinnerService, private marqueService: MarqueService) { }

  ngOnInit(): void {
    this.ngxSpinnerService.show();
    this.marqueService.getAll().subscribe(response=>{
      this.marques=response;
    });
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.ngxSpinnerService.hide();
    }, 500)
  }


  deleteMarque(id):void{
    Swal.fire({
      title: 'Êtes-vous sûr de supprimer cette marque ?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    }).then((result) => {
      if (result.value) {
        this.marqueService.delete(id).subscribe(response=>{
          if(response==null){
            window.location.reload();
          }
        })

        Swal.fire(
          'Supprimer!',
          'Cette marque a été supprimée.',
          'success'
        )
      }
    })
  }

}
