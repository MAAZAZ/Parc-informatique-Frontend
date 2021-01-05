import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InterventionpublicService  {

  constructor(private http: HttpClient) { }

  getByUrl(resource) {
    return this.http.get(resource,{headers:{skip:"true"}});
  }

  getByIdInterventionInterne(resource) {
    return this.http.get('http://127.0.0.1:8000/api/interventions%20internes/'+resource+'/',{headers:{skip:"true"}});
  }

  getByIdInterventionExterne(resource) {
    return this.http.get('http://127.0.0.1:8000/api/interventions%20externes/'+resource+'/',{headers:{skip:"true"}});
  }

}
