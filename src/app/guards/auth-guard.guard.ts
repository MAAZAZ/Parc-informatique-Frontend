import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
} from '@angular/router';
import {AuthService} from '../services/authservice/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {
  }

  canActivate() : boolean {
    if (!this.auth.isAuthentificated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
