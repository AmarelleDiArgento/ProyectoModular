import { Injectable } from '@angular/core';
import {Http,Response, Headers, RequestOptions } from '@angular/http';    
import { Observable } from 'rxjs/Observable';  
import 'rxjs/add/operator/map';  
import 'rxjs/add/operator/do';  

@Injectable()
export class AuthService {
  constructor(private http: Http) { }
   params;

   //service to mysql login auth api
   login(email, password) {
     this.params = 'email=' + email + '&password=' + password + '';
     let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
     let options = new RequestOptions({ headers: headers });
     return this.http.post('http://localhost:3000/auth/', this.params, options)
       .map((response: Response) => response.json())
   }
   //service to mysql menu auth api
   menu(rol) {
    this.params = 'rol=' + rol;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3000/getdatapermission', this.params, options)
      .map((response: Response) => response.json())
  }
}
