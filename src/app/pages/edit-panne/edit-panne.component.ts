import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Panne} from '../../Model/Panne';
import {PanneService} from '../../services/panneservice/panne.service';
import {ProduitService} from '../../services/produitservice/produit.service';
import {Produit} from '../../Model/Produit';

@Component({
  selector: 'app-edit-panne',
  templateUrl: './edit-panne.component.html',
  styleUrls: ['./edit-panne.component.css']
})
export class EditPanneComponent implements OnInit {

  panne:Panne=new Panne();
  produit:Produit=new Produit();
  id:string;

  constructor(private panneService: PanneService, private produitService: ProduitService, private route: Router, private routeActive: ActivatedRoute) { }

  ngOnInit(): void {
    this.id=this.routeActive.snapshot.params['id'];
    this.panneService.getById(this.id).subscribe(data=>{
      this.panne=data;
      this.produitService.getByUrl(this.panne.produit).subscribe(data=>{
        this.produit=data;
      })
    });
  }

  update():void {
    this.panneService.update(this.panne.id, this.panne).subscribe(response=>{
      this.route.navigate(['pannes']);
    }, error => { console.log(error); })
  }

}
