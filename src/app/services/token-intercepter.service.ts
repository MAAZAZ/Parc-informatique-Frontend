import { Injectable, Injector } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './authservice/auth.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

// @ts-ignore
export class TokenIntercepterService implements HttpInterceptor{

  constructor(private injector: Injector, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.get("skip")){
      req = req.clone({
        headers: req.headers.delete('skip')
      });
      return next.handle(req);
    }
    let authService = this.injector.get(AuthService);
    let tokenizedReq = req.clone({
      setHeaders : {
        Authorization: `Bearer ${authService.token}`
      }
    })
    return next.handle(tokenizedReq);
  }
}
