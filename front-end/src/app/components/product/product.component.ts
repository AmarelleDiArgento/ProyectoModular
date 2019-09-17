import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
declare var $: any;
// service product
import { ProductService } from '../../services/product.service';
// service  category
import { CategoryService } from '../../services/category.service';
// service tax
import { TaxService } from '../../services/tax.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements AfterViewInit, OnInit {
  // vars msj
  msgerr = '';
  // var submitted
  submitted = false;
  // var form
  registerProductForm: FormGroup;
  // list data
  listProduct: {};
  // list dataasd
  lstCat: {};
  // list data
  listTax: {};
  image;

  constructor(private http: Http,
    private formBuilder: FormBuilder,
    private router: Router,
    public categoryService: CategoryService,
    public taxService: TaxService,
    public productService: ProductService) {
  }

  ngAfterViewInit() {
    $(document).ready(function () {
      $('select').formSelect();
    });
  }

  ngOnInit() {
    // init form
    this.registerProductForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      net_price: ['', Validators.required],
      category_id: ['', Validators.required],
      tax_id: ['', Validators.required],
      image: ['', Validators.required],
      status: ['', Validators.required]
    });
    // init select category
    this.getAllDataCategory();
    // init select tax
    this.getAllDataTax();
  }

  // obtain all data from the category
  getAllDataCategory() {
    // send to search api backend all category
    this.categoryService.getAllDataCategory()
      .subscribe(data => {
        // populate list json
        this.lstCat = data.rows;
        console.log(this.lstCat);
      });
  }
  // obtain all data from the tax
  getAllDataTax() {
    // send to search api backend all tax
    this.taxService.getAllDataTax()
      .subscribe(data => {
        // populate list json
        this.listTax = data.rows;
        //init validation checks
        $(function () {
          $('select').formSelect();
        });
      });
  }
  // get form controls
  get f() { return this.registerProductForm.controls; }
  // submit form
  onSubmit() {
    this.submitted = true;
    // error here if form is invalid
    if (this.registerProductForm.invalid) {
      return;
    } else {
      // send to api backend create product
      this.productService.createProduct(
        this.registerProductForm.value.code,
        this.registerProductForm.value.name,
        this.registerProductForm.value.net_price,
        this.registerProductForm.value.category_id,
        this.registerProductForm.value.image,
        this.registerProductForm.value.status)
        .subscribe(data => {

          if (data.respuesta === 'Success') {
            Swal.fire({
              type: 'success',
              title: 'Registro exitoso',
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 2000
            });
            // redirect to home menu
            this.router.navigate(['/listproducts']);
          } else {
            Swal.fire({
              type: 'error',
              title: 'Ups!, algo salio mal: \n' + data.respuesta,
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 2000
            });
            this.msgerr = 'Error al crear el producto';
          }
        });
    }
  }

  recagarImagen(e) {
    if (e.srcElement.value != null) {
      this.image = e.srcElement.value;
    } else {
      this.updateUrl();
    }
  }

  updateUrl() {
    this.image = 'assets/noimage.png';
  }
  // clear alert err
  closeAlertErr(): void {
    this.msgerr = '';
  }
}

