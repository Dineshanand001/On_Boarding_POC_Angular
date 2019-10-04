import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { User } from './user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signupForm: FormGroup;
  postgetUrl = 'http://localhost:3030/api/user';
  user: User;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required, Validators.maxLength(40)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      role: ['', [Validators.required]],
      manager: [null],
      director: [null]
    });
    this.formControlValueChanged();
  }


  formControlValueChanged() {
    let flag;
    const manager = this.signupForm.get('manager');
    const director = this.signupForm.get('director');
    this.signupForm.get('role').valueChanges.subscribe(
      (mode: string) => {
        if (mode === 'Developer' || mode === 'Tester') {
          manager.setValidators([Validators.required]);
          flag = 0;
        }
        else if (mode === 'Manager') {
          director.setValidators([Validators.required]);
          flag = 1;
          
        }
        (flag === '0') ? 'manager.updateValueAndValidity()' : 'director.updateValueAndValidity()';
        });
  }

  save() {
    alert("Your input has been submitted.");
    const result: User = Object.assign({}, this.signupForm.value);
    const body = 'Dinesh';
    console.log(result);
    console.log(this.signupForm);
    console.log('Saved: ' + JSON.stringify(this.signupForm.value));
    this.http.post(this.postgetUrl, body, {
      headers: new HttpHeaders({
           'Content-Type':  'application/json',
         })
    }).subscribe(
      data => { console.log('success', data);},
      error => { this.handleError(error) }
    );
    this.signupForm.reset();
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
