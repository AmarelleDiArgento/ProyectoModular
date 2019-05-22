import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()

export class RolprivilegeService {

  constructor(private http: Http) { }
  params;

  // service to api mysql get rol for id
  getDataRolPrivilege(rol_id) {
    this.params = 'rp_rol_id=' + rol_id;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3000/getdatarolprivileges/', this.params, options)
      .map((response: Response) => response.json());
  }
}
