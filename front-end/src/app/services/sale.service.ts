import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class SaleService {

  constructor(private http: Http) { }
  params;
  // service to api mysql get all sale
  getAllDataSale() {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get('http://localhost:3000/getdatasale/', options)
      .map((response: Response) => response.json())
  }
  // service to api mysql get sale for id
  getDataSaleForId(sale_id) {
    this.params = 'sale_id=' + sale_id;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3000/getdatasale/', this.params, options)
      .map((response: Response) => response.json())
  }
  // service to api mysql create sale
  createSale(pod_id, user_id, client_id) {
    this.params = 'pod_id=' + pod_id + '&user_id=' + user_id + '&client_id=' + client_id;
    console.log(this.params);
    
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3000/createsale/', this.params, options)
      .map((response: Response) => response.json())
  }
  // service to api mysql update sale
  updateSale(sale_id, date, pod_id, user_id, client_id) {
    this.params = 'sale_id=' + sale_id + '&date=' + date + '&pod_id=' + pod_id + '&user_id=' + user_id + '&client_id=' + client_id;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3000/updatesale/', this.params, options)
      .map((response: Response) => response.json())
  }
  // service to api mysql delete sale
  delete(sale_id) {
    this.params = 'sale_id=' + sale_id;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3000/deletesale/', this.params, options)
      .map((response: Response) => response.json())
  }
  createSaleProduct(sale_id, product_id, quantity){
    this.params = 'sale_id=' + sale_id + '&product_id=' + product_id + '&quantity=' + quantity;
    console.log(this.params);
    
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3000/createsaleproduct/', this.params, options)
      .map((response: Response) => response.json())

  }
}
