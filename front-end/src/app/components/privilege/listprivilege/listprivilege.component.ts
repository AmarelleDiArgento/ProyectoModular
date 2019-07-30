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
