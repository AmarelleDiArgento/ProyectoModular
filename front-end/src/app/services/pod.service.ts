import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class PodService {

  constructor(private http: Http) { }
  params;
  // service to api mysql get all pod
  getAllDataPod() {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get('http://localhost:3000/getdatapod/', options)
      .map((response: Response) => response.json())
  }
 // service to api mysql get pod for id
 getDataPodForId(pod_id) {
    this.params = 'pod_id=' + pod_id ;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3000/getdatapod/', this.params, options)
      .map((response: Response) => response.json())
  }
  // service to api mysql create pod
  createPod(name, address, phone, status) {
    this.params = 'name=' + name + '&address=' + address + '&phone=' + phone + '&status=' + status;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3000/createpod/', this.params, options)
      .map((response: Response) => response.json())
  }
  // service to api mysql update pod
  updatePod(pod_id, name, address, phone, status) {
    this.params = 'pod_id=' + pod_id +'&name=' + name + '&address=' + address + '&phone=' + phone + '&status=' + status;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3000/updatepod/', this.params, options)
      .map((response: Response) => response.json())
  }
  // service to api mysql delete pod
  delete(pod_id) {
    this.params = 'pod_id=' + pod_id ;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3000/deletepod/', this.params, options)
      .map((response: Response) => response.json())
  }
}
