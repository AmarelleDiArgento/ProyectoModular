import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
declare var $: any;
// service category
import { CategoryService } from '../../../services/category.service';

// service
import { ProductService } from '../../../services/product.service';
// service excel
import { ExcelService } from '../../../services/excel.service';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';

@Component({
  selector: 'app-listcategory',
  templateUrl: './listcategory.component.html',
  styleUrls: ['./listcategory.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class ListcategoryComponent implements OnInit {

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

  // list data ws category
  listCategory: [];
  rowData;

  texto = 'hiddensearch';
  filtro = true;
  lineas = 10;
  searchFilter;

  constructor(private http: Http,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
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
    console.log(params);

    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.rowData = this.listCategory;
  }
  // obtain all data from the category
  getAllData() {
    // send to search api backend all category
    this.categoryService.getAllDataCategory()
      .subscribe(data => {
        // populate list json
        this.listCategory = data.rows;
      });
  }
  // redirect to create category
  createCategory() {
    this.router.navigate(['/createcategory']);
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.listCategory, 'Reportecategorias');
  }
}

function getStatusIcon() { }