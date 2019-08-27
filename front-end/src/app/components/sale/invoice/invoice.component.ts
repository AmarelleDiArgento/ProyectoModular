import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
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
  Encabezado: {};
  Productos: {};
  Impuestos: {};
  Total: {};
  
  zero = 0;
  zeros = '';
  invoiceNumber = 0;
  invoiceCode = '';
  

  printOn: boolean = true;


  constructor(private http: Http,
    private formBuilder: FormBuilder,
    private saleService: SaleService,
    private printService: PrintService,
    private router: Router) {
    this.getSaleDataId();
    }

  ngOnInit() {

    this.idSale = localStorage.getItem('idSale');
    if (localStorage.getItem('printOn') === '0') {
      this.printOn = false;

      localStorage.removeItem('printOn');
    }
    console.log(this.printOn);

    // this.router.navigate(['/createsale']);
  }

  getZeros(number, width) {
    var numberOutput = Math.abs(number); /* Valor absoluto del número */
    var length = number.toString().length; /* Largo del número */
    var zero = '0'; /* String de cero */

    if (width <= length) {
      if (number < 0) {
        return ('-' + numberOutput.toString());
      } else {
        return numberOutput.toString();
      }
    } else {
      if (number < 0) {
        return ('-' + (zero.repeat(width - length)) + numberOutput.toString());
      } else {
        return ((zero.repeat(width - length)) + numberOutput.toString());
      }
    }
  }

  getInvoiceNumber() {
    this.zeros = this.invoiceCode + ' - ' + this.getZeros(this.invoiceNumber, 10);

  }

  // obtain data sale for id
  getSaleDataId() {
    this.saleService.getDataSaleForInvoice(17)
    //this.saleService.getDataSaleForInvoice(this.idSale)
      .subscribe(data => {
        if (data != null) {
          
          // add values to the form
          this.Encabezado = data.Encabezado[0];
          this.Productos = data.Productos;
          this.Impuestos = data.Impuestos;
          this.Total = data.Totales[0];
        }
        if (this.printOn) {
          // this.printFile();
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

}
