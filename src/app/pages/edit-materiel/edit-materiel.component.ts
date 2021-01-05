import { Component, OnInit } from '@angular/core';
import {Materiel} from '../../Model/Type';
import {MaterielService} from '../../services/categorieservice/materiel.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-materiel',
  templateUrl: './edit-materiel.component.html',
  styleUrls: ['./edit-materiel.component.css']
})
export class EditMaterielComponent implements OnInit {

  id:string;
  materiel:Materiel=new Materiel();
  selectedFile=null;
  isChanged:boolean=false;

  constructor(private materielService: MaterielService, private route: Router, private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.id=this.router.snapshot.params['id'];
    this.materielService.getById(this.id).subscribe(data=>{
      this.materiel = data;
    });
  }

  onFileSelected(event): void{
    this.isChanged=true;
    this.selectedFile= <File>event.target.files[0];
  }

  update():void {
    const formData=new FormData();
    formData.append('libelle',this.materiel.libelle)
    if(this.selectedFile!=null && this.isChanged==true)
      formData.append('image', this.selectedFile, this.selectedFile.name);
    this.materielService.update(this.id, formData).subscribe(response=>{
      this.route.navigate(['/categories/materiel/'+this.id]);
    }, error => { console.log(error); })
  }
}
