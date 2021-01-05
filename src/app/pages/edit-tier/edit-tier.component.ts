import { Component, OnInit } from '@angular/core';
import {Tier} from '../../Model/Tier';
import {TierService} from '../../services/tierservice/tier.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-tier',
  templateUrl: './edit-tier.component.html',
  styleUrls: ['./edit-tier.component.css']
})
export class EditTierComponent implements OnInit {

  selectedFile=null;
  tier:Tier=new Tier();
  isChanged:boolean=false;
  id:string;

  constructor(private tierService: TierService, private route: Router, private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id=this.router.snapshot.params['id'];
    this.tierService.getById(this.id).subscribe(data=>{
      this.tier = data;
    });
  }

  onFileSelected(event): void{
    this.isChanged=true;
    this.selectedFile= <File>event.target.files[0];
  }

  update():void {
    const formData=new FormData();
    formData.append('raison_sociale',this.tier.raison_sociale)
    formData.append('specialite',this.tier.specialite)
    formData.append('telephone',this.tier.telephone)
    formData.append('mail',this.tier.mail)
    formData.append('adresse',this.tier.adresse)
    if(this.selectedFile!=null && this.isChanged==true)
      formData.append('logo', this.selectedFile, this.selectedFile.name);
    this.tierService.update(this.id,formData).subscribe(response=>{
      this.route.navigate(['/tiers/'+this.id]);
    }, error => { console.log(error); })
  }

}
