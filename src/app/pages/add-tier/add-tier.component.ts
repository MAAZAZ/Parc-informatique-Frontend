import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TierService} from '../../services/tierservice/tier.service';
import {Tier} from '../../Model/Tier';

@Component({
  selector: 'app-add-tier',
  templateUrl: './add-tier.component.html',
  styleUrls: ['./add-tier.component.css']
})
export class AddTierComponent implements OnInit {

  selectedFile=null;
  tier:Tier=new Tier();


  constructor(private tierService: TierService, private route: Router) {
  }

  ngOnInit(): void {
  }

  onFileSelected(event): void{
    this.selectedFile= <File>event.target.files[0];
  }

  add():void {
    const formData=new FormData();
    formData.append('raison_sociale',this.tier.raison_sociale)
    formData.append('specialite',this.tier.specialite)
    formData.append('telephone',this.tier.telephone)
    formData.append('mail',this.tier.mail)
    formData.append('adresse',this.tier.adresse)
    if(this.selectedFile!=null)
      formData.append('logo', this.selectedFile, this.selectedFile.name);
    this.tierService.add(formData).subscribe(response=>{
      this.route.navigate(['/tiers']);
    }, error => { console.log(error); })
  }
}
