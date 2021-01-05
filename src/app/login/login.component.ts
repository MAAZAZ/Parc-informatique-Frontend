import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import {UsermanagerService} from '../services/usermanager/usermanager.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform:FormGroup;
  loading:boolean=false;
  submitted:boolean=false;
  returnUrl:string;
  anio: number = new Date().getFullYear();

  constructor(private ngxSpinnerService: NgxSpinnerService , private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private userManager: UsermanagerService) { }

  ngOnInit(): void {

    this.ngxSpinnerService.show();
    this.loginform = this.formBuilder.group(
      {
        username: ['', [Validators.required,Validators.minLength(5)]],
        password: ['', [Validators.required]]
      }
    )

    this.returnUrl=this.route.snapshot.queryParams['returnUrl'] || '/';
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.ngxSpinnerService.hide();
    }, 1000)
  }

  get form(){
    return this.loginform.controls;
  }

  onSubmit(){
    this.submitted=true;
    if(this.loginform.invalid) {
      //this.loginform.controls['password'].setValue("");
      return;
    }
    const username = this.loginform.value.username;
    const password = this.loginform.value.password;
    this.userManager.authenticate(username, password).subscribe(
      result => {
        // Here we are storing the token and refresh token in the localstorage
        localStorage.setItem('token', result['access']);
        localStorage.setItem('refresh', result['refresh']);
        this.router.navigate(['/tableau-de-bord']);
      },
      error => {
        console.log('Login failed');
      }
    );


  }

}
