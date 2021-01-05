import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TierpublicService {

  constructor(private http: HttpClient) { }

  getByUrl(resource) {
    return this.http.get(resource,{headers:{skip:"true"}});
  }

}
