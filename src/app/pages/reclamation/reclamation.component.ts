import { Component, OnInit } from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {ReclamationService} from '../../services/reclamationservice/reclamation.service';
import {AgentService} from '../../services/agentservice/agent.service';
import {Agent} from '../../Model/Agent';
import {Type} from '../../Model/Type';
import Swal from "sweetalert2";
import {Router} from '@angular/router';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent implements OnInit {

  reclamations:any;
  agent:Agent=new Agent();
  type:Type=new Type()
  reclamation:any;
  page:number = 1;
  pageSize:number=5;
  length_data:number=0;
  searchText:string;

  constructor(private ngxSpinnerService:NgxSpinnerService,private reclamationService: ReclamationService, private agentService:AgentService, private router:Router) { }

  ngOnInit(): void {
    this.ngxSpinnerService.show();
    this.reclamationService.getAll().subscribe(response=>{
      this.reclamations=response;
      this.length_data=this.reclamations.length;
      this.reclamations.forEach(reclamation=>{
        this.agentService.getByUrl(reclamation.agent).subscribe(data=>{
          this.agent=data;
          reclamation.agent=this.agent.last_name+" "+this.agent.first_name;
        })
      })
    });
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.ngxSpinnerService.hide();
    }, 500)
  }

  deleteReclamation(id){
    Swal.fire({
      title: 'Êtes-vous sûr de supprimer cette réclamation ?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non'
    }).then((result) => {
      if (result.value) {
        this.reclamationService.delete(id).subscribe(response=>{
          if(response==null){
            window.location.reload();
          }
        })

        Swal.fire(
          'Supprimer!',
          'Cette réclamation a été supprimée.',
          'success'
        )
      }
    })
  }

  getEtatClass(t):string{
    let str="btn ";
    if(t=="0")
      str+="btn-info"
    else if(t=="1")
      str+="btn-success"
    else if(t=="2")
      str+="btn-danger"
    else
      str+="btn-default"
    return str;
  }

  getIconClass(t):string{
    let str="nc-icon ";
    if(t=="0")
      str+="nc-cloud-upload-94"
    else if(t=="1")
      str+="nc-refresh-69"
    else if(t=="2")
      str+="nc-check-2"
    else
      str+="nc-simple-remove"
    return str;
  }

   DetailReclamation(id){
    this.reclamationService.getById(id).subscribe(data=>{
      this.reclamation=data;
    })
     if(this.reclamation!=null)
      Swal.fire({
        icon: 'info',
        title: 'description',
        'confirmButtonText':'Fermer',
        html: ' <div class="container mt-2"><p class="text-white text-left text-justify bg-dark p-2">'+this.reclamation.description+'</p></div>',
      })
  }

  ChangeEtat(id):void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Êtes-vous sûr de traiter cette réclamation ?',
      footer: "<div class='row'><div class='col-md-12 text-left'><u>Oui</u>&nbsp;:&nbsp;" +
        "<p class='text-justify'> vous serez rediger vers une formule pour remplir les informations concernant ce/s produit(s) défectueux!</p>"+
        "</div>"+"<div class='col-md-12 text-left'><u>Non</u>&nbsp;:&nbsp;" +
        "<p class='text-justify'> la réclamation reste en état d'attente et elle ne sera pas traité actuellement!</p>"+
        "</div></div>",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title:'Attention',
          text: 'Cette réclamation sera changée vers l\'état de traitement si vous sauvegardez cette déclaration.',
          showConfirmButton: false,
          timer: 1000
        })

        // @ts-ignore
        this.router.navigate(['/pannes/nouvelle'], { queryParams : { reclamation : id } });

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Annuler',
          'Cette réclamation reste encore en état d\'attente.',
          'error'
        )
      }
    })
  }

}
