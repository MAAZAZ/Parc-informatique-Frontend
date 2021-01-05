import { Component, OnInit } from '@angular/core';
import {Caracteristique} from '../../Model/Caract';
import {CaracteristiqueService} from '../../services/caracteristiqueservice/caracteristique.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-caracteristique',
  templateUrl: './edit-caracteristique.component.html',
  styleUrls: ['./edit-caracteristique.component.css']
})
export class EditCaracteristiqueComponent implements OnInit {

  caract:Caracteristique=new Caracteristique();
  id:string;

  constructor(private caracteristiqueService: CaracteristiqueService, private route: Router, private routeActive: ActivatedRoute) { }

  ngOnInit(): void {
    this.id=this.routeActive.snapshot.params['id'];
    this.caracteristiqueService.getById(this.id).subscribe(data=>{
      this.caract=data;
    });
  }

  update():void {
    this.caracteristiqueService.update(this.caract.id, this.caract).subscribe(response=>{
      this.route.navigate(['caracteristiques']);
    }, error => { console.log(error); })
  }

}
