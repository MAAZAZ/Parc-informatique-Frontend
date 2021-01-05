import { Component, OnInit } from '@angular/core';
import {MaterielService} from '../../services/categorieservice/materiel.service';
import {Router} from '@angular/router';
import {Materiel} from '../../Model/Type';

@Component({
  selector: 'app-add-materiel',
  templateUrl: './add-materiel.component.html',
  styleUrls: ['./add-materiel.component.css']
})
export class AddMaterielComponent implements OnInit {

  selectedFile=null;
  materiel:Materiel=new Materiel();

  constructor(private materielService: MaterielService, private route: Router) { }

  ngOnInit(): void {
  }

  onFileSelected(event): void{
    this.selectedFile= <File>event.target.files[0];
  }

  add():void {
    const formData=new FormData();
    formData.append('libelle',this.materiel.libelle)
    if(this.selectedFile!=null)
      formData.append('image', this.selectedFile, this.selectedFile.name);
    this.materielService.add(formData).subscribe(response=>{
      this.route.navigate(['/categories']);
    }, error => { console.log(error); })
  }

}
