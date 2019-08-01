import { Component, OnInit, Injectable } from '@angular/core';
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
@Injectable({
  providedIn: 'root'
})
export class ListtaxComponent implements OnInit {
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

  // list data ws tax
  listTax: [];
  rowData;

  texto = 'hiddensearch';
  filtro = true;
  lineas = 10;
  searchFilter;
  constructor(private http: Http,
    private formBuilder: FormBuilder,
    private taxService: TaxService,
    private excelService: ExcelService,
    private router: Router) {
    
  }

  ngOnInit() {
    this.getAllData();
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

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.rowData = this.listTax;
  }

  // obtain all data from the register tax
  getAllData() {
    // send to search api backend all tax
    this.taxService.getAllDataTax()
      .subscribe(data => {
        // populate list json tax
        this.listTax = data.rows;
      });
  }
  // redirect to create tax
  createTax() {
    this.router.navigate(['/createtax']);
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.listTax, 'Reporteimpuestos');
  }
}