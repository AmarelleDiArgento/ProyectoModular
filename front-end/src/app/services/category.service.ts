import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class CategoryService {

  constructor(private http: Http) { }
  params;
  //service to api mysql get all category
  getAllDataCategory() {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.get('http://localhost:3000/getdatacategory/', options)
      .map((response: Response) => response.json())
  }
 //service to api mysql get category for id
 getDataCategoryForId(category_id) {
    this.params = 'category_id=' + category_id ;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3000/getdatacategory/', this.params, options)
      .map((response: Response) => response.json())
  }
  //service to api mysql create category
  createCategory(name) {
    this.params = 'name=' + name;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3000/createcategory/', this.params, options)
      .map((response: Response) => response.json())
  }
  //service to api mysql update category
  updateCategory(category_id, name) {
    this.params = 'category_id=' + category_id +'&name=' + name ;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3000/updatecategory/', this.params, options)
      .map((response: Response) => response.json())
  }
  //service to api mysql delete category
  deleteCategory(category_id) {
    this.params = 'category_id=' + category_id ;
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3000/deletecategory/', this.params, options)
      .map((response: Response) => response.json())
  }
}
