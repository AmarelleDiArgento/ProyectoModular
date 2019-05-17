import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
//service 
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-listproduct',
  templateUrl: './listproduct.component.html',
  styleUrls: ['./listproduct.component.css']
})
export class ListproductComponent implements OnInit {

  //list data ws product 
  listProduct: {};

  constructor(private http: Http, private formBuilder: FormBuilder, private productService: ProductService, private router: Router) {
    //get data
    this.getAllData();
  }

  ngOnInit() {
  }

  //obtain all data from the product
  getAllData() {
    //send to search api backend all product
    this.productService.getAllDataProduct()
      .subscribe(data => {
        //populate list json 
        console.log(data);
        this.listProduct = data.rows;
      });
  }
  //redirect to create product
  createProduct() {
    this.router.navigate(['/createproduct'])
  }
  //redirect to update product
  updateProduct(id) {
    //almacenamos el id
    localStorage.setItem('idProduct', id);
    this.router.navigate(['/updateproduct'])
  }
  //delete product
  deleteProduct(id) {
    //send to api backend delete product for id
    this.productService.deleteProduct(id)
      .subscribe(data => {
        if (data.respuesta == "Success") {
          //redirect 
          location.reload();
        }
      });
  }
}
