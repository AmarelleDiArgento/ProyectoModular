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
import { UserService } from '../../services/user.service';


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

  client_id;
  client: {};

  sale_id;

  idPod;
  idUser;
  listProduct: {};
  gross_price = 0;
  tax_price = 0;
  total_price = 0;
  total;
  seeker;
  waytopay;
  recibo;
  cambio: number;


  listSaleProduct: any[][] = [];

  constructor(private http: Http,
    private formBuilder: FormBuilder,
    private saleService: SaleService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {

    this.idUser = localStorage.getItem('idSesionUser');
    this.idPod = localStorage.getItem('idSesionPod');
    // send to search api backend all category
    this.categoryService.getAllDataCategory()
      .subscribe(data => {
        // populate list json
        // console.log(data);
        this.listCategory = data.rows;
      });

    // send to search api backend all category
    this.productService.getAllDataProduct()
      .subscribe(data => {
        // populate list json
        // console.log(data);
        this.listProduct = data.rows;
      });

    $(document).ready(function () {
      $('.tabs').tabs();
      $('.modal').modal();
      $('select').formSelect();
    });


  }
  modalClose() {

    $('#ClientRegister').modal('close');
    this.client_id = localStorage.getItem('idClient');
    this.getClient();
  }

  // obtain data user for id
  clientSearch(e) {
    if (e.keyCode === 13 && !e.shiftKey) {
      // send to ws api mysql search data user for id
      this.getClient();
    }
  }

  getClient() {
    this.userService.getDataUserForId(this.client_id)
      .subscribe(data => {
        if (data != null) {
          this.client = data.rows[0];
          this.onSubmit();
        } else {

        }
      });
  }

  totals() {
    this.total = 0;
    let tax = 0;

    for (let i = 0; i < this.listSaleProduct.length; i++) {
      this.total = this.total + this.listSaleProduct[i][4];
      tax = tax + this.listSaleProduct[i][5];
    }
    this.tax_price = number_format(tax, 2);
    this.total_price = number_format(this.total, 0);
    this.gross_price = number_format(this.total - tax, 2);
  }

  addProduct(p) {
    let exists = false;
    let cont = 0;
    let index = 0;
    let tax_price = 0;

    for (let i = 0; i < this.listSaleProduct.length; i++) {
      if (this.listSaleProduct[i][0] === p.product_id) {
        index = i;
        exists = true;
        cont = this.listSaleProduct[i][3] + 1;
      }
    }
    if (p.tax_percent === null) {
      tax_price = 0;
    } else {
      tax_price = p.net_price - (p.net_price / (1 + (p.tax_percent / 100)));
    }

    if (exists) {
      this.listSaleProduct[index][3] = cont;
      this.listSaleProduct[index][4] = p.net_price * cont;
      this.listSaleProduct[index][5] = tax_price * cont;
    } else {
      this.listSaleProduct.push([p.product_id, p.name, p.image, 1, p.net_price, tax_price, p.net_price, tax_price]);
    }
    this.totals();
  }

  deleteProduct(id) {
    for (let i = 0; i < this.listSaleProduct.length; i++) {
      if (this.listSaleProduct[i][0] === id) {
        this.listSaleProduct[i][3] = 0;
        this.listSaleProduct[i][4] = 0;
        this.listSaleProduct[i][5] = 0;
      }
    }

    this.totals();
  }

  increAmount(id) {
    for (let i = 0; i < this.listSaleProduct.length; i++) {
      if (this.listSaleProduct[i][0] === id) {
        const cont: number = this.listSaleProduct[i][3] + 1;
        this.listSaleProduct[i][3] = cont;
        this.listSaleProduct[i][4] = this.listSaleProduct[i][6] * cont;
        this.listSaleProduct[i][5] = this.listSaleProduct[i][7] * cont;
      }
    }

    this.totals();
  }
  decreAmount(id) {
    for (let i = 0; i < this.listSaleProduct.length; i++) {
      if (this.listSaleProduct[i][0] === id) {
        const cont: number = this.listSaleProduct[i][3] - 1;
        this.listSaleProduct[i][3] = cont;
        this.listSaleProduct[i][4] = this.listSaleProduct[i][6] * cont;
        this.listSaleProduct[i][5] = this.listSaleProduct[i][7] * cont;

      }
    }

    this.totals();
  }

  productSearch(e) {

    if (e.keyCode === 13 && !e.shiftKey) {
      // tslint:disable-next-line: forin
      for (const i in this.listProduct) {
        if (this.listProduct[i].product_id === parseInt(this.seeker, 10)
          || this.listProduct[i].code === this.seeker) {
          this.addProduct(this.listProduct[i]);
        }
      }

      this.seeker = '';
    }
  }
  
  vueltas(e) {

    if (e.keyCode === 13 && !e.shiftKey) {
      this.cambio = parseInt(this.recibo, 10) - this.total;
    }

  }
  // get form contsales
  get f() { return this.registerSalesForm.controls; }

  // submit form
  onSubmit() {
    this.submitted = true;
    console.log('clic');
    // send to api backend create user
    this.saleService.createSale(
      this.idPod,
      this.idUser,
      this.client_id
    )
      .subscribe(data => {
        if (data.respuesta === 'Success') {
          this.sale_id = data.rows[0].sale_id;
        } else {
          Swal.fire({
            title: 'Ups!',
            text: 'Usuario no registrado',
            type: 'error',
            showCancelButton: true,
            confirmButtonText: 'Registrar'
          }).then((result) => {
            if (result.value) {
              localStorage.setItem('noClient', this.client_id);
              $('#ClientRegister').modal('open');
            }
          });
        }
      });
  }


  sale() {
    let e = true;
    for (let i = 0; i < this.listSaleProduct.length; i++) {

      this.saleService.createSaleProduct(
        this.sale_id,
        this.listSaleProduct[i][0],
        this.listSaleProduct[i][3]
      )
        .subscribe(data => {
          if (data.respuesta === 'Success') {
            console.log(this.listSaleProduct[i][1] + ' Ok!');
          } else {
            console.log(this.listSaleProduct[i][1] + ' Error!');
            console.log(data.respuesta);
            e = false;
          }

        });
    }
    if (e) {

      localStorage.setItem('idSale', this.sale_id);
      this.router.navigate(['/invoiceprint']);

    } else {
      Swal.fire({
        type: 'error',
        title: 'Ups!, algo salio mal',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000
      });

    }
  }
}
// function format number
function number_format(amount, decimals) {

  amount += ''; // por si pasan un numero en vez de un string
  amount = parseFloat(amount.replace(/[^0-9\.]/g, '')); // elimino cualquier cosa que no sea numero o punto

  decimals = decimals || 0; // por si la variable no fue fue pasada

  // si no es un numero o es igual a cero retorno el mismo cero
  if (isNaN(amount) || amount === 0) {
    return parseFloat('0').toFixed(decimals);
  }

  // si es mayor o menor que cero retorno el valor formateado como numero
  amount = '' + amount.toFixed(decimals);

  const amount_parts = amount.split('.'),
    regexp = /(\d+)(\d{3})/;

  while (regexp.test(amount_parts[0])) {
    amount_parts[0] = amount_parts[0].replace(regexp, '$1' + ',' + '$2');
  }

  return amount_parts.join('.');
}