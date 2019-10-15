import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  validateUrl = 'http://localhost:10101/hi';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  validate() {
    const httpOptions = {
      headers: new HttpHeaders({
       'Content-Type':  'application/json',
       'token': sessionStorage.getItem('Id_token')
      })
    };
    console.log(httpOptions);
    this.http.get(this.validateUrl,httpOptions).subscribe(
      resp => { console.log('success', resp);}, 
      error => { console.log(error)}
    );
  }

}
