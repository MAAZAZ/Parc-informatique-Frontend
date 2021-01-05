import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Caracteristique} from '../../Model/Caract';
import {CaracteristiqueService} from '../../services/caracteristiqueservice/caracteristique.service';

@Component({
  selector: 'app-add-caracteristique',
  templateUrl: './add-caracteristique.component.html',
  styleUrls: ['./add-caracteristique.component.css']
})
export class AddCaracteristiqueComponent implements OnInit {

  caract:Caracteristique=new Caracteristique();

  constructor(private caracteristiqueService: CaracteristiqueService, private route: Router) { }

  ngOnInit(): void {
  }

  add():void {
    this.caracteristiqueService.add(this.caract).subscribe(response=>{
      this.route.navigate(['caracteristiques']);
    }, error => { console.log(error); })
  }
}
