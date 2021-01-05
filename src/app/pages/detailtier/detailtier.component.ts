import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {Tier} from '../../Model/Tier';
import {TierService} from '../../services/tierservice/tier.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-detailtier',
  templateUrl: './detailtier.component.html',
  styleUrls: ['./detailtier.component.css']
})
export class DetailtierComponent implements OnInit {

  tier:Tier=new Tier();
  id:string;

  constructor(private tierService:TierService, private route:ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.tierService.getById(this.id).subscribe(data=> {
      this.tier = data;
    });
  }

  deleteTier():void{
    Swal.fire({
      title: 'Êtes-vous sûr de supprimer ce fournisseur/prestataire?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    }).then((result) => {
      if (result.value) {
        this.tierService.delete(this.id).subscribe(response=>{
          if(response==null){
            this.router.navigate(['tiers']);
          }
        })

        Swal.fire(
          'Supprimer!',
          'Ce fournisseur/prestataire a été supprimé.',
          'success'
        )
      }
    })
  }


}
