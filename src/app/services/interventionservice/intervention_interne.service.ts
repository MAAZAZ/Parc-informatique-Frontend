import { Injectable } from '@angular/core';
import {DataService} from '../dataservice/data.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Intervention_interneService extends DataService{

  constructor(http: HttpClient) {
    super('http://127.0.0.1:8000/api/interventions%20internes/', http)
  }
}
