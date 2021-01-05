import { Component, OnInit } from '@angular/core';
import {Logiciel} from '../../Model/Type';
import {Router} from '@angular/router';
import {LogicielService} from '../../services/categorieservice/logiciel.service';

@Component({
  selector: 'app-add-logiciel',
  templateUrl: './add-logiciel.component.html',
  styleUrls: ['./add-logiciel.component.css']
})
export class AddLogicielComponent implements OnInit {

  selectedFile=null;
  logiciel:Logiciel=new Logiciel();


  constructor(private logicielService: LogicielService, private route: Router) {
  }

  ngOnInit(): void {
  }

  onFileSelected(event): void{
    this.selectedFile= <File>event.target.files[0];
  }

  add():void {
    const formData=new FormData();
    formData.append('libelle',this.logiciel.libelle)
    // @ts-ignore
    formData.append('date_installation',this.logiciel.date_installation)
    formData.append('version',this.logiciel.version)
    formData.append('description',this.logiciel.description)
    if(this.selectedFile!=null)
      formData.append('image', this.selectedFile, this.selectedFile.name);
    this.logicielService.add(formData).subscribe(response=>{
      this.route.navigate(['/categories']);
    }, error => { console.log(error); })
  }

}
