import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;
// service auth
import { SaleService } from '../../../services/sale.service';
import { PrintService } from '../../../services/print.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {


  // id sale
  idSale;
  Encabezado: {
    pod: '',
    nit: '',
    phone: '',
    address: '',
    prefijo: '',
    invoice_num: '',
    date: '',
    uName: '',
    cName: '',
    cardpayment: '',
    Total: '',
    rdian: '',
    daterdian: '',
    billing_limit: ''
  };
  Productos: {};
  Impuestos: {};
  Total: {
    Total: ''
  };
  // tslint:disable-next-line: no-inferrable-types
  printOn: boolean = true;

  // tslint:disable-next-line: deprecation
  constructor(private http: Http,
    private formBuilder: FormBuilder,
    private saleService: SaleService,
    private printService: PrintService,
    private router: Router) {
  }

  ngOnInit() {
    this.idSale = localStorage.getItem('idSale');
    this.saleService.delete()
      .subscribe(data => {
        if (data != null) {
          console.log(data)
        }
      });
    this.getSaleDataId();
  }


  // obtain data sale for id
  getSaleDataId() {
    const type = localStorage.getItem('typeSale');
    this.saleService.getDataSaleForInvoice(this.idSale, type)
      .subscribe(data => {
        if (data != null) {
          // add values to the form
          this.Encabezado = data.Encabezado[0];
          this.Productos = data.Productos;
          this.Impuestos = data.Impuestos;
          this.Total = data.Totales[0];
        }

        console.log(localStorage.getItem('moduleSelected'))
        //part of update sale
        if (localStorage.getItem('moduleSelected') === 'UpdatedSale') {
          if (localStorage.getItem('typeSale') === 'Imprimir') {
            if (localStorage.getItem('sendPrint') === 'Yes') {
              this.printFileUpdate();
            }
          }

          if (localStorage.getItem('typeSale') === 'Correo') {
            if (localStorage.getItem('sendEmail') === 'Yes') {
              // print file time
              setTimeout(() => {
                this.router.navigate(['/listsales']);
              }, 1000);
            }
          }

        } else {
          //part of sale
          if (localStorage.getItem('moduleSelected') === 'Sale') {
            if (localStorage.getItem('typeSale') === 'Correo') {
              this.router.navigate(['/createsale']);
            } else {
              this.printFile();
            }
          }
        }
      });
  }
  // service to print
  printFile() {
    // remove idSale
    localStorage.removeItem('idSale');
    // print file time
    setTimeout(() => {
      this.printService.print();
      this.router.navigate(['/createsale']);
    }, 1000);
  }

  // service to print
  printFileUpdate() {
    // remove idSale
    localStorage.removeItem('idSale');
    // print file time
    setTimeout(() => {
      this.printService.print();
      this.router.navigate(['/listsales']);
    }, 1000);
  }

}
