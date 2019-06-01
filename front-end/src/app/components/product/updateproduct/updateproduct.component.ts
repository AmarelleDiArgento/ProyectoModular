import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;
// service product
import { ProductService } from '../../../services/product.service';
// service  category
import { CategoryService } from '../../../services/category.service';
// service tax
import { TaxService } from '../../../services/tax.service';

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.css']
})
export class UpdateproductComponent implements OnInit {

  // vars msj
  msgerr = '';
  // var submitted
  submitted = false;
  // var form
  updateProductForm: FormGroup;
  // list data
  listRol: {};
  // list data
  listCategory: {};
  // list data
  listTax: {};
  // id
  idProduct = '';
  // rows empty
  rows = [];
  // vars form update
  code = '';
  name = '';
  net_price = '';
  category_id = '';
  tax_id = '';
  status = '';

  constructor(private http: Http, private formBuilder: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private taxService: TaxService, private router: Router) { }
  ngOnInit() {
    // init form
    this.updateProductForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      net_price: ['', Validators.required],
      category_id: ['', Validators.required],
      tax_id: ['', Validators.required],
      status: ['', Validators.required]
    });
    // asign id product to search data
    this.idProduct = localStorage.getItem('idProduct');
    // eject ws search product for id
    this.getProductDataId();
    // init select category
    this.getAllDataCategory();
    // init select tax
    this.getAllDataTax();


    $(document).ready(function () {
      $('select').formSelect();
    });
  }
  // get form controls
  get f() { return this.updateProductForm.controls; }
  onSubmit() {
    this.submitted = true;
    // error here if form is invalid
    if (this.updateProductForm.invalid) {
      return;
    } else {
      this.productService.updateProduct(
        this.idProduct,
        this.updateProductForm.value.code,
        this.updateProductForm.value.name,
        this.updateProductForm.value.net_price,
        this.updateProductForm.value.category_id,
        this.updateProductForm.value.tax_id,
        this.updateProductForm.value.status)
        .subscribe(data => {
          if (data.respuesta === 'Success') {
            this.router.navigate(['/listproducts']);
          } else {
            this.msgerr = 'error al actualizar el producto';
          }
        });
    }
  }
  // obtain data product for id
  getProductDataId() {
    this.productService.getDataProductForId(this.idProduct)
      .subscribe(data => {
        if (data != null) {
          // add values to the form
          this.updateProductForm.get('code').setValue(data.rows[0].code);
          this.updateProductForm.get('name').setValue(data.rows[0].name);
          this.updateProductForm.get('net_price').setValue(data.rows[0].net_price);
          this.updateProductForm.get('category_id').setValue(data.rows[0].category_id);
          this.updateProductForm.get('tax_id').setValue(data.rows[0].tax_id);
          this.updateProductForm.get('status').setValue(data.rows[0].status);
        }
      });
  }
  // obtain all data from the category
  getAllDataCategory() {
    // send to search api backend all category
    this.categoryService.getAllDataCategory()
      .subscribe(data => {
        // populate list json
        console.log(data);
        this.listCategory = data.rows;
      });
  }
  // obtain all data from the tax
  getAllDataTax() {
    // send to search api backend all tax
    this.taxService.getAllDataTax()
      .subscribe(data => {
        // populate list json
        console.log(data);
        this.listTax = data.rows;
      });
  }
  // clear alert err
  closeAlertErr(): void {
    this.msgerr = '';
  }
}

