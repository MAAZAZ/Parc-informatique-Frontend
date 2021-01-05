import { Component, OnInit } from '@angular/core';
import {Marque} from '../../Model/Marque';
import {MarqueService} from '../../services/marqueservice/marque.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Piece} from '../../Model/Piece';
import {PieceService} from '../../services/pieceservice/piece.service';

@Component({
  selector: 'app-edit-piece',
  templateUrl: './edit-piece.component.html',
  styleUrls: ['./edit-piece.component.css']
})
export class EditPieceComponent implements OnInit {


  selectedFile=null;
  piece:Piece=new Piece();
  id:string;
  isChanged:boolean=false;
  application:File;

  constructor(private pieceService: PieceService, private route: Router, private routeActive: ActivatedRoute) { }

  ngOnInit(): void {
    this.id=this.routeActive.snapshot.params['id'];
    this.pieceService.getById(this.id).subscribe(data=>{
      this.piece=data;
    });
  }

  onFileSelected(event): void{
    this.selectedFile= <File>event.target.files[0];
    this.isChanged=true;
  }
  update():void {
    const formData=new FormData();
    formData.append('id',this.piece.id.toString())
    formData.append('reference',this.piece.reference)
    formData.append('libelle',this.piece.libelle)
    formData.append('prix_unitaire',""+this.piece.prix_unitaire);
    if(this.isChanged)
      formData.append('image', this.selectedFile, this.selectedFile.name);
    this.pieceService.update(this.id, formData).subscribe(response=>{
      this.route.navigate(['pieces']);
    }, error => { console.log(error); })
  }
}
