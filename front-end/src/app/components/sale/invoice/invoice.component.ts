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
  idSale = '';
  listSale: {};
  net_priceTotal = 0;
  gross_priceTotal = 0;
  tax_priceTotal = 0;
  zero = 0;


  constructor(private http: Http,
    private formBuilder: FormBuilder,
    private saleService: SaleService,
    private printService: PrintService,
    private router: Router) { }

  ngOnInit() {
    this.idSale = localStorage.getItem('idSale');
    this.getSaleDataId();

    // this.router.navigate(['/createsale']);
  }
  // obtain data sale for id
  getSaleDataId() {
    this.saleService.getDataSaleForId(this.idSale)
      .subscribe(data => {
        if (data != null) {
          let gross = 0;
          let tax = 0;
          // add values to the form
          this.listSale = data.rows;
          for (const c of data.rows) {
            console.log(c.net_price, c.gross_price, c.tax_price);

            this.net_priceTotal = this.net_priceTotal + c.net_price;
            gross = gross + c.gross_price;
            tax = tax + c.tax_price;

          }

          this.gross_priceTotal = number_format(gross, 2);
          this.tax_priceTotal = number_format(tax, 2);

        }
        this.printFile();
      });
  }
  // service to print
  printFile() {
    this.printService.print();
    Swal.fire({
      type: 'success',
      title: '',
      toast: false,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      onClose: () => {
        this.router.navigate(['/createsale']);
      }
    });
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



