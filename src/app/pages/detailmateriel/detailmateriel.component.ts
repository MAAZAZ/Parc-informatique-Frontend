import { Component, OnInit } from '@angular/core';
import {MaterielService} from '../../services/categorieservice/materiel.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Materiel} from '../../Model/Type';
import Swal from "sweetalert2";

@Component({
  selector: 'app-detailmateriel',
  templateUrl: './detailmateriel.component.html',
  styleUrls: ['./detailmateriel.component.css']
})
export class DetailmaterielComponent implements OnInit {

  id:string;
  materiel:Materiel=new Materiel();

  constructor(private materielService:MaterielService, private route:ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.materielService.getById(this.id).subscribe(data=>{
      this.materiel = data;
    });
  }

  deleteMateriel():void{
    Swal.fire({
      title: 'Êtes-vous sûr de supprimer ce materiel?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    }).then((result) => {
      if (result.value) {
        this.materielService.delete(this.id).subscribe(response=>{
          if(response==null){
            this.router.navigate(['categories']);
          }
        })

        Swal.fire(
          'Supprimer!',
          'Ce matériel a été supprimé.',
          'success'
        )
      }
    })
  }

}
