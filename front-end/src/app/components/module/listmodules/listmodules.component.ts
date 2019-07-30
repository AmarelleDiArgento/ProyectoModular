import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
declare var $: any;
// service auth
import { ModuleService } from '../../../services/module.service';
// service excel
import { ExcelService } from '../../../services/excel.service';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';

@Component({
  selector: 'app-listmodules',
  templateUrl: './listmodules.component.html',
  styleUrls: ['./listmodules.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class ListmodulesComponent implements OnInit {

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

  // list data ws module 
  listModule: [];
  rowData;

  texto = 'hiddensearch';
  filtro = true;
  lineas = 10;
  searchFilter;

  constructor(private http: Http,
    private formBuilder: FormBuilder,
    private moduleService: ModuleService,
    private excelService: ExcelService,
    private router: Router) {
    
  }

  ngOnInit() {
    // init select materializecss;
    $(document).ready(function () {
      $('select').formSelect();
    });
    this.getAllData();
  }

  onPageSizeChanged(value) {
    this.gridApi.paginationSetPageSize(Number(value));
  }

  cambiaEstado() {
    this.texto = (this.filtro) ? '' : 'hiddensearch';
    this.filtro = !this.filtro;
  }

  quickSearch() {
    this.gridApi.setQuickFilter(this.searchFilter);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.rowData = this.listModule;
  }

  // obtain all data from the register pods
  getAllData() {
    // send to search api backend all privileges
    this.moduleService.getAllDataModules()
      .subscribe(data => {
        // populate list json privilege
        this.listModule = data.rows;
      });
  }

  // redirect to create module
  createModule() {
    this.router.navigate(['/createmodule'])
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.listModule, 'Reportemodulos');
  }
}
