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
import { RenderresetbuttonComponent } from '../../aggridrender/renderresetbutton/renderresetbutton.component';

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
      { headerName: 'ID', field: 'user_id', width: 100 , sortable: true },
      { headerName: 'Nombre', field: 'username', sortable: true },
      { headerName: 'Email', field: 'email', sortable: true },
      { headerName: 'Rol', field: 'rol_name', sortable: true },
      {
        headerName: 'Fecha creación',
        field: 'create_time',
        sortable: true,
        width: 190,
        filter: 'agDateColumnFilter',
        filterParams: {
          comparator: filter
        }
      },
      {
        headerName: 'Fecha modificación',
        field: 'update_time',
        sortable: true,
        width: 190,
        filter: 'agDateColumnFilter',
        filterParams: {
          comparator: filter
        }
      },
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
      },
      {
        headerName: '',
        field: 'user_id',
        cellRenderer: 'customizedResetCell',
        cellRendererParams: {
          name: 'user',
          Name: 'User'
        }, width: 80
      }
    ];

    this.frameworkComponents = {
      customizedEditCell: RendereditbuttonComponent,
      customizedStatusCell: RenderStatusComponent,
      customizedResetCell: RenderresetbuttonComponent
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
    //console.log(this.searchFilter);
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
// function filter for date
function filter(filterLocalDateAtMidnight, cellValue) {
  const dateAsString = cellValue;
  const datePartsA = dateAsString.split(' ');
  const datePartsB = datePartsA[0].split('-');

  const cellDate = new Date(Number(datePartsB[0]), Number(datePartsB[1]) - 1, Number(datePartsB[2]));
  if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
    return 0;
  }
  if (cellDate < filterLocalDateAtMidnight) {
    return -1;
  }
  if (cellDate > filterLocalDateAtMidnight) {
    return 1;
  }
}