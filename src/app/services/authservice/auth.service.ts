import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _token: string;

  constructor(public jwtHelper: JwtHelperService) {
    this._token = localStorage.getItem('token');
  }

  isAuthentificated(): Boolean {
    this._token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(this._token);
  }

  get token(): string {
    return localStorage.getItem('token');
  }

  logoutUser(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
  }

}
