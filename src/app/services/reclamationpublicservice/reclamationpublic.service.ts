import { Injectable } from '@angular/core';
import {DataService} from '../dataservice/data.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReclamationpublicService {

  constructor(private http: HttpClient) {}

  add(resource) {
    return this.http.post('http://127.0.0.1:8000/api/reclamations/', resource,{headers:{skip:"true"}});
  }

}
