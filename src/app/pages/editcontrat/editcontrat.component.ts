import { Component, OnInit } from '@angular/core';
import {Contrat} from '../../Model/Contrat';
import {ContratService} from '../../services/contratservice/contrat.service';
import {TierService} from '../../services/tierservice/tier.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Tier} from '../../Model/Tier';
import {Intervention_externeService} from '../../services/interventionservice/intervention_externe.service';
import {Intervention_externe} from '../../Model/Intervention';

@Component({
  selector: 'app-editcontrat',
  templateUrl: './editcontrat.component.html',
  styleUrls: ['./editcontrat.component.css']
})
export class EditcontratComponent implements OnInit {

  contrat:Contrat=new Contrat();
  tiers:any;
  tier:Tier=new Tier();
  id:string;
  types:any=['Achat','Réparation','Achat et réparation'];
  type_ancien:string;

  constructor(private contratService: ContratService, private tierService: TierService, private route: Router, private router:ActivatedRoute, private  interventionService: Intervention_externeService) { }

  ngOnInit(): void {
    this.id=this.router.snapshot.params['id'];
    this.contratService.getById(this.id).subscribe(data=>{
      // @ts-ignore
      this.contrat=data;
      this.type_ancien=this.contrat.type;
      this.tierService.getByUrl(this.contrat.fournisseur).subscribe(data=>{
        this.tier=data;
        this.contrat.fournisseur=this.tier.raison_sociale;
      })
    });
    this.tierService.getAll().subscribe(data=>{
      this.tiers=data;
    })
  }

  update():void {
    this.contrat.fournisseur="http://127.0.0.1:8000/api/tiers/"+this.tier.id+"/";
    if(this.type_ancien!=this.contrat.type) {
      if (this.contrat.type != "" + 0) {
        let externe: Intervention_externe = new Intervention_externe();
        externe.prestataire = this.contrat.fournisseur;
        this.interventionService.add(externe).subscribe(data => {
        })
      } else {
        this.interventionService.getAll().subscribe(data => {
          let interventions: any = data;
          interventions.forEach(intervention => {
            if (intervention.prestataire == this.contrat.fournisseur)
              this.interventionService.delete(intervention.id).subscribe(data => {
              })
          })
        })
      }
    }

    this.contratService.update(this.contrat.id, this.contrat).subscribe(response=>{
      this.route.navigate(['contrats']);
    }, error => { console.log(error); })

  }
}
