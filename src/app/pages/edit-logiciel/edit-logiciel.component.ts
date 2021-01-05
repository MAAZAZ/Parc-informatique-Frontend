import { Component, OnInit } from '@angular/core';
import {Logiciel} from '../../Model/Type';
import {LogicielService} from '../../services/categorieservice/logiciel.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-logiciel',
  templateUrl: './edit-logiciel.component.html',
  styleUrls: ['./edit-logiciel.component.css']
})
export class EditLogicielComponent implements OnInit {

  selectedFile=null;
  logiciel:Logiciel=new Logiciel();
  ischanged:boolean=false;
  id:string;


  constructor(private logicielService: LogicielService, private route: Router, private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id=this.router.snapshot.params['id'];
    this.logicielService.getById(this.id).subscribe(data=>{
      this.logiciel = data;
    });
  }

  onFileSelected(event): void{
    this.ischanged=true;
    this.selectedFile= <File>event.target.files[0];
  }

  update():void {
    const formData=new FormData();
    formData.append('libelle',this.logiciel.libelle)
    // @ts-ignore
    formData.append('date_installation',this.logiciel.date_installation)
    formData.append('version',this.logiciel.version)
    formData.append('description',this.logiciel.description)
    if(this.selectedFile!=null && this.ischanged==true)
      formData.append('image', this.selectedFile, this.selectedFile.name);
    this.logicielService.update(this.id, formData).subscribe(response=>{
      this.route.navigate(['/categories/logiciel/'+this.id]);
    }, error => { console.log(error); })
  }

}
