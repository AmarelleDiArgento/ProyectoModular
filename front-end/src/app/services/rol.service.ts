import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class RolService {

  constructor(private http: Http) { }
  params;

    //service to api mysql create rol
    createRols(name) {
      this.params = 'name=' + name;
      let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      let options = new RequestOptions({ headers: headers });
      return this.http.post('http://localhost:3000/createrol/', this.params, options)
        .map((response: Response) => response.json())
    }
}
