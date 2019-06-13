import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
declare var $: any;


// service
import { ProductService } from '../../../services/product.service';
// service excel
import { ExcelService } from '../../../services/excel.service';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { RenderStatusComponent } from '../../aggridrender/render-status/render-status.component';
import { RendereditbuttonComponent } from '../../aggridrender/rendereditbutton/rendereditbutton.component';
import { RenderdeletebuttonComponent } from '../../aggridrender/renderdeletebutton/renderdeletebutton.component';
import { RenderbarcodeComponent } from '../../aggridrender/renderbarcode/renderbarcode.component';

@Component({
  selector: 'app-listproduct',
  templateUrl: './listproduct.component.html',
  styleUrls: ['./listproduct.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class ListproductComponent implements OnInit {
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

  // list data ws product
  listProduct: [];

  texto = 'hiddensearch';
  filtro = true;
  lineas = 10;
  searchFilter;
  constructor(
    private http: Http,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private excelService: ExcelService,
    private router: Router) {
    this.columnDefs = [
      { headerName: 'ID', field: 'product_id', sortable: true },
      {
        headerName: 'Codigo', field: 'code',
        cellRenderer: 'customizedBarCode',
        cellRendererParams: {
          name: 'product',
          Name: 'Product'
        }
      },
      { headerName: 'Nombre', field: 'name', sortable: true },
      { headerName: 'Precio', field: 'net_price', sortable: true },
      { headerName: 'Categoria', field: 'category_name', sortable: true },
      { headerName: 'Impuesto', field: 'tax_name', sortable: true },
      {
        headerName: '',
        field: 'product_id',
        cellRenderer: 'customizedEditCell',
        cellRendererParams: {
          name: 'product',
          Name: 'Product'
        }, width: 80
      },
      {
        headerName: '', field: 'product_id',
        cellRenderer: 'customizedDeleteCell',
        cellRendererParams: {
          name: 'product',
          Name: 'Product'
        }, width: 80
      }
    ];

    this.frameworkComponents = {
      customizedBarCode: RenderbarcodeComponent,
      customizedStatusCell: RenderStatusComponent,
      customizedEditCell: RendereditbuttonComponent,
      customizedDeleteCell: RenderdeletebuttonComponent
    },

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
      return params.value.toLocaleString();
    };
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
    // console.log(this.searchFilter);
    this.gridApi.setQuickFilter(this.searchFilter);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    // send to search api backend all privileges
    this.productService.getAllDataProduct()
      .subscribe(data => {
        // populate list json privilege
        this.listProduct = data.rows;
      });
  }
  // obtain all data from the privileges
  getAllData() {
     // send to search api backend all privileges
     this.productService.getAllDataProduct()
     .subscribe(data => {
       // populate list json privilege
       this.listProduct = data.rows;
     });
  }
  // redirect to create product
  createProduct() {
    this.router.navigate(['/createproduct']);
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.listProduct, 'ReporteProductos');
  }
}