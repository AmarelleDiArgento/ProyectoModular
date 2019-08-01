import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
declare var $: any;

// service auth
import { UserService } from '../../services/user.service';
// service Excel
import { ExcelService } from '../../services/excel.service';
//print service
import { PrintService } from '../../services/print.service';

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

  // list data ws user
  listUser: [];

  texto = 'hiddensearch';
  filtro = true;
  lineas = 10;
  searchFilter;

  constructor(private http: Http,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private excelService: ExcelService,
    private printService: PrintService,

    private router: Router) { }

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
    console.log(this.filtro);

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

    // send to search api backend all users
    this.userService.getAllDataUsers()
      .subscribe(data => {
        // populate list json users
        this.listUser = data.rows;
      });
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
