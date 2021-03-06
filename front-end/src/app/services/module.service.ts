import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
//file vars globals
import * as varsGlobals from '../../varsglobals';

@Injectable()
export class ModuleService {

  constructor(private http: Http) { }
  params;
  // service to api mysql get all modules
  getAllDataModules() {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });
    return this.http.get(varsGlobals.url + '/getdatamodulos/', options)
      .map((response: Response) => response.json());
  }
  // service to api mysql get module for id
  getDataModuleForId(module_id) {
    this.params = 'module_id=' + module_id;
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(varsGlobals.url + '/getdatamodulo/', this.params, options)
      .map((response: Response) => response.json());
  }
  // service to api mysql create module
  createModule(name, status) {
    let s;
    if (status) { s = 1; } else { s = 0; }
    this.params = 'name=' + name + '&status=' + s;
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(varsGlobals.url + '/createmodulo/', this.params, options)
      .map((response: Response) => response.json());
  }
  // service to api mysql update modules
  updateModule(module_id, name, status) {
    let s;
    if (status) { s = 1; } else { s = 0; }
    this.params = 'module_id=' + module_id + '&name=' + name + '&status=' + s;
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(varsGlobals.url + '/updatemodulo/', this.params, options)
      .map((response: Response) => response.json());
  }
  // service to api mysql delete modules
  delete(module_id) {
    this.params = 'module_id=' + module_id;
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(varsGlobals.url + '/deletemodulo/', this.params, options)
      .map((response: Response) => response.json());
  }
}
