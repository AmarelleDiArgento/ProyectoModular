import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
declare var $: any;
// service auth
import { SaleService } from '../../services/sale.service';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

  // vars msj
  msgerr = '';
  // var submitted
  submitted = false;
  // var form
  registerSalesForm: FormGroup;
  // list data auth
  listSale: {};
  listCategory: {};

  client;
  sale_id;
  listProduct: {};

  listSaleProduct: any[];


  constructor(private http: Http,
    private formBuilder: FormBuilder,
    private saleService: SaleService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router) { }

  ngOnInit() {

    this.init();
    // send to search api backend all category
    this.categoryService.getAllDataCategory()
      .subscribe(data => {
        // populate list json
        console.log(data);
        this.listCategory = data.rows;
      });

    // send to search api backend all category
    this.productService.getAllDataProduct()
      .subscribe(data => {
        // populate list json
        console.log(data);
        this.listProduct = data.rows;
      });


    $(document).ready(function () {
      $('.tabs').tabs();
    });


  }
  addproduct(value) {
    console.log(value);
    this.listSaleProduct.push({value});
    console.log(this.listSaleProduct);

  }

  // get form contsales
  get f() { return this.registerSalesForm.controls; }

  // submit form
  onSubmit() {
    this.submitted = true;
    console.log('clic');

    // error here if form is invalid
    if (this.registerSalesForm.invalid) {
      return;
    } else {
      // send to api backend create user
      this.saleService.createSale(
        this.registerSalesForm.value.date,
        this.registerSalesForm.value.pod_id,
        this.registerSalesForm.value.user_id,
        this.registerSalesForm.value.client_id,
      )
        .subscribe(data => {
          if (data.respuesta === 'Success') {
            // redirect to home menu
            this.router.navigate(['/listsales']);
          } else {
            this.msgerr = 'Error al crear el sale';
          }
        });
    }

  }



  init() {



  }
}
