import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PannepublicService {

  constructor(private http: HttpClient) { }

  getByUrl(url) {
    return this.http.get(url,{headers:{skip:"true"}});
  }

}
