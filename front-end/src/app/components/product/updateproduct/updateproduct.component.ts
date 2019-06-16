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
  listCheck: {};
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
  image = '';
  status = '';

  constructor(private http: Http, private formBuilder: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private taxService: TaxService, private router: Router) { }
  ngOnInit() {
    // init form
    this.updateProductForm = this.formBuilder.group({
      product_id: ['', Validators.required],
      code: ['', Validators.required],
      name: ['', Validators.required],
      net_price: ['', Validators.required],
      category_id: ['', Validators.required],
      image: ['', Validators.required],
      tax_id: ['', Validators.required],
      status: ['', Validators.required]
    });
    // asign id product to search data
    this.idProduct = localStorage.getItem('idProduct');
    // get product tax check
    this.getProductTax(this.idProduct);
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
        this.updateProductForm.value.image,
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
          console.log(data);
          
          // add values to the form
          this.updateProductForm.get('product_id').setValue(this.idProduct);
          this.updateProductForm.get('code').setValue(data.rows[0].code);
          this.updateProductForm.get('name').setValue(data.rows[0].name);
          this.updateProductForm.get('net_price').setValue(data.rows[0].net_price);
          this.updateProductForm.get('category_id').setValue(data.rows[0].category_id);
          this.updateProductForm.get('image').setValue(data.rows[0].image);
          this.image = data.rows[0].image;
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
        // console.log(data);
        this.listCategory = data.rows;
      });
  }
  // obtain all data from the tax
  getAllDataTax() {
    // send to search api backend all tax
    this.taxService.getAllDataTax()
      .subscribe(data => {
        // populate list json
        // console.log(data);
        this.listTax = data.rows;
      // init validation checks
      $(function () {
        $('select').formSelect();
      });
      // vars
      var i = 0;
      // list checked
      var list = this.listCheck;
      $('#category_id').ready(function () {
        for (i = 0; i < Object.keys(data.rows).length; i++) {
            // search name in select and add prop selected
            if(list[i] !== undefined){
            var search = list[i].name;
            $('#tax_id option:contains(' + search + ')').prop('selected', true);
            } 
        }
        $('#tax_id').formSelect();
      });
    });
  }
  // obtain all data from the product - tax
  getProductTax(idProducto){
    // send to search api backend product tax 
    this.productService.getDataProductTaxId(idProducto)
      .subscribe(data => {
        // populate list json
        this.listCheck = data.rows;
        console.log(this.listCheck)
      });
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

