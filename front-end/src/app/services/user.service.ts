import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class UserService {

  constructor(private http: Http) { }
  params;
  //service to api mysql get all users
  getAllDataUsers() {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get('http://localhost:3000/getdatausers/', options)
      .map((response: Response) => response.json())
  }
 //service to api mysql get user for id
 getDataUsersForId(user_id) {
    this.params = 'user_id=' + user_id ;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3000/getdatauser/', this.params, options)
      .map((response: Response) => response.json())
  }
  //service to api mysql create users
  createUsers(user_id,username, email, password, rol_id, status) {
    this.params = 'user_id=' + user_id +'&username=' + username + '&email=' + email + '&password=' + password + '&rol_id=' + rol_id + '&status=' + status + '';
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3000/createuser/', this.params, options)
      .map((response: Response) => response.json())
  }
  //service to api mysql update users
  updateUsers(user_id, username, email, password, rol_id, status) {
    this.params = 'user_id=' + user_id +'&username=' + username + '&email=' + email + '&password=' + password + '&rol_id=' + rol_id + '&status=' + status + '';
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3000/updateuser/', this.params, options)
      .map((response: Response) => response.json())
  }
  //service to api mysql delete users
  deleteUsers(user_id) {
    this.params = 'user_id=' + user_id ;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3000/deleteuser/', this.params, options)
      .map((response: Response) => response.json())
  }
}
