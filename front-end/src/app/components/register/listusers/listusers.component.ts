import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
declare var $: any;

// service auth
import { UserService } from '../../../services/user.service';
// service Excel
import { ExcelService } from '../../../services/excel.service';
// print service
import { PrintService } from '../../../services/print.service';
import { RenderdeletebuttonComponent } from '../../aggridrender/renderdeletebutton/renderdeletebutton.component';
import { RendereditbuttonComponent } from '../../aggridrender/rendereditbutton/rendereditbutton.component';
import { RenderStatusComponent } from '../../aggridrender/render-status/render-status.component';

@Component({
  selector: 'app-listusers',
  templateUrl: './listusers.component.html',
  styleUrls: ['./listusers.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class ListusersComponent implements OnInit {

  gridApi;
  gridColumnApi;
  columnDefs;
  defaultColDef;
  rowSelection;
  paginationPageSize;
  paginationNumberFormatter;
  frameworkComponents;

  // list data ws user
  listUser: [];

  rowData: {};
  selected: any[][] = [];

  texto = 'hiddensearch';
  filtro = true;
  lineas = 10;
  searchFilter;
  width: number;
  height: number;

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
    this.paginationPageSize = 10;
    this.paginationNumberFormatter = function (params) {
      return '[' + params.value.toLocaleString() + ']';
    };
  }

  ngOnInit() {
    // charge data
    this.getAllData();

    // init material class for select and floating action button
    $(document).ready(function () {
      $('select').formSelect();
      $('.fixed-action-btn').floatingActionButton();
      $('.tap-target').tapTarget();
      $('.tap-target').tapTarget('open');
    });
    this.width = window.innerWidth - 10; // ancho
    this.height = window.innerHeight - (64 + 10) ; // alto
  }

  onRowSelected(event) {
    let exist: boolean = true;
    for (let i = 0; i < this.selected.length; i++) {
      const s = this.selected[i];
      if (s[0] === event.node.data.user_id) {
        console.log(s[0]);
        exist = false;
        break;
      }
    }
    if (exist) {
      this.selected.push([event.node.data.user_id, event.node.data.username]);
    }
    console.log(this.selected);

  }

  onRowUnSelected(id) {

    for (let i = 0; i < this.selected.length; i++) {
      const s = this.selected[i];
      if (s[0] === id) {
        s.splice(0, s.length);
        break;
      }
    }
    console.log(this.selected);

  }


  // paginator function
  onPageSizeChanged(value) {
    this.gridApi.paginationSetPageSize(Number(value));
  }
  // hide quick filter
  cambiaEstado() {
    console.log(this.filtro);

    this.texto = (this.filtro) ? '' : 'hiddensearch';
    this.filtro = !this.filtro;
  }
  // quick search filter
  quickSearch() {
    console.log(this.searchFilter);
    this.gridApi.setQuickFilter(this.searchFilter);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.rowData = this.listUser;
  }

  // obtain all data from the users
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

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.listUser, 'Reporteusuarios');
  }
  // service to print
  printFile() {
    this.printService.print();
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
