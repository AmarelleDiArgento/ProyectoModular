import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class TaxService {

  constructor(private http: Http) { }
  params;
  //service to api mysql get all tax
  getAllDataTax() {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get('http://localhost:3000/getdatatax/', options)
      .map((response: Response) => response.json())
  }
 //service to api mysql get tax for id
 getDataTaxForId(tax_id) {
    this.params = 'tax_id=' + tax_id ;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3000/getdatatax/', this.params, options)
      .map((response: Response) => response.json())
  }
  //service to api mysql create tax
  createTax(name, percent) {
    this.params = 'name=' + name +'&percent=' + percent;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3000/createtax/', this.params, options)
      .map((response: Response) => response.json())
  }
  //service to api mysql update tax
  updateTax(tax_id, name, percent) {
    this.params = 'tax_id=' + tax_id +'&name=' + name +'&percent=' + percent ;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3000/updatetax/', this.params, options)
      .map((response: Response) => response.json())
  }
  //service to api mysql delete tax
  delete(tax_id) {
    this.params = 'tax_id=' + tax_id ;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3000/deletetax/', this.params, options)
      .map((response: Response) => response.json())
  }
}
