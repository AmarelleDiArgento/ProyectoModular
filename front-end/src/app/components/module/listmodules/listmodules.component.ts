import { Component, OnInit } from '@angular/core';
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
import { RenderStatusComponent } from '../../aggridrender/render-status/render-status.component';
import { RendereditbuttonComponent } from '../../aggridrender/rendereditbutton/rendereditbutton.component';
import { RenderdeletebuttonComponent } from '../../aggridrender/renderdeletebutton/renderdeletebutton.component';

@Component({
  selector: 'app-listmodules',
  templateUrl: './listmodules.component.html',
  styleUrls: ['./listmodules.component.css']
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

  texto = 'hiddensearch';
  filtro = true;
  lineas = 10;
  searchFilter;

  constructor(private http: Http,
    private formBuilder: FormBuilder,
    private moduleService: ModuleService,
    private excelService: ExcelService,
    private router: Router) {
    this.columnDefs = [
      { headerName: 'ID', field: 'module_id', sortable: true },
      { headerName: 'Nombre', field: 'name', sortable: true },
      {
        headerName: 'Estado',
        field: 'status',
        sortable: true,
        cellRenderer: 'customizedStatusCell',
        width: 100
      },
      {
        headerName: '',
        field: 'privilege_id',
        cellRenderer: 'customizedEditCell',
        cellRendererParams: {
          name: 'privilege',
          Name: 'Privilege'
        }, width: 80
      },
      {
        headerName: '', field: 'privilege_id',
        cellRenderer: 'customizedDeleteCell',
        cellRendererParams: {
          name: 'privilege',
          Name: 'Privilege'
        }, width: 80
      }
    ];

    this.frameworkComponents = {
      customizedStatusCell: RenderStatusComponent,
      customizedEditCell: RendereditbuttonComponent,
      customizedDeleteCell: RenderdeletebuttonComponent
    }

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
    // init select materializecss;
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
    this.gridApi.setQuickFilter(this.searchFilter);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

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
