import { Component, OnInit } from '@angular/core';
import {LogicielService} from '../../services/categorieservice/logiciel.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Logiciel} from '../../Model/Type';
import Swal from "sweetalert2";

@Component({
  selector: 'app-detaillogiciel',
  templateUrl: './detaillogiciel.component.html',
  styleUrls: ['./detaillogiciel.component.css']
})
export class DetaillogicielComponent implements OnInit {

  id:string;
  logiciel:Logiciel=new Logiciel();

  constructor(private logicielService: LogicielService, private route:ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.logicielService.getById(this.id).subscribe(data=>{
      this.logiciel = data;
    });
  }

  deleteLogiciel():void{
    Swal.fire({
      title: 'Êtes-vous sûr de supprimer ce logiciel?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    }).then((result) => {
      if (result.value) {
        this.logicielService.delete(this.id).subscribe(response=>{
          if(response==null){
            this.router.navigate(['categories']);
          }
        })

        Swal.fire(
          'Supprimer!',
          'Ce logiciel a été supprimé.',
          'success'
        )
      }
    })
  }

}
