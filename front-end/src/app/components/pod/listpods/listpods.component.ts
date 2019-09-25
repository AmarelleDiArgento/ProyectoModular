import { Component, OnInit, Injectable } from '@angular/core';
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
import { RenderdeletebuttonComponent } from '../../aggridrender/renderdeletebutton/renderdeletebutton.component';
import { RendereditbuttonComponent } from '../../aggridrender/rendereditbutton/rendereditbutton.component';
import { RenderStatusComponent } from '../../aggridrender/render-status/render-status.component';

@Component({
  selector: 'app-listpods',
  templateUrl: './listpods.component.html',
  styleUrls: ['./listpods.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class ListpodsComponent implements OnInit {

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

  // list data ws pod
  listPod: [];
  rowData;

  texto = 'hiddensearch';
  filtro = true;
  lineas = 10;
  searchFilter;
  constructor(private http: Http,
    private formBuilder: FormBuilder,
    private podService: PodService,
    private excelService: ExcelService,
    private router: Router) {
    this.columnDefs = [
      { headerName: 'Nombre', field: 'name', sortable: true},
      { headerName: 'Código', field: 'code', sortable: true, width: 100 },
      { headerName: 'Dirección', field: 'address', sortable: true, width: 300 },
      { headerName: 'Teléfono', field: 'phone', sortable: true, width: 200 },
      { headerName: 'Límite de facturación', field: 'billing_limit', sortable: true, width: 200 },
      {
        headerName: 'Estado',
        field: 'status',
        sortable: true,
        cellRenderer: 'customizedStatusCell',
        width: 100
      },
      {
        headerName: '',
        field: 'pod_id',
        cellRenderer: 'customizedEditCell',
        cellRendererParams: {
          name: 'pod',
          Name: 'Pod'
        }, width: 80
      },
      {
        headerName: '', field: 'pod_id',
        cellRenderer: 'customizedDeleteCell',
        cellRendererParams: {
          name: 'pod',
          Name: 'Pod'
        }, width: 80
      }
    ];

    this.frameworkComponents = {
      customizedStatusCell: RenderStatusComponent,
      customizedEditCell: RendereditbuttonComponent,
      customizedDeleteCell: RenderdeletebuttonComponent
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
    this.paginationPageSize = 10;
    this.paginationNumberFormatter = function (params) {
      return params.value.toLocaleString();
    };
  }

  ngOnInit() {
    // this.getAllData();
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
    console.log(this.searchFilter);
    this.gridApi.setQuickFilter(this.searchFilter);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.rowData = this.listPod;
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


  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.listPod, 'Reportepod');
  }

  reload(){
    // send to reload data
    this.podService.getAllDataPod()
      .subscribe(data => {
        this.gridApi.setRowData(data.rows)
      });
  }

}
function getStatusIcon() { }
