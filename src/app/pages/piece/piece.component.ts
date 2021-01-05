import { Component, OnInit } from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {PieceService} from '../../services/pieceservice/piece.service';
import Swal from "sweetalert2";
import {Router} from '@angular/router';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.css']
})
export class PieceComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  pieces:any;

  constructor(private ngxSpinnerService:NgxSpinnerService, private pieceService: PieceService) { }

  ngOnInit(): void {
    this.ngxSpinnerService.show();

    this.dtOptions = {
      "language": {
        "url": "//cdn.datatables.net/plug-ins/1.10.21/i18n/French.json"
      },
    };

    this.pieceService.getAll().subscribe(response=>{
      this.pieces=response;
    });
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.ngxSpinnerService.hide();
    }, 500)
  }

  deletePiece(id){
    Swal.fire({
      title: 'Êtes-vous sûr de supprimer cette pièce ?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    }).then((result) => {
      if (result.value) {
        this.pieceService.delete(id).subscribe(response=>{
          if(response==null){
            window.location.reload();
          }
        })

        Swal.fire(
          'Supprimer!',
          'Cette pièce a été supprimée.',
          'success'
        )
      }
    })
  }

}
