import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
declare var $: any;
// service auth
import { PodService } from '../../../services/pod.service';
// service excel
import { ExcelService } from '../../../services/excel.service';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';

@Component({
  selector: 'app-listpods',
  templateUrl: './listpods.component.html',
  styleUrls: ['./listpods.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class ListpodsComponent implements OnInit {

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

  // list data ws pod
  listPod: [];
  rowData;

  texto = 'hiddensearch';
  filtro = true;
  lineas = 10;
  searchFilter;
  constructor(private http: Http,
    private formBuilder: FormBuilder,
    private podService: PodService,
    private excelService: ExcelService,
    private router: Router) {
    
  }

  ngOnInit() {
    // this.getAllData();
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
    this.rowData = this.listPod;
  }
  // obtain all data from the register pods
  getAllData() {
    // send to search api backend all pods
    this.podService.getAllDataPod()
      .subscribe(data => {
        // populate list json pod
        this.listPod = data.rows;
      });
  }
  // redirect to create pod
  createPod() {
    this.router.navigate(['/createpod'])
  }


  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.listPod, 'Reportepod');
  }
}
function getStatusIcon() { }
