import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
declare var $: any;
// service auth
import { PrivilegeService } from '../../../services/privilege.service';
// service excel
import { ExcelService } from '../../../services/excel.service';
import { RenderStatusComponent } from '../../aggridrender/render-status/render-status.component';
import { RenderdeletebuttonComponent } from '../../aggridrender/renderdeletebutton/renderdeletebutton.component';
import { RendereditbuttonComponent } from '../../aggridrender/rendereditbutton/rendereditbutton.component';
import { RendermaterialiconComponent } from '../../aggridrender/rendermaterialicon/rendermaterialicon.component';
// personaliza render

@Component({
  selector: 'app-listprivilege',
  templateUrl: './listprivilege.component.html',
  styleUrls: ['./listprivilege.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class ListprivilegeComponent implements OnInit {


  gridApi;
  gridColumnApi;
  columnDefs;
  autoGroupColumnDef;
  defaultColDef;
  rowSelection;
  rowGroupPanelShow;
  pivotPanelShow;
  paginationPageSize;
  paginationNumberFormatter;
  frameworkComponents;


  // list data ws privilege
  listPrivilege: [];
  rowData;

  texto = 'hiddensearch';
  filtro = true;
  lineas = 10;
  searchFilter;

  constructor(
    private http: Http,
    private formBuilder: FormBuilder,
    private privilegeService: PrivilegeService,
    private excelService: ExcelService,
    private router: Router) {
    this.columnDefs = [
      { headerName: 'ID', field: 'privilege_id', sortable: true, width: 80 },
      { headerName: 'Nombre', field: 'name', sortable: true },
      { headerName: 'Modulo', field: 'module_name', sortable: true },
      {
        headerName: 'Icono', field: 'icon',
        cellRenderer: 'customizedMaterialIcon',
        cellRendererParams: {
          name: 'privilege',
          Name: 'Privilege'
        }, width: 100
      },
      { headerName: 'Ruta', field: 'route', sortable: true },
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
      customizedDeleteCell: RenderdeletebuttonComponent,
      customizedMaterialIcon: RendermaterialiconComponent
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
    this.rowData = this.listPrivilege;
  }
  // obtain all data from the privileges
  getAllData() {
    // send to search api backend all privileges
    this.privilegeService.getAllDataprivileges()
      .subscribe(data => {
        // populate list json privilege
        this.listPrivilege = data.rows;
      });
  }
  // export to file excel
  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.listPrivilege, 'ReportePrivilegios');
  }
  // redirect to create privilege
  createPrivilege() {
    this.router.navigate(['/createprivilege']);
  }
}
