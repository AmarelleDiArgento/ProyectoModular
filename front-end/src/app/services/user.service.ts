import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
//file vars globals
import * as varsGlobals from '../../varsglobals';

@Injectable()
export class UserService {

  constructor(private http: Http) { }
  params;
  // service to api mysql get all users
  getAllDataUsers() {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(varsGlobals.url + '/getdatausers/', options)
      .map((response: Response) => response.json())
  }

  // service to api mysql get pod user for id
  getDataPodUserId(ps_user_id) {
    this.params = 'ps_user_id=' + ps_user_id;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(varsGlobals.url + '/getpoduser/', this.params, options)
      .map((response: Response) => response.json())
  }
  // service to api mysql get user for id
  getDataUserForId(user_id) {
    this.params = 'user_id=' + user_id;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(varsGlobals.url + '/getdatauser/', this.params, options)
      .map((response: Response) => response.json())
  }
  // service to api mysql create users
  createUsers(user_id, username, email, password, rol_id, status) {
    let s
    if (status) { s = 1; } else { s = 0; }
    this.params = 'user_id=' + user_id + '&username=' + username + '&email=' + email + '&password=' + password + '&rol_id=' + rol_id + '&status=' + s + '';
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(varsGlobals.url + '/createuser/', this.params, options)
      .map((response: Response) => response.json())
  }
  createClient(user_id, username, email) {
    this.params = 'user_id=' + user_id + '&username=' + username + '&email=' + email;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(varsGlobals.url + '/createclient/', this.params, options)
      .map((response: Response) => response.json())
  }
  // service to api mysql update users
  updateUsers(user_id, username, email, rol_id, status) {
    let s
    if (status) { s = 1; } else { s = 0; }
    this.params = 'user_id=' + user_id + '&username=' + username + '&email=' + email + '&rol_id=' + rol_id + '&status=' + s + '';
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(varsGlobals.url + '/updateuser/', this.params, options)
      .map((response: Response) => response.json())
  }
  // service to api mysql update users pod
  updateUsersPod(ps_user_id, ps_pod_id) {
    this.params = 'ps_user_id=' + ps_user_id + '&ps_pod_id=' + ps_pod_id;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(varsGlobals.url + '/updatepoduser/', this.params, options)
      .map((response: Response) => response.json())
  }

  // service to api mysql update users
  updateUserPassword(user_id, password_old, password_new) {
    let s
    if (status) { s = 1; } else { s = 0; }
    this.params = 'user_id=' + user_id +
                  '&password_old=' + password_old +
                  '&password_new=' + password_new + '';
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(varsGlobals.url + '/updateuserpassword/', this.params, options)
      .map((response: Response) => response.json())
  }

    // service to api mysql reset users password
    resetUserPassword(user_id, password) {
      let s;
      if (status) { s = 1; } else { s = 0; }
      this.params = 'user_id=' + user_id + '&password=' + password + '';
      let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      let options = new RequestOptions({ headers: headers });
      return this.http.post(varsGlobals.url + '/resetuserpassword/', this.params, options)
        .map((response: Response) => response.json());
    }

  // service to api mysql delete users
  delete(user_id) {
    this.params = 'user_id=' + user_id;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(varsGlobals.url + '/deleteuser/', this.params, options)
      .map((response: Response) => response.json())
  }
  // service to api mysql delete users
  assignPodUser(user_id, pod_id) {
    this.params = 'ps_user_id=' + user_id + '&ps_pod_id=' + pod_id;
    console.log(this.params);

    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(varsGlobals.url + '/createpoduser/', this.params, options)
      .map((response: Response) => response.json())
  }
  // service to api mysql delete users
  resetPodUser(user_id) {
    this.params = 'user_id=' + user_id;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(varsGlobals.url + '/deletepoduser/', this.params, options)
      .map((response: Response) => response.json())
  }

}
