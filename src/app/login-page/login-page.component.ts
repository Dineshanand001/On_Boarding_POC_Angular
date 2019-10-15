import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Resp } from './resp';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
  validateUrl = 'http://localhost:10101/login';
  responseStatus: number;
  flag: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  
  validateCred() {
    let data = {cn: `${this.loginForm.get('email').value}` , userPassword:`${this.loginForm.get('password').value}`};
    //this.http.get(this.validateUrl, {params: data, observe: 'response'}).subscribe(
    this.http.get<Resp>(this.validateUrl, {params: data}).subscribe(
      resp => { console.log('success', resp);
      sessionStorage.setItem('Id_token',resp.token);
      //this.responseStatus = data.status;
      this.router.navigate(['./dashboard']); },
      //error => { this.handleError(error) 
      error => { console.log(error)}
    );
  }
    

  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }

}
