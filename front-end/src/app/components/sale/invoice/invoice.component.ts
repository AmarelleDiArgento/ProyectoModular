import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
declare var $: any;
// service auth
import { SaleService } from '../../../services/sale.service';
import { PodService } from '../../../services/pod.service';
import { ProductService } from '../../../services/product.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  // id sale
  idSale = '';
  listSale: {};
  net_priceTotal;
  gross_priceTotal;
  tax_priceTotal;
  zero: number = 0;


  constructor(private http: Http,
    private formBuilder: FormBuilder,
    private saleService: SaleService,
    private router: Router) { }

  ngOnInit() {
    this.idSale = '1'; //localStorage.getItem('idSale');
    this.getSaleDataId();
    this.getSaleTotal();
  }

  // obtain data sale for id
  getSaleDataId() {
    this.saleService.getDataSaleForId(this.idSale)
      .subscribe(data => {
        if (data != null) {
          // add values to the form
          this.listSale = data.rows;
        }
      });
  }
  getSaleTotal() {
    console.log(name);

  }
}
