import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { NgZone } from '@angular/core';
declare var $: any;
// service auth
import { UserService } from '../../../services/user.service';
// service excel
import { ExcelService } from '../../../services/excel.service';
import { RendereditbuttonComponent } from '../../aggridrender/rendereditbutton/rendereditbutton.component';
import { RenderStatusComponent } from '../../aggridrender/render-status/render-status.component';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class ListuserComponent implements OnInit {
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
  rowData;
  // list data ws user
  listUser: [];
  texto = 'hiddensearch';
  filtro = true;
  lineas = 10;
  searchFilter;

  constructor(
    private zone: NgZone,
    private http: Http,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private excelService: ExcelService,
    private router: Router) {
    this.columnDefs = [
      { headerName: 'ID', field: 'user_id', sortable: true },
      { headerName: 'Nombre', field: 'username', sortable: true },
      { headerName: 'Email', field: 'email', sortable: true },
      { headerName: 'Rol', field: 'rol_name', sortable: true },
      {
        headerName: 'Estado',
        field: 'status',
        sortable: true,
        cellRenderer: 'customizedStatusCell',
        width: 100
      },
      {
        headerName: '',
        field: 'user_id',
        cellRenderer: 'customizedEditCell',
        cellRendererParams: {
          name: 'user',
          Name: 'User'
        }, width: 80
      }
    ];

    this.frameworkComponents = {
      customizedEditCell: RendereditbuttonComponent,
      customizedStatusCell: RenderStatusComponent
    };

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


  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.rowData = this.listUser;
  }

  getAllData() {
    // send to search api backend all category
    this.userService.getAllDataUsers()
      .subscribe(data => {
        // populate list json
        console.log(data);
        this.listUser = data.rows;
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

  // redirect to create rol
  createUser() {
    this.router.navigate(['/createuser']);
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.listUser, 'ReporteUsuarios');
  }
}
