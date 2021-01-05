import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AgentpublicService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get('http://127.0.0.1:8000/api/agents/', {headers:{skip:"true"}});
  }

  getByUrl(resource) {
    return this.http.get(resource,{headers:{skip:"true"}});
  }

}
