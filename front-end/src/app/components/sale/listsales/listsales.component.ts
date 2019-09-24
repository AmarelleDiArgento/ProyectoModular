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
import { RendervisibilitybuttonComponent } from '../../aggridrender/rendervisibilitybutton/rendervisibilitybutton.component';

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

  texto = 'hiddensearch';
  filtro = true;
  lineas = 10;
  searchFilter;

  since;
  until;
  idPod;

  taxPrice = 0;
  grossPrice = 0;
  netPrice = 0;

  taxPriceMoney = '$ 0';
  grossPriceMoney = '$ 0';
  netPriceMoney = '$ 0';

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
      { headerName: 'No.', field: 'invoice_num', sortable: true, width: 200 },
      { headerName: 'Pto de venta', field: 'pod_name', sortable: true },
      { headerName: 'Usuario', field: 'user_name', sortable: true },
      { headerName: 'Cliente', field: 'client_name', sortable: true },
      { headerName: 'Impuesto', field: 'tax_price', sortable: true, width: 150, valueFormatter: currencyFormatterdecimal },
      { headerName: 'Precio Bruto', field: 'gross_price', sortable: true, width: 150, valueFormatter: currencyFormatterdecimal },
      { headerName: 'Precio Neto', field: 'net_price', sortable: true, width: 150, valueFormatter: currencyFormatter },
      {
        headerName: '',
        field: 'sale_id',
        cellRenderer: 'customizedVisibilityCell',
        cellRendererParams: {
          name: 'sale',
          Name: 'Sale'
        }, width: 80
      }
    ];
    this.frameworkComponents = {
      customizedVisibilityCell: RendervisibilitybuttonComponent
    },

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
    this.paginationPageSize = 5;
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

    // asign id sale to search data
    this.since = localStorage.getItem('sinceDate');
    this.until = localStorage.getItem('untilDate');

    let d = new Date();
    let now = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    console.log(now);


    this.idPod = localStorage.getItem('idSesionPod');

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

    // this.getAllData();
    this.getAllData();

    $(document).ready(function () {
      $('select').formSelect();
      $('.datepicker').datepicker({
        format: 'yyyy-mm-dd',
        autoClose: true
      });
    });

  }



  // get form controls
  get f() { return this.selectDateForm.controls; }
  // submit form
  onDateSubmit() {
    this.submitted = true;
    // error here if form is invalid
    if (this.selectDateForm.invalid) {
      return;
    } else {

      localStorage.setItem('sinceDate', this.selectDateForm.value.since);
      this.since = this.selectDateForm.value.since;

      localStorage.setItem('untilDate', this.selectDateForm.value.until);
      this.until = this.selectDateForm.value.until;

      this.saleService.getAllDataSaleBetween(
        this.since,
        this.until
      ).subscribe(data => {
        this.gridApi.setRowData(data.rows)

        for (const d of data.rows) {
          this.taxPrice = this.taxPrice + d.tax_price;
          this.grossPrice = this.grossPrice + d.gross_price;
          this.netPrice = this.netPrice + d.net_price;
        }
        this.getFormatTotals();
      });


      this.cambiaEstado();

    }
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
        console.log(data.rows);

        for (const d of data.rows) {
          this.taxPrice = this.taxPrice + d.tax_price;
          this.grossPrice = this.grossPrice + d.gross_price;
          this.netPrice = this.netPrice + d.net_price;
        }
        this.getFormatTotals();
      });
  }

  getFormatTotals() {
    console.log(this.netPrice);

    this.netPriceMoney = '$ ' + number_format(this.netPrice, 0);
    this.taxPriceMoney = '$ ' + number_format(this.taxPrice, 2);
    this.grossPriceMoney = '$ ' + number_format(this.grossPrice, 2);
  }

  // redirect to create sale
  createSale() {
    this.router.navigate(['/createsale']);
  }
  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.listSale, 'Reporteventas');
  }

  printTicket() {
    this.router.navigate(['/ticketprint']);

  }
  sendDataSale() {
    // send to search api backend all sales
    this.saleService.getSendDataSale(
      this.idPod,
      this.since,
      this.until
    )
      .subscribe(data => {

        if (data.respuesta === 'Success') {
          Swal.fire({
            type: 'success',
            title: 'Enviado!',
            showConfirmButton: false,
            timer: 2000
          });

        } else {
          Swal.fire({
            type: 'error',
            title: 'Ups! o_o',
            showConfirmButton: false,
            timer: 2000
          });

        }
      });
  }
}

function filter(filterLocalDateAtMidnight, cellValue) {
  let dateAsString = cellValue;
  let datePartsA = dateAsString.split(' ');
  let datePartsB = datePartsA[0].split('-');

  let cellDate = new Date(Number(datePartsB[0]), Number(datePartsB[1]) - 1, Number(datePartsB[2]));
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
  if (number > 0) {
    return (
      number
        .toFixed(2) // always two decimal digits
        .replace('.', ',') // replace decimal point character with ,
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    ); // use . as a separator
  } else {
    return 0.00;
  }

}

function currencyFormatter(params) {
  return '$ ' + formatNumber(params.value);
}

function formatNumber(number) {
  // this puts commas into the number eg 1000 goes to 1,000,
  // i pulled this from stack overflow, i have no idea how it works
  if (number > 0) {
    return (
      number
        .toFixed(0) // always two decimal digits
        .replace('.', ',') // replace decimal point character with ,
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    ); // use . as a separator
  } else {
    return 0;
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
