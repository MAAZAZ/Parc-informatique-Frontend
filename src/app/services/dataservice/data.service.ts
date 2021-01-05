import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  constructor(protected url: string, protected http: HttpClient) {}

  getAll() {
    return this.http.get(this.url);
  }

  getById(resource) {
    return this.http.get(this.url + resource + '/');
  }

  getByUrl(ressource) {
    return this.http.get(ressource);
  }

  add(resource){
    return this.http.post(this.url, resource);
  }

  update(id,resource){
    return this.http.put(this.url + id + '/',resource);
  }

  update_partial(id,resource){
    return this.http.patch(this.url + id + '/',resource);
  }

  delete(resource){
    return this.http.delete(this.url + resource + '/');
  }

}
