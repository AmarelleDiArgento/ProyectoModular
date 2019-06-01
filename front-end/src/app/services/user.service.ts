import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class UserService {

  constructor(private http: Http) { }
  params;
  // service to api mysql get all users
  getAllDataUsers() {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get('http://localhost:3000/getdatauser/', options)
      .map((response: Response) => response.json())
  }
  // service to api mysql get user for id
  getDataUserForId(user_id) {
    this.params = 'user_id=' + user_id;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3000/getdatauser/', this.params, options)
      .map((response: Response) => response.json())
  }
  // service to api mysql create users
  createUsers(user_id, username, email, password, rol_id, status) {
    let s
    if (status) { s = 1; } else { s = 0; }
    this.params = 'user_id=' + user_id + '&username=' + username + '&email=' + email + '&password=' + password + '&rol_id=' + rol_id + '&status=' + s + '';
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3000/createuser/', this.params, options)
      .map((response: Response) => response.json())
  }
  // service to api mysql update users
  updateUsers(user_id, username, email, password, rol_id, status) {
    let s
    if (status) { s = 1; } else { s = 0; }
    this.params = 'user_id=' + user_id + '&username=' + username + '&email=' + email + '&password=' + password + '&rol_id=' + rol_id + '&status=' + s + '';
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3000/updateuser/', this.params, options)
      .map((response: Response) => response.json())
  }
  // service to api mysql delete users
  delete(user_id) {
    this.params = 'user_id=' + user_id;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3000/deleteuser/', this.params, options)
      .map((response: Response) => response.json())
  }
  // service to api mysql delete users
  assignPodUser(user_id,pod_id) {
    this.params = 'user_id=' + user_id + '&pod_id=' + pod_id;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3000/assignuserpod/', this.params, options)
      .map((response: Response) => response.json())
  }
  // service to api mysql delete users
  resetPodUser(user_id) {
    this.params = 'user_id=' + user_id;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3000/poduserreset/', this.params, options)
      .map((response: Response) => response.json())
  }

}
