import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
  validateUrl = 'http://localhost:3000/api/validate';
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
    this.http.get(this.validateUrl, {params: data, observe: 'response'}).subscribe(
      data => { console.log('success', data);
      this.responseStatus = data.status;
      this.router.navigate(['./dashboard']); },
      error => { this.handleError(error) }
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
