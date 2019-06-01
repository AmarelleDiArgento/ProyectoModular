import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class ProductService {

  constructor(private http: Http) { }
  params;
  //service to api mysql get all product
  getAllDataProduct() {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get('http://localhost:3000/getdataproduct/', options)
      .map((response: Response) => response.json())
  }
 //service to api mysql get product for id
 getDataProductForId(product_id) {
    this.params = 'product_id=' + product_id ;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3000/getdataproduct/', this.params, options)
      .map((response: Response) => response.json())
  }
  //service to api mysql create product
  createProduct(code,name,net_price,category_id,tax_id,status) {
    this.params = 'code=' + code +'&name=' + name +'&net_price=' + net_price +'&category_id=' + category_id +'&tax_id=' + tax_id +'&status=' + status;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3000/createproduct/', this.params, options)
      .map((response: Response) => response.json())
  }
  //service to api mysql update product
  updateProduct(product_id,code,name,net_price,category_id,tax_id,status) {
    this.params = 'product_id=' + product_id +'&code=' + code +'&name=' + name +'&net_price=' + net_price +'&category_id=' + category_id +'&tax_id=' + tax_id +'&status=' + status ;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3000/updateproduct/', this.params, options)
      .map((response: Response) => response.json())
  }
  //service to api mysql delete product
  delete(product_id) {
    this.params = 'product_id=' + product_id ;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3000/deleteproduct/', this.params, options)
      .map((response: Response) => response.json())
  }
}

