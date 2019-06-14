import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
//file vars globals
import * as varsGlobals from '../../varsglobals';

@Injectable()
export class RolService {

  constructor(private http: Http) { }
  params;
  // service to api mysql get all rols
  getAllDataRol() {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(varsGlobals.url +'/getdatarols/', options)
      .map((response: Response) => response.json());
  }
  // service to api mysql get rol for id
  getDataRolForId(rol_id) {
    this.params = 'rol_id=' + rol_id;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(varsGlobals.url +'/getdatarol/', this.params, options)
      .map((response: Response) => response.json());
  }
  // service to api mysql create rol
  createRol(name) {
    this.params = 'name=' + name;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(varsGlobals.url +'/createrol/', this.params, options)
      .map((response: Response) => response.json());
  }
  // service to api mysql update rols
  updateRol(rol_id, name) {
    this.params = 'rol_id=' + rol_id + '&name=' + name;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(varsGlobals.url +'/updaterol/', this.params, options)
      .map((response: Response) => response.json());
  }
  // service to api mysql delete rols
  delete(rol_id) {
    this.params = 'rol_id=' + rol_id;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(varsGlobals.url +'/deleterol/', this.params, options)
      .map((response: Response) => response.json());
  }
}