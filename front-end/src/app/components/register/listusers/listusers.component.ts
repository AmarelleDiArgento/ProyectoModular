import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
declare var $: any;

// service auth
import { UserService } from '../../../services/user.service';
import { ExcelService } from '../../../services/excel.service';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';

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
  // list data ws user
  listUser: {};
  // array from excel data
  listExcelUser: any[];
  texto = 'hiddensearch';
  filtro = true;
  lineas = 10;
  private searchFilter;
  constructor(private http: Http,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private excelService: ExcelService,
    private router: Router) {
    this.columnDefs = [
      { headerName: 'ID', field: 'user_id', sortable: true },
      { headerName: 'Nombre', field: 'username', sortable: true },
      { headerName: 'Correo', field: 'email', sortable: true },
      { headerName: 'Rol', field: 'rol_name', sortable: true },
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
      { headerName: 'Fecha creación', field: 'create_time', sortable: true,
        width: 190,
        filter: "agDateColumnFilter",
        filterParams: {
          comparator: function (filterLocalDateAtMidnight, cellValue) {
            var dateAsString = cellValue;
            var dateParts = dateAsString.split("/");
            var cellDate = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
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
        }
      },
      { headerName: 'Fecha modificación', field: 'update_time', sortable: true },
      { headerName: 'Accion', field: 'user_id', sortable: true, width: 120 },
      { headerName: '', field: 'user_id', sortable: true, width: 48 }
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
    this.userService.getAllDataUsers()
      .subscribe(data => {
        // populate list json privilege
        console.log(data.rows);

        this.listUser = data.rows;
        this.listExcelUser = data.rows;
      });
  }
  // obtain all data from the register users
  getAllData() {
    // send to search api backend all users
    this.userService.getAllDataUsers()
      .subscribe(data => {
        // populate list json users
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
  // delete user
  deleteUser(id) {
    // send to api backend delete user for id
    // localStorage.Id;
    this.userService.deleteUsers(id)
      .subscribe(data => {
        if (data.respuesta === 'Success') {
          // redirect
          this.ngOnInit();
        }
      });
  }
  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.listExcelUser, 'Reporteusuarios');
  }
}
function getStatusIcon() { }