import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { User } from './user';
import { RolesResponseType } from './responsetype';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signupForm: FormGroup;
  postgetUrl = 'http://localhost:3030/api/user';
  Director: String[]; 
  Manager : any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: [''],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      role: ['', [Validators.required]],
      manager: [null],
      director: [null]
    });
    this.getManagers();
    this.formControlValueChanged();
  }


  formControlValueChanged(): void {
    let flag: number;
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
        (flag === 0) ? 'manager.updateValueAndValidity()' : 'director.updateValueAndValidity()';
        });
  }

  save() {
    let user = new User();
    alert("Your input has been submitted.");   
    console.log(this.signupForm);
    console.log('Saved: ' + JSON.stringify(this.signupForm.value));
    user.emailId = `${this.signupForm.get('email').value}`;
    user.firstName = `${this.signupForm.get('firstName').value}`;
    user.lastName = `${this.signupForm.get('lastName').value}`;
    user.contactNumber = `${this.signupForm.get('phoneNumber').value}`;
    user.role = `${this.signupForm.get('role').value}`;
    user.manager = this.signupForm.get('manager').value.emailId;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    this.http.post(this.postgetUrl, user, httpOptions).subscribe(
      data => { console.log('success', data);},
      error => { this.handleError(error) }
    );
    this.ngOnInit();
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

 getManagers(){
   this.Manager = []
   let data = {columns: "firstName,lastName,emailId"};
    return this.http.get<RolesResponseType>(this.postgetUrl + '/manager', {params: data}) 
    .subscribe(
      (data: RolesResponseType) => { 
        this.Manager.push(data);
        this.Manager.filter(data => {
          for(let datas of data){
            datas.firstName = datas.firstName + ' ' + datas.lastName + ' ' + '(' + datas.emailId + ')';
          }
        })},
      error => { this.handleError(error) }
    )
 }
}
