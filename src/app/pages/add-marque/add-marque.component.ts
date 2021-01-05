import { Component, OnInit } from '@angular/core';
import {MarqueService} from '../../services/marqueservice/marque.service';
import {Marque} from '../../Model/Marque';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-marque',
  templateUrl: './add-marque.component.html',
  styleUrls: ['./add-marque.component.css']
})
export class AddMarqueComponent implements OnInit {
  selectedFile=null;
  marque:Marque=new Marque();

  constructor(private marqueService: MarqueService, private route: Router) { }

  ngOnInit(): void {
  }

  onFileSelected(event): void{
    this.selectedFile= <File>event.target.files[0];
  }

  add():void {
      const formData=new FormData();
      formData.append('designation',this.marque.designation)
      if(this.selectedFile!=null)
        formData.append('logo', this.selectedFile, this.selectedFile.name);
      this.marqueService.add(formData).subscribe(response=>{
        this.route.navigate(['/marques']);
      }, error => { console.log(error); })
  }

}
