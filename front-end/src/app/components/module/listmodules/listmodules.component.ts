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

@Component({
  selector: 'app-listmodules',
  templateUrl: './listmodules.component.html',
  styleUrls: ['./listmodules.component.css']
})
export class ListmodulesComponent implements OnInit {

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

  // list data ws module 
  listModule: {};
   // array from excel data
   listExcelModule: any[];
   texto = 'hiddensearch';
   filtro = true;
   lineas = 10;
   private searchFilter;
  constructor(private http: Http,
    private formBuilder: FormBuilder,
    private moduleService: ModuleService,
    private excelService: ExcelService,
    private router: Router) {
    this.columnDefs = [
      { headerName: 'ID', field: 'module_id', sortable: true },
      { headerName: 'Nombre', field: 'name', sortable: true },
      {
        headerName: '',
        field: 'status',
        sortable: true,
        width: 48,
        cellRendererParams: {
          suppressCount: true,
          checkbox: true,
          innerRenderer: 'statusIcon',
          suppressDoubleClickExpand: true
        }
      },
      { headerName: 'Accion', field: 'module_id', sortable: true, width: 120 },
      { headerName: '', field: 'module_id', sortable: true, width: 48 }
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
    this.moduleService.getAllDataModules()
      .subscribe(data => {
        // populate list json privilege
        console.log(data.rows);

        this.listModule = data.rows;
        this.listExcelModule = data.rows;
      });
  }

  // obtain all data from the register modules
  getAllData() {
    // send to search api backend all modules
    this.moduleService.getAllDataModules()
      .subscribe(data => {
        // populate list json module
        console.log(data.rows);
        this.listModule = data.rows;
        this.listExcelModule= data.rows;
      });
  }

  // redirect to create module
  createModule() {
    this.router.navigate(['/createmodule'])
  }
  // redirect to update module
  updateModule(id) {
    // almacenamos el id
    localStorage.setItem('idModule', id);
    this.router.navigate(['/updatemodule'])
  }

  // delete module
  deleteModule(id) {


    Swal.fire({
      title: 'Estas seguro?',
      text: 'No podras recuperar los cambios',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo!'
    }).then((result) => {
      if (result.value) {
        this.moduleService.deleteModules(id)
          .subscribe(data => {
            if (data.respuesta === 'Success') {
              Swal.fire({
                type: 'success',
                title: 'Eliminacion exitosa',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                onClose: () => {
                  // redirect 
                  this.ngOnInit();
                }
              });
            } else {
              Swal.fire({
                type: 'error',
                title: 'Ups!, algo salio mal: \n' + data.respuesta,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000
              });
            }
          });
      }
    })

    // send to api backend delete module for id

  }
  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.listExcelModule, 'Reportemodulos');
  }
}
function getStatusIcon() {}
