import { Component, OnInit, HostListener, AfterContentInit, Directive, ElementRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
declare var $: any;
// service auth
import { SaleService } from '../../services/sale.service';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { UserService } from '../../services/user.service';
import { forEach } from '@angular/router/src/utils/collection';



@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})



export class SaleComponent implements OnInit, AfterContentInit {



  @Input() public appAutoFocus: boolean;

  // vars msj
  msgerr = '';
  // var submitted
  submitted = false;
  // var submitted
  submittedPay = false;
  // var form
  payForm: FormGroup;
  registerSalesForm: FormGroup;
  registerClientForm: FormGroup;

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

  gross_priceMoney = '$ 0';
  tax_priceMoney = '$ 0';
  total_priceMoney = '$ 0';
  listProductSale = '';
  RadioButton: any;
  total;
  seeker;
  waytopay;
  authorization;
  recibo;
  cambio = 0;
  cambioPesos = '$ 0';
  listSaleProduct: any[][] = [];
  private layout: any = 'alphanumeric';
  increment: number = 1;
  decrement: number = 1;
  // force to redirect
  @HostListener('window:beforeunload') goToPage() {
  }

  // tslint:disable-next-line: deprecation
  constructor(private http: Http,
    private formBuilder: FormBuilder,
    private saleService: SaleService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private userService: UserService,
    private router: Router,
    private el: ElementRef) {
    this.getAllDataCategory();
    this.getAllDataProduct();

    $(document).ready(function () {
      $('.tabs').tabs();
      $('.modal').modal();
      $('select').formSelect();
    });
  }


  public ngAfterContentInit() {

    setTimeout(() => {

      this.el.nativeElement.focus();
    }, 500);

  }

  ngOnInit() {
    // init form
    this.payForm = this.formBuilder.group({
      waytopay: ['', Validators.required],
      recibo: ['0', Validators.required],
      code: ['0', Validators.required]
    });

    // init form Client
    this.registerClientForm = this.formBuilder.group({
      user_id: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required]
    });

    this.idUser = localStorage.getItem('idSesionUser');
    this.idPod = localStorage.getItem('idSesionPod');
    this.client_id = '1020121';
    // send to search api backend all category
  }
  // get payform controls
  get fpay() { return this.payForm.controls; }
  // get form controls
  get fc() { return this.registerClientForm.controls; }


  getAllDataCategory() {
    this.categoryService.getAllDataCategory()
      .subscribe(data => {
        // populate list json
        // console.log(data);
        this.listCategory = data.rows;
      });
  }

  getAllDataProduct() {
    // send to search api backend all category
    this.productService.getAllDataProduct()
      .subscribe(data => {
        // populate list json
        // console.log(data);
        this.listProduct = data.rows;
      });
  }

  getAllDataProductSale() {
    this.listSaleProduct.forEach(ps => {
      this.listProductSale += ps[0] + ':' + ps[3] + ',';
    });
    this.listProductSale = this.listProductSale.substr(0, this.listProductSale.length - 1);
    console.log(this.listProductSale);

  }

  onSubmitPay() {

    if (this.listSaleProduct.length > 0) {
      this.submittedPay = true;
      // error here if form is invalid
      console.log(this.payForm.invalid);

      if (this.payForm.invalid) {
        return;
      } else {

        this.saleService.createSale(
          this.idPod,
          this.idUser,
          this.client_id,
          this.RadioButton,
          this.payForm.value.code,
          this.listProductSale
        )
          .subscribe(data => {
            if (data.respuesta === 'Success') {
              this.sale_id = data.rows[0].sale_id;
              console.log(data.rows);

              localStorage.setItem('idSale', this.sale_id);
              this.router.navigate(['/invoiceprint']);

            } else {
              Swal.fire({
                type: 'error',
                title: 'Ups!, algo salio mal',
                showConfirmButton: false,
                timer: 2000
              });
            }

          });
      }
    }
  }


  // get form contsales
  // get f() { return this.registerSalesForm.controls; }

  totals() {
    this.total = 0;
    let tax = 0;

    for (let i = 0; i < this.listSaleProduct.length; i++) {
      this.total = this.total + this.listSaleProduct[i][4];
      tax = tax + this.listSaleProduct[i][5];
    }
    this.tax_price = tax;
    this.total_price = this.total;
    // tslint:disable-next-line: no-unused-expression
    this.gross_price = this.total - tax, 2;


    this.tax_priceMoney = '$ ' + number_format(this.tax_price, 2);
    this.total_priceMoney = '$ ' + number_format(this.total_price, 0);
    this.gross_priceMoney = '$ ' + number_format(this.gross_price, 2);

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
    this.listProductSale = '';
    this.getAllDataProductSale();
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
        // tslint:disable-next-line: radix
        const cont: number = parseInt(this.listSaleProduct[i][3]) + this.increment;
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
        // tslint:disable-next-line: radix
        const cont: number = parseInt(this.listSaleProduct[i][3]) - this.decrement;
        this.listSaleProduct[i][3] = cont;
        this.listSaleProduct[i][4] = this.listSaleProduct[i][6] * cont;
        this.listSaleProduct[i][5] = this.listSaleProduct[i][7] * cont;

      }
    }

    this.totals();
  }

  virtualKeyboardValue(id, searchValue) {
    for (let i = 0; i < this.listSaleProduct.length; i++) {
      if (this.listSaleProduct[i][0] === id) {
        const cont: number = searchValue;
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

  turn() {
    if (this.recibo < this.total) {
      this.cambio = 0;
    } else {
      this.cambio = this.recibo - this.total;
    }
    this.cambioPesos = '$ ' + number_format(this.cambio, 0);
  }


  // obtain data user for id
  clientSearch(e) {
    if (e.keyCode === 13 && !e.shiftKey) {
      // send to ws api mysql search data user for id
      this.registerClientForm.get('user_id').setValue(this.client_id);
      this.getClient();
    }
  }

  getClient() {
    this.userService.getDataUserForId(this.client_id)
      .subscribe(data => {
        if (data.respuesta === 'Success') {
          this.client = data.rows[0];
        } else {
          Swal.fire({
            title: 'Ups!',
            text: 'Usuario no registrado',
            type: 'error',
            showCancelButton: true,
            confirmButtonText: 'Registrar'
          }).then((result) => {
            if (result.value) {
              $('#ClientRegister').modal('open');
            }

          });
        }
      });
  }
  // submit form
  onClientSubmit() {
    this.submitted = true;

    // error here if form is invalid
    if (this.registerClientForm.invalid) {
      return;
    } else {
      this.client_id = this.registerClientForm.value.user_id;
      // send to api backend create user
      this.userService.createClient(
        this.registerClientForm.value.user_id,
        this.registerClientForm.value.username,
        this.registerClientForm.value.email)
        .subscribe(data => {
          if (data.respuesta === 'Success') {

            this.modalClose();

            Swal.fire({
              type: 'success',
              title: 'Registro exitoso',
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 2000
            });

          } else {
            Swal.fire({
              type: 'error',
              title: 'Ups!, algo salio mal: \n' + data.respuesta,
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 2000
            });
            this.msgerr = 'Error al crear el cliente';
          }

        });
    }
  }

  modalClose() {
    $('#ClientRegister').modal('close');
    this.getClient();
  }
  modalOpen() {
    $('#ClientRegister').modal('open');

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

