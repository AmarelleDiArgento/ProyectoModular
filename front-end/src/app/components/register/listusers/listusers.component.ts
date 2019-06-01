import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
declare var $: any;

// service auth
import { UserService } from '../../../services/user.service';
// service Excel
import { ExcelService } from '../../../services/excel.service';
//print service
import { PrintService } from '../../../services/print.service';
import { RenderdeletebuttonComponent } from '../../aggridrender/renderdeletebutton/renderdeletebutton.component';
import { RendereditbuttonComponent } from '../../aggridrender/rendereditbutton/rendereditbutton.component';
import { RenderStatusComponent } from '../../aggridrender/render-status/render-status.component';

@Component({
  selector: 'app-listusers',
  templateUrl: './listusers.component.html',
  styleUrls: ['./listusers.component.css']
})
export class ListusersComponent implements OnInit {

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

  // list data ws user
  listUser: [];

  texto = 'hiddensearch';
  filtro = true;
  lineas = 10;
  private searchFilter;
  constructor(private http: Http,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private excelService: ExcelService,
    private printService: PrintService,

    private router: Router) {
    this.columnDefs = [
      { headerName: 'ID', field: 'user_id', sortable: true },
      { headerName: 'Nombre', field: 'username', sortable: true },
      { headerName: 'Correo', field: 'email', sortable: true },
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
        headerName: '', field: 'user_id',
        cellRenderer: 'customizedDeleteCell',
        cellRendererParams: {
          name: 'user',
          Name: 'User'
        }, width: 80
      }
    ];

    this.frameworkComponents = {
      customizedStatusCell: RenderStatusComponent,
      customizedEditCell: RendereditbuttonComponent,
      customizedDeleteCell: RenderdeletebuttonComponent
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

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    // send to search api backend all privileges
    this.userService.getAllDataUsers()
      .subscribe(data => {
        // populate list json privilege
        console.log(data.rows);

        this.listUser = data.rows;
      });
  }

  // redirect to create user
  createUser() {
    this.router.navigate(['/createuser']);
  }
  // redirect to update user
  updateUser(id) {
    // almacenamos el id
    localStorage.setItem('idUser', id);
    this.router.navigate(['/updateuser']);
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.listUser, 'Reporteusuarios');
  }
  //service to print
  printFile() {
    this.printService.print();
  }
}


function filter(filterLocalDateAtMidnight, cellValue) {
  var dateAsString = cellValue;
  var datePartsA = dateAsString.split(' ');
  var datePartsB = datePartsA[0].split('-');

  var cellDate = new Date(Number(datePartsB[0]), Number(datePartsB[1]) - 1, Number(datePartsB[2]));
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
