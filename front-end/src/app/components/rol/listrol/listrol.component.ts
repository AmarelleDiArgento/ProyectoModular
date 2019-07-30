import { Component, OnInit, Injectable } from '@angular/core';
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


@Component({
  selector: 'app-listrol',
  templateUrl: './listrol.component.html',
  styleUrls: ['./listrol.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class ListrolComponent implements OnInit {
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
  // list data ws rol
  listRol: [];
  rowData

  texto = 'hiddensearch';
  filtro = true;
  lineas = 10;
  searchFilter;
  constructor(private zone: NgZone,
    private http: Http,
    private formBuilder: FormBuilder,
    private rolService: RolService,
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
    console.log(this.searchFilter);
    this.gridApi.setQuickFilter(this.searchFilter);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.rowData = this.listRol;
  }

  getAllData() {
    // send to search api backend all category
    this.rolService.getAllDataRol()
      .subscribe(data => {
        // populate list json
        console.log(data);
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