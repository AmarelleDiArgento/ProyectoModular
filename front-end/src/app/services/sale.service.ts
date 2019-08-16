import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
//file vars globals
import * as varsGlobals from '../../varsglobals';

@Injectable()
export class SaleService {

  constructor(private http: Http) { }
  params;
  // service to api mysql get all sale
  getAllDataSale() {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(varsGlobals.url + '/getdatasales/', options)
      .map((response: Response) => response.json())
  }

  //get all data sale between
  getAllDataSaleBetween(since, until) {
    this.params = 'since=' + since + '&until=' + until;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(varsGlobals.url + '/getdatasalebetween/', this.params, options)
      .map((response: Response) => response.json())
  }

  //get all data sale between sum
  getAllDataSaleBetweenSum(since, until) {
    this.params = 'since=' + since + '&until=' + until;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(varsGlobals.url + '/getdatasalebetweensum/', this.params, options)
      .map((response: Response) => response.json())
  }

  // service to api mysql get sale for id
  getDataSaleForId(sale_id) {
    this.params = 'sale_id=' + sale_id;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(varsGlobals.url + '/getdatasale/', this.params, options)
      .map((response: Response) => response.json())
  }

  // service to api mysql create sale
  createSale(pod_id, user_id, client_id, waytopay, authorization, list_product) {
    this.params = 'pod_id=' + pod_id +
    '&user_id=' + user_id +
    '&client_id=' + client_id +
    '&waytopay=' + waytopay +
    '&authorization=' + authorization +
    '&list_product=' + list_product;
    console.log(this.params);

    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(varsGlobals.url + '/createsale/', this.params, options)
      .map((response: Response) => response.json())
  }
  // service to api mysql update sale
  updateSale(sale_id, user_id, password) {
    this.params = 'sale_id=' + sale_id + '&user_id=' + user_id + '&password=' + password;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(varsGlobals.url + '/updatesale/', this.params, options)
      .map((response: Response) => response.json())
  }
  // service to api mysql delete saledate
  delete(sale_id) {
    this.params = 'sale_id=' + sale_id;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(varsGlobals.url + '/deletesale/', this.params, options)
      .map((response: Response) => response.json())
  }
  createSaleProduct(sale_id, product_id, quantity) {
    this.params = 'sale_id=' + sale_id + '&product_id=' + product_id + '&quantity=' + quantity;
    console.log(this.params);

    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(varsGlobals.url + '/createsaleproduct/', this.params, options)
      .map((response: Response) => response.json())

  }
}
