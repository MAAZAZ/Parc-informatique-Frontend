import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DataService} from '../dataservice/data.service';

@Injectable({
  providedIn: 'root'
})

export class CategorieService extends DataService{

  constructor(http: HttpClient) {
    super('http://127.0.0.1:8000/api/types/', http);
  }
}

