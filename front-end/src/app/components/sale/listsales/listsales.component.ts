import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
declare var $: any;
// service auth
import { SaleService } from '../../../services/sale.service';
// service excel
import { ExcelService } from '../../../services/excel.service';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { RenderdeletebuttonComponent } from '../../aggridrender/renderdeletebutton/renderdeletebutton.component';
import { RendereditbuttonComponent } from '../../aggridrender/rendereditbutton/rendereditbutton.component';

@Component({
  selector: 'app-listsales',
  templateUrl: './listsales.component.html',
  styleUrls: ['./listsales.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class ListsalesComponent implements OnInit {
  // vars msj
  msgerr = '';
  // var submitted
  submitted = false;

  gridApi;
  gridColumnApi;
  components;
  columnDefs;
  autoGroupColumnDef;
  defaultColDef;
  rowSelection;
  rowGroupPanelShow;
  pivotPanelShow;
  paginationPageSize;
  paginationNumberFormatter;
  frameworkComponents;
  rowData;
  // list data ws sale
  listSale: [];
  // array from excel data
  listExcelsale: any[];
  texto = 'hiddensearch';
  filtro = true;
  lineas = 10;
  searchFilter;

  since;
  until;

  taxPrice: number = 0;
  grossPrice: number = 0;
  netPrice: number = 0;

  // var form
  selectDateForm: FormGroup;

  constructor(private http: Http,
    private formBuilder: FormBuilder,
    private saleService: SaleService,
    private excelService: ExcelService,
    private router: Router) {
    this.columnDefs = [
      {
        headerName: 'Fecha', field: 'date', sortable: true,
        filter: 'agDateColumnFilter',
        filterParams: {
          comparator: filter
        }
      },
      { headerName: 'No.', field: 'invoice_num', sortable: true },
      { headerName: 'punto de venta', field: 'pod_name', sortable: true },
      { headerName: 'Usuario', field: 'user_name', sortable: true },
      { headerName: 'Cliente', field: 'client_name', sortable: true },
      { headerName: 'Impuesto', field: 'tax_price', sortable: true, valueFormatter: currencyFormatterdecimal },
      { headerName: 'Precio bruto', field: 'gross_price', sortable: true, valueFormatter: currencyFormatterdecimal },
      { headerName: 'Precio neto', field: 'net_price', sortable: true, valueFormatter: currencyFormatter },
      {
        headerName: '',
        field: 'sale_id',
        cellRenderer: 'customizedEditCell',
        cellRendererParams: {
          name: 'sale',
          Name: 'Sale'
        }, width: 80
      },
      {
        headerName: '', field: 'sale_id',
        cellRenderer: 'customizedDeleteCell',
        cellRendererParams: {
          name: 'sale',
          Name: 'Sale'
        }, width: 80
      }
    ];

    this.frameworkComponents = {
      customizedEditCell: RendereditbuttonComponent,
      customizedDeleteCell: RenderdeletebuttonComponent
    };

    this.defaultColDef = {
      pagination: true,
      suppressRowClickSelection: true,
      enableRangeSelection: true,
      editable: true,
      enablePivot: true,
      enableValue: true,
      sortable: true,
      resizable: true,
      filter: true
    };
    this.rowSelection = 'multiple';
    this.pivotPanelShow = 'always';
    this.paginationPageSize = 10;
    this.paginationNumberFormatter = function (params) {
      return '[' + params.value.toLocaleString() + ']';
    };
  }

  ngOnInit() {
    // init form
    this.selectDateForm = this.formBuilder.group({
      since: ['', Validators.required],
      until: ['', Validators.required]
    });

    this.getDate();
    // this.getAllData();
    this.getAllData();

    $(document).ready(function () {
      $('select').formSelect();
      $('.datepicker').datepicker({
        format: 'yyyy-mm-dd',
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 5, // Creates a dropdown of 15 years to control year
        months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
        autoClose: true
      });
    });
  }

  getDate() {

    // asign id sale to search data
    this.since = localStorage.getItem('sinceDate');
    this.until = localStorage.getItem('untilDate');

    let d = new Date();
    let now = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();

    if (this.since === null) {
      localStorage.setItem('sinceDate', now);
      this.since = now;

      this.selectDateForm.value.since = now;
    }

    if (this.since === null) {
      this.since = now;
      localStorage.setItem('untilDate', now);
      this.selectDateForm.value.until = now;
    }

    // console.log(localStorage);
  }


  // get form controls
  get f() { return this.selectDateForm.controls; }
  // submit form
  onSubmit() {
    this.submitted = true;
    // error here if form is invalid
    if (this.selectDateForm.invalid) {
      return;
    } else {

      localStorage.setItem('sinceDate', this.selectDateForm.value.since);
      this.since = this.selectDateForm.value.since;

      localStorage.setItem('untilDate', this.selectDateForm.value.until);
      this.until = this.selectDateForm.value.until;
    }

    this.ngOnInit();
  }


  onPageSizeChanged(value) {
    this.gridApi.paginationSetPageSize(Number(value));
  }
  cambiaEstado() {
    this.texto = (this.filtro) ? '' : 'hiddensearch';
    this.filtro = !this.filtro;
  }
  quickSearch() {
    console.log(this.searchFilter);
    this.gridApi.setQuickFilter(this.searchFilter);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.rowData = this.listSale;

  }

  // obtain all data from the register sales
  getAllData() {

    // send to search api backend all sales
    this.saleService.getAllDataSaleBetween(
      this.since,
      this.until
    )
      .subscribe(data => {
        // populate list json sale
        this.listSale = data.rows;

        for (const d of data.rows) {
          console.log(d.tax_price);
          this.taxPrice = this.taxPrice + d.tax_price;
          this.grossPrice = this.grossPrice + d.gross_price;
          this.netPrice = this.netPrice + d.net_price;
        }
      });
  }

  // obtain all data from the register sales
  // getAllData() {
  //   // send to search api backend all sales
  //   this.saleService.getAllDataSale()
  //     .subscribe(data => {
  //       // populate list json sale
  //       this.listSale = data.rows;
  //     });
  // }

  // redirect to create sale
  createSale() {
    this.router.navigate(['/createsale'])
  }
  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.listExcelsale, 'Reporteventas');
  }
}

function filter(filterLocalDateAtMidnight, cellValue) {
  var dateAsString = cellValue;
  var datePartsA = dateAsString.split(' ');
  var datePartsB = datePartsA[0].split('-');

  var cellDate = new Date(Number(datePartsB[0]), Number(datePartsB[1]) - 1, Number(datePartsB[2]));
  if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
    return 0;
  }
  if (cellDate < filterLocalDateAtMidnight) {
    return -1;
  }
  if (cellDate > filterLocalDateAtMidnight) {
    return 1;
  }
}

function currencyFormatterdecimal(params) {
  return '$ ' + formatNumberdecimal(params.value);
}

function formatNumberdecimal(number) {
  // this puts commas into the number eg 1000 goes to 1,000,
  // i pulled this from stack overflow, i have no idea how it works
  return (
    number
      .toFixed(2) // always two decimal digits
      .replace('.', ',') // replace decimal point character with ,
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  ) // use . as a separator
}


function currencyFormatter(params) {
  return '$ ' + formatNumber(params.value);
}

function formatNumber(number) {
  // this puts commas into the number eg 1000 goes to 1,000,
  // i pulled this from stack overflow, i have no idea how it works
  return (
    number
      .toFixed(0) // always two decimal digits
      .replace('.', ',') // replace decimal point character with ,
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  ); // use . as a separator
}
