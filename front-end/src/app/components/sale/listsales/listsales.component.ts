import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
declare var $: any;
// service auth
import { SaleService } from '../../../services/sale.service';
// service excel
import { ExcelService } from '../../../services/excel.service';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';

@Component({
  selector: 'app-listsales',
  templateUrl: './listsales.component.html',
  styleUrls: ['./listsales.component.css']
})
export class ListsalesComponent implements OnInit {
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
  // list data ws sale 
  listSale: {};
  // array from excel data
  listExcelsale: any[];
  texto = 'hiddensearch';
  filtro = true;
  lineas = 10;
  private searchFilter;
  constructor(private http: Http, 
    private formBuilder: FormBuilder, 
    private saleService: SaleService, 
    private excelService: ExcelService,
    private router: Router) {
      this.columnDefs = [
        { headerName: 'ID', field: 'sale_id', sortable: true },
        { headerName: 'Fecha', field: 'date', sortable: true },
        { headerName: 'punto de venta', field: 'pod_id', sortable: true },
        { headerName: 'Usuario', field: 'user_id', sortable: true },
        { headerName: 'Cliente', field: 'client_id', sortable: true },
        { headerName: 'Accion', field: 'sale_id', sortable: true, width: 120 },
        { headerName: '', field: 'sale_id', sortable: true, width: 48 }
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
    this.saleService.getAllDataSale()
      .subscribe(data => {
        // populate list json privilege
        console.log(data.rows);

        this.listSale = data.rows;
        this.listExcelsale = data.rows;
      });
  }
  // obtain all data from the register sales
  getAllData() {
    // send to search api backend all sales
    this.saleService.getAllDataSale()
      .subscribe(data => {
        // populate list json sale
        this.listSale = data.rows;
      });
  }
  // redirect to create sale
  createSale() {
    this.router.navigate(['/createsale'])
  }
  // redirect to update sale
  updateSale(id) {
    // almacenamos el id
    localStorage.setItem('idSale', id);
    this.router.navigate(['/updatesale'])
  }

  // delete sale
  deleteSale(id) {

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
        this.saleService.deleteSale(id)
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
    })

    // send to api backend delete sale for id

  }
  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.listExcelsale, 'Reporteventas');
  }
}
function getStatusIcon() {}