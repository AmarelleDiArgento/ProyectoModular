import { Component, OnInit } from '@angular/core';
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
// personaliza render

@Component({
  selector: 'app-listprivilege',
  templateUrl: './listprivilege.component.html',
  styleUrls: ['./listprivilege.component.css']
})
export class ListprivilegeComponent implements OnInit {


  private gridApi;
  private gridColumnApi;
  private columnDefs;
  private autoGroupColumnDef;
  private defaultColDef;
  private rowSelection;
  private rowGroupPanelShow;
  private pivotPanelShow;
  private paginationPageSize;
  private paginationNumberFormatter;
  private frameworkComponents;


  // list data ws privilege
  listPrivilege: [];
  // array from excel data
  listExcelPrivilege: any[];

  texto = 'hiddensearch';
  filtro = true;
  lineas = 10;
  private searchFilter;

  constructor(
    private http: Http,
    private formBuilder: FormBuilder,
    private privilegeService: PrivilegeService,
    private excelService: ExcelService,
    private router: Router) {
    this.columnDefs = [
      { headerName: 'ID', field: 'privilege_id', sortable: true },
      { headerName: 'Nombre', field: 'name', sortable: true },
      { headerName: 'Modulo', field: 'module_name', sortable: true },
      { headerName: 'Icono', field: 'icon', sortable: true },
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
