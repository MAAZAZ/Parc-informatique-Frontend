import { Component, OnInit } from '@angular/core';
import {Marque} from '../../Model/Marque';
import {MarqueService} from '../../services/marqueservice/marque.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-marque',
  templateUrl: './edit-marque.component.html',
  styleUrls: ['./edit-marque.component.css']
})
export class EditMarqueComponent implements OnInit {

  selectedFile=null;
  marque:Marque=new Marque();
  id:string;
  isChanged:boolean=false;
  application:File;

  constructor(private marqueService: MarqueService, private route: Router, private routeActive: ActivatedRoute) { }

  ngOnInit(): void {
    this.id=this.routeActive.snapshot.params['id'];
    this.marqueService.getById(this.id).subscribe(data=>{
      this.marque=data;
    });
  }

  onFileSelected(event): void{
    this.selectedFile= <File>event.target.files[0];
    this.isChanged=true;
  }
  update():void {
    const formData=new FormData();
    formData.append('id',this.marque.id.toString())
    formData.append('designation',this.marque.designation)
    if(this.isChanged)
      formData.append('logo', this.selectedFile, this.selectedFile.name);
    this.marqueService.update(this.id, formData).subscribe(response=>{
      this.route.navigate(['/marques']);
    }, error => { console.log(error); })
  }
}
