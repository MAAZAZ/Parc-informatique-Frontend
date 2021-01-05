import {DataService} from '../dataservice/data.service';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LogicielService extends DataService{

  constructor(http: HttpClient) {
    super('http://127.0.0.1:8000/api/logiciels/', http);
  }
}
