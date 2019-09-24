import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;
// service auth
import { SaleService } from '../../../services/sale.service';
import { PrintService } from '../../../services/print.service';
import { ExcelService } from '../../../services/excel.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  // list data ws sale
  since;
  until;
  listSale: [];

  // var submitted
  submitted = false;

  // var form
  selectDateForm: FormGroup;

  constructor(private http: Http,
    private formBuilder: FormBuilder,
    private saleService: SaleService,
    private excelService: ExcelService,
    private printService: PrintService,
    private router: Router) {

    let d = new Date();
    let now = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    console.log(now);

    if (this.since === null) {
      localStorage.setItem('sinceDate', now);
      this.since = now;

      this.selectDateForm.value.since = now;
    }

    if (this.until === null) {
      this.until = now;
      localStorage.setItem('untilDate', now);
      this.selectDateForm.value.until = now;
    }
  }

  ngOnInit() {
    // init form
    this.selectDateForm = this.formBuilder.group({
      since: ['', Validators.required],
      until: ['', Validators.required]
    });

    // asign id sale to search data
    this.since = localStorage.getItem('sinceDate');
    this.until = localStorage.getItem('untilDate');

    this.TotalDayProducts();


    this.selectDateForm.get('since').setValue(this.since);
    this.selectDateForm.get('until').setValue(this.until);

  }
  // get payform controls
  get f() { return this.selectDateForm.controls; }

  onDateSubmit() {
    this.TotalDayProducts();
  }
  TotalDayProducts() {
    // send to search api backend all sales
    console.log(this.since, this.until);

    this.saleService.getAllDataSaleBetweenSum(
      this.since,
      this.until
    )
      .subscribe(data => {
        console.log(data);

        // populate list json sale
        this.listSale = data.rows;
        console.log(this.listSale);
      });
    this.printFile();
  }

  // service to print
  printFile() {
    // print file time
    setTimeout(() => {
      this.printService.print();
      this.router.navigate(['/listsales']);
    }, 1000);
  }
  CurrencyFormatted(nStr) {
    nStr += '';
    let x = nStr.split('.');
    let x1 = x[0];
    let x2 = x.length > 1 ? '.' + x[1] : '';
    let rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return '$ ' + x1 + x2;
  }

}


