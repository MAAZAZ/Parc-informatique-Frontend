import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReparationpublicService  {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get('http://127.0.0.1:8000/api/reparationspublic/',{headers:{skip:"true"}});
  }

}
