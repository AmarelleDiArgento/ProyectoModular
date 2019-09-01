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
  Encabezado: {};
  Productos: {};
  Impuestos: {};
  Total: {};
  printOn: boolean = true;


  constructor(private http: Http,
    private formBuilder: FormBuilder,
    private saleService: SaleService,
    private printService: PrintService,
    private router: Router) {
  }

  ngOnInit() {
    this.idSale = localStorage.getItem('idSale');
    this.getSaleDataId();

    if (localStorage.getItem('printOn') === '0') {
      this.printOn = false;
      localStorage.removeItem('printOn');
    }
    // this.router.navigate(['/createsale']);
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

        if (localStorage.getItem('typeSale') === 'Correo') {
          this.router.navigate(['/createsale']);
        } else {
          this.printFile();
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
