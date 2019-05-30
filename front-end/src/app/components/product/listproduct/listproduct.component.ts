import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-listproduct',
  templateUrl: './listproduct.component.html',
  styleUrls: ['./listproduct.component.css']
})
export class ListproductComponent implements OnInit {
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
  // list data ws product
  listProduct: {};
  // array from excel data
  listExcelProduct: any[];
  texto = 'hiddensearch';
  filtro = true;
  lineas = 10;
  private searchFilter;
  constructor(
    private http: Http,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private excelService: ExcelService,
    private router: Router) {
      this.columnDefs = [
        { headerName: 'ID', field: 'product_id', sortable: true },
        { headerName: 'Codigo', field: 'name', sortable: true },
        { headerName: 'Nombre', field: 'name', sortable: true },
        { headerName: 'Precio', field: 'net_price', sortable: true },
        { headerName: 'Categoria', field: 'category_id', sortable: true },
        { headerName: 'Impuesto', field: 'tax_id', sortable: true },
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
        { headerName: 'Accion', field: 'product_id', sortable: true, width: 120 },
        { headerName: '', field: 'product_id', sortable: true, width: 48 }
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
    // get data
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
    this.productService.getAllDataProduct()
      .subscribe(data => {
        // populate list json privilege
        console.log(data.rows);

        this.listProduct = data.rows;
        this.listExcelProduct = data.rows;
      });
  }
  // obtain all data from the product
  getAllData() {
    // send to search api backend all product
    // this.productService.getAllDataProduct()
    //   .subscribe(data => {
    //     // populate list json
    //     console.log(data);
    //     this.listProduct = data.rows;
    //     // populate excel data
    //     this.listExcelProduct = data.rows;
    //   });

  }
  // redirect to create product
  createProduct() {
    this.router.navigate(['/createproduct']);
  }
  // redirect to update product
  updateProduct(id) {
    // almacenamos el id
    localStorage.setItem('idProduct', id);
    this.router.navigate(['/updateproduct']);
  }
  // delete product
  deleteProduct(id) {


    Swal.fire({
      title: 'Estas seguro?',
      text: 'No podras recuperar los cambios',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo!'
    }).then((result) => {
      if (result.value) {

        // send to api backend delete product for id
        this.productService.deleteProduct(id)
          .subscribe(data => {
            if (data.respuesta === 'Success') {
              Swal.fire({
                type: 'success',
                title: 'Eliminacion exitosa',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                onClose: () => {
                  // redirect
                  this.ngOnInit();
                }
              });
            } else {
              Swal.fire({
                type: 'error',
                title: 'Ups!, algo salio mal: \n' + data.respuesta,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000
              });
            }
          });
      }
    });
  }
  // export to file excel
  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.listExcelProduct, 'ReporteProductos');
  }
}
function getStatusIcon() {}
