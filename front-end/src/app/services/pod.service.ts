import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
//file vars globals
import * as varsGlobals from '../../varsglobals';

@Injectable()
export class PodService {

  constructor(private http: Http) { }
  params;
  // service to api mysql get all pod
  getAllDataPod() {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(varsGlobals.url +'/getdatapod/', options)
      .map((response: Response) => response.json())
  }
  // service to api mysql get pod for id
  getDataPodForId(pod_id) {
    this.params = 'pod_id=' + pod_id;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(varsGlobals.url +'/getdatapod/', this.params, options)
      .map((response: Response) => response.json())
  }
  // service to api mysql create pod
  createPod(code, nit, rdian, daterdian, billing_limit, name, address, phone, status) {
    let s
    if (status) { s = 1; } else { s = 0; }
    // tslint:disable-next-line: max-line-length
    this.params = 'code=' + code + '&nit=' + nit + '&rdian=' + rdian + '&daterdian=' + daterdian + '&billing_limit=' + billing_limit + '&name=' + name + '&address=' + address + '&phone=' + phone + '&status=' + s;
    console.log(this.params);
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(varsGlobals.url +'/createpod/', this.params, options)
      .map((response: Response) => response.json())
  }
  // service to api mysql update pod
  updatePod(pod_id, code, nit, rdian, daterdian, billing_limit, name, address, phone, status) {
    let s
    if (status) { s = 1; } else { s = 0; }
    // tslint:disable-next-line: max-line-length
    this.params = 'pod_id=' + pod_id + '&code=' + code + '&nit=' + nit + '&rdian=' + rdian + '&daterdian=' + daterdian + '&billing_limit=' + billing_limit + '&name=' + name + '&address=' + address + '&phone=' + phone + '&status=' + status;
    console.log(this.params);

    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(varsGlobals.url +'/updatepod/', this.params, options)
      .map((response: Response) => response.json())
  }
  // service to api mysql delete pod
  delete(pod_id) {
    this.params = 'pod_id=' + pod_id;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(varsGlobals.url +'/deletepod/', this.params, options)
      .map((response: Response) => response.json())
  }
}
