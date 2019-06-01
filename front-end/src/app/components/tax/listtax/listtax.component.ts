import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
declare var $: any;
// service
import { TaxService } from '../../../services/tax.service';
// service excel
import { ExcelService } from '../../../services/excel.service';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';

@Component({
  selector: 'app-listtax',
  templateUrl: './listtax.component.html',
  styleUrls: ['./listtax.component.css']
})
export class ListtaxComponent implements OnInit {
  private gridApi;
  private gridColumnApi;
  private components;
  private columnDefs;
  private autoGroupColumnDef;
  private defaultColDef;
  private rowSelection;
  private rowGroupPanelShow;
  private pivotPanelShow;
  private paginationPageSize;
  private paginationNumberFormatter;

  // list data ws tax
  listTax: {};
  // array from excel data
  listExcelTax: any[];
  texto = 'hiddensearch';
  filtro = true;
  lineas = 10;
  private searchFilter;
  constructor(private http: Http, 
    private formBuilder: FormBuilder, 
    private taxService: TaxService,
    private excelService: ExcelService,
    private router: Router) {
      this.columnDefs = [
        { headerName: 'ID', field: 'tax_id', sortable: true },
        { headerName: 'Nombre', field: 'name', sortable: true },
        { headerName: 'Porcentaje', field: 'percent', sortable: true },
        { headerName: 'Accion', field: 'tax_id', sortable: true, width: 120 },
        { headerName: '', field: 'tax_id', sortable: true, width: 48 }
      ];
      this.components = { statusIcon: getStatusIcon() };

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
    // get data
    // this.getAllData();
    $(document).ready(function () {
      $('select').formSelect();
    });
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

  renderUpdate() {
  }
  renderDelete() {

  }

  renderStatus() {

  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    // send to search api backend all privileges
    this.taxService.getAllDataTax()
      .subscribe(data => {
        // populate list json privilege
        console.log(data.rows);

        this.listTax = data.rows;
        this.listExcelTax = data.rows;
      });
  }
  // obtain all data from the tax
  getAllData() {
    // send to search api backend all tax
    this.taxService.getAllDataTax()
      .subscribe(data => {
        // populate list json
        // console.log(data);
        this.listTax = data.rows;
      });
  }
  // redirect to create tax
  createTax() {
    this.router.navigate(['/createtax']);
  }
  // redirect to update tax
  updateTax(id) {
    // almacenamos el id
    localStorage.setItem('idTax', id);
    this.router.navigate(['/updatetax']);
  }
  // delete tax
  deleteTax(id) {
    // send to api backend delete tax for id
    this.taxService.deleteTax(id)
      .subscribe(data => {
        if (data.respuesta === 'Success') {
          // redirect
          this.ngOnInit();
        }
      });
  }
  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.listExcelTax, 'Reporteimpuestos');
  }
}
function getStatusIcon() {}