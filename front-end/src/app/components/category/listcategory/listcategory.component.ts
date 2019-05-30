import { Component, OnInit } from '@angular/core';
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
export class ListcategoryComponent implements OnInit {

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

 // list data ws category
 listCategory: {};
 // array from excel data
 listExcelCategory: any[];
 texto = 'hiddensearch';
 filtro = true;
 lineas = 10;
 private searchFilter;

 constructor(private http: Http,
   private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private excelService: ExcelService,
     private router: Router) {
      this.columnDefs = [
        { headerName: 'ID', field: 'category_id', sortable: true },
        { headerName: 'Nombre', field: 'name', sortable: true },
        { headerName: 'Accion', field: 'category_id', sortable: true, width: 120 },
        { headerName: '', field: 'category_id', sortable: true, width: 48 }
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
    this.categoryService.getAllDataCategory()
      .subscribe(data => {
        // populate list json privilege
        console.log(data.rows);

        this.listCategory = data.rows;
        this.listExcelCategory = data.rows;

      });
  }
 // obtain all data from the category
 getAllData() {
   // send to search api backend all category
   this.categoryService.getAllDataCategory()
   .subscribe(data => {
      // populate list json
       console.log(data);
      this.listCategory = data.rows;
      this.listExcelCategory = data.rows;
   });
 }
 // redirect to create category
 createCategory() {
   this.router.navigate(['/createcategory']);
 }
 // redirect to update category
 updateCategory(id) {
   // almacenamos el id
   localStorage.setItem('idCategory', id);
   this.router.navigate(['/updatecategory']);
 }
 // delete category
 deleteCategory(id) {
   // send to api backend delete category for id
   this.categoryService.deleteCategory(id)
   .subscribe(data => {
     if (data.respuesta === 'Success') {
       // redirect
       this.ngOnInit();
     }
   });
 }
  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.listExcelCategory, 'Reportecategorias');
  }
}

function getStatusIcon() {}