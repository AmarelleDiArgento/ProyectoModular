import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
declare var $: any;
// service auth
import { PodService } from '../../../services/pod.service';
// service excel
import { ExcelService } from '../../../services/excel.service';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';

@Component({
  selector: 'app-listpods',
  templateUrl: './listpods.component.html',
  styleUrls: ['./listpods.component.css']
})
export class ListpodsComponent implements OnInit {

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
  // list data ws pod 
  listPod: {};
  // array from excel data
  listExcelPod: any[];
  texto = 'hiddensearch';
  filtro = true;
  lineas = 10;
  private searchFilter;
  constructor(private http: Http,
    private formBuilder: FormBuilder,
    private podService: PodService,
    private excelService: ExcelService,
    private router: Router) {
    this.columnDefs = [
      { headerName: 'ID', field: 'pod_id', sortable: true },
      { headerName: 'Nombre', field: 'name', sortable: true },
      { headerName: 'Dirección', field: 'address', sortable: true },
      { headerName: 'Teléfono', field: 'phone', sortable: true },
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
      { headerName: 'Accion', field: 'pod_id', sortable: true, width: 120 },
      { headerName: '', field: 'pod_id', sortable: true, width: 48 }
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
    this.podService.getAllDataPod()
      .subscribe(data => {
        // populate list json privilege
        console.log(data.rows);

        this.listPod = data.rows;
        this.listExcelPod = data.rows;
      });
  }
  // obtain all data from the register pods
  getAllData() {
    // send to search api backend all pods
    this.podService.getAllDataPod()
      .subscribe(data => {
        // populate list json pod
        this.listPod = data.rows;
      });
  }
  // redirect to create pod
  createPod() {
    this.router.navigate(['/createpod'])
  }
  // redirect to update pod
  updatePod(id) {
    // almacenamos el id
    localStorage.setItem('idPod', id);
    this.router.navigate(['/updatepod'])
  }

  // delete pod
  deletePod(id) {

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
        this.podService.deletePod(id)
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
    
    // send to api backend delete pod for id

  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.listExcelPod, 'Reportepod');
  }
}
function getStatusIcon() { }
