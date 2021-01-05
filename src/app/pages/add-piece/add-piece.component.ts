import { Component, OnInit } from '@angular/core';;
import {Router} from '@angular/router';
import {Piece} from '../../Model/Piece';
import {PieceService} from '../../services/pieceservice/piece.service';

@Component({
  selector: 'app-add-piece',
  templateUrl: './add-piece.component.html',
  styleUrls: ['./add-piece.component.css']
})
export class AddPieceComponent implements OnInit {

  selectedFile=null;
  piece:Piece=new Piece();

  constructor(private pieceService: PieceService, private route: Router) { }

  ngOnInit(): void {
  }

  onFileSelected(event): void{
    this.selectedFile= <File>event.target.files[0];
  }

  add():void {
    const formData=new FormData();
    formData.append('reference',this.piece.reference)
    formData.append('libelle',this.piece.libelle)
    formData.append('prix_unitaire',""+this.piece.prix_unitaire)
    if(this.selectedFile!=null)
      formData.append('image', this.selectedFile, this.selectedFile.name);
    this.pieceService.add(formData).subscribe(response=>{
      this.route.navigate(['/pieces']);
    }, error => { console.log(error); })
  }

}
