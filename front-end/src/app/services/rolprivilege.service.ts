import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()

export class RolprivilegeService {

  constructor(private http: Http) { }
  params;

  // service to api mysql get all rols privileges
  getDataRolPrivileges(rp_rol_id) {
    this.params = 'rp_rol_id=' + rp_rol_id;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3000/getdatarolprivileges/', this.params, options)
      .map((response: Response) => response.json());
  }

  // service to api mysql get rol privilege for id
  getDataRolPrivilege(rp_rol_id) {
    this.params = 'rp_rol_id=' + rp_rol_id;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3000/getdatarolprivileges/', this.params, options)
      .map((response: Response) => response.json());
  }

   // service to api mysql create rols privileges
   createRolPrivilege(rp_privilege_id,rp_rol_id, viewrol, createrol, updaterol, deleterol) {
    this.params = 'rp_privilege_id=' + rp_privilege_id + '&rp_rol_id=' + rp_rol_id + '&view=' + viewrol + '&create=' + createrol + '&update=' + updaterol + '&delete=' + deleterol;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3000/createrolprivilege/', this.params, options)
      .map((response: Response) => response.json());
  }
  // service to api mysql update rols privileges
  updateRolPrivilege(rp_privilege_id,rp_rol_id, viewrol, createrol, updaterol, deleterol) {
    this.params = 'rp_privilege_id=' + rp_privilege_id + '&rp_rol_id=' + rp_rol_id + '&view=' + viewrol + '&create=' + createrol + '&update=' + updaterol + '&delete=' + deleterol;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3000/updaterolprivilege/', this.params, options)
      .map((response: Response) => response.json());
  }
  // service to api mysql deleterols privileges
  deleteRolPrivilege(rp_privilege_id,rp_rol_id) {
    this.params = 'rp_privilege_id=' + rp_privilege_id + '&rp_rol_id=' + rp_rol_id;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3000/deleterolprivilege/', this.params, options)
      .map((response: Response) => response.json());
  }

}
