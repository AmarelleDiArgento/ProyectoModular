import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
//file vars globals
import * as varsGlobals from '../../varsglobals';

@Injectable()
export class PrivilegeService {

  constructor(private http: Http) { }
  params;
  getAllDataprivileges() {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(varsGlobals.url + '/getdataprivileges/', options)
      .map((response: Response) => response.json());
  }
  // service to api mysql get privilege for id
  getDataprivilegesForId(privilege_id) {
    this.params = 'privilege_id=' + privilege_id;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(varsGlobals.url + '/getdataprivilege/', this.params, options)
      .map((response: Response) => response.json());
  }
  // service to api mysql create privilege
  createprivileges(name, id_module, icon, route, status) {
    let s = 0;
    if (status) { s = 1; } else { s = 0; }
    this.params = 'name=' + name +
      '&module_id=' + id_module +
      '&icon=' + icon +
      '&route=' + route +
      '&status=' + s;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(varsGlobals.url + '/createprivilege/', this.params, options)
      .map((response: Response) => response.json());
  }
  // service to api mysql update privileges
  updateprivileges(privilege_id, name, id_module, icon, route, status) {
    let s = 0;
    if (status) { s = 1; } else { s = 0; }
    this.params = 'privilege_id=' + privilege_id +
      '&name=' + name +
      '&module_id=' + id_module +
      '&icon=' + icon +
      '&route=' + route +
      '&status=' + s;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(varsGlobals.url + '/updateprivilege/', this.params, options)
      .map((response: Response) => response.json());
  }
  // service to api mysql delete privileges
  delete(privilege_id) {
    this.params = 'privilege_id=' + privilege_id;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(varsGlobals.url + '/deleteprivilege/', this.params, options)
      .map((response: Response) => response.json());
  }

}
