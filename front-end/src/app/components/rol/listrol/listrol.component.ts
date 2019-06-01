import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { NgZone } from '@angular/core';
declare var $: any;
// service auth
import { RolService } from '../../../services/rol.service';
// service excel
import { ExcelService } from '../../../services/excel.service';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { RenderStatusComponent } from '../../aggridrender/render-status/render-status.component';
import { RendereditbuttonComponent } from '../../aggridrender/rendereditbutton/rendereditbutton.component';
import { RenderdeletebuttonComponent } from '../../aggridrender/renderdeletebutton/renderdeletebutton.component';


@Component({
  selector: 'app-listrol',
  templateUrl: './listrol.component.html',
  styleUrls: ['./listrol.component.css']
})
export class ListrolComponent implements OnInit {
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
  private frameworkComponents;
  // list data ws rol
  listRol: [];
  
  texto = 'hiddensearch';
  filtro = true;
  lineas = 10;
  private searchFilter;
  constructor(private zone: NgZone,
    private http: Http,
    private formBuilder: FormBuilder,
    private rolService: RolService,
    private excelService: ExcelService,
    private router: Router) {
    this.columnDefs = [
      { headerName: 'ID', field: 'rol_id', sortable: true },
      { headerName: 'Nombre', field: 'name', sortable: true },
      {
        headerName: '',
        field: 'rol_id',
        cellRenderer: 'customizedEditCell',
        cellRendererParams: {
          name: 'rol',
          Name: 'Rol'
        }, width: 80
      },
      {
        headerName: '', field: 'rol_id',
        cellRenderer: 'customizedDeleteCell',
        cellRendererParams: {
          name: 'rol',
          Name: 'Rol'
        }, width: 80
      }
    ];
    this.frameworkComponents = {
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
      return '' + params.value.toLocaleString() + '';
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

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    // send to search api backend all privileges
    this.rolService.getAllDataRol()
      .subscribe(data => {
        // populate list json privilege
        console.log(data.rows);

        this.listRol = data.rows;
      });
  }

  // redirect to create rol
  createRol() {
    this.router.navigate(['/createrol']);
  }
  
  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.listRol, 'Reporteroles');
  }
}