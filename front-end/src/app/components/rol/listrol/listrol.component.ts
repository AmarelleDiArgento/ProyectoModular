import { Component, OnInit } from '@angular/core';
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
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';


@Component({
  selector: 'app-listrol',
  templateUrl: './listrol.component.html',
  styleUrls: ['./listrol.component.css']
})
export class ListrolComponent implements OnInit {
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
  // list data ws rol 
  listRol: {};
  // array from excel data
  listExcelRol: any[];
  texto = 'hiddensearch';
  filtro = true;
  lineas = 10;
  private searchFilter;
  constructor(private zone: NgZone,
    private http: Http,
    private formBuilder: FormBuilder, 
    private rolService: RolService, 
    private excelService: ExcelService,
    private router: Router) {
      this.columnDefs = [
        { headerName: 'ID', field: 'rol_id', sortable: true },
        { headerName: 'Nombre', field: 'name', sortable: true },
        { headerName: 'Accion', field: 'rol_id', sortable: true, width: 120 },
        { headerName: '', field: 'rol_id', sortable: true, width: 48 }
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
    this.rolService.getAllDataRols()
      .subscribe(data => {
        // populate list json privilege
        console.log(data.rows);

        this.listRol = data.rows;
        this.listExcelRol = data.rows;
      });
  }
  // obtain all data from the register rols
  getAllData() {
    // send to search api backend all rols
    this.rolService.getAllDataRols()
      .subscribe(data => {
        // populate list json rol
        this.listRol = data.rows;
      });
  }
  // redirect to create rol
  createRol() {
    this.router.navigate(['/createrol'])
  }
  // redirect to update rol
  updateRol(id) {
    // almacenamos el id
    localStorage.setItem('idRol', id);
    this.router.navigate(['/updaterol'])
  }
  // redirect to update rol
  updateRolPrivilege(id) {
    // almacenamos el id
    localStorage.setItem('idRol', id);
    this.router.navigate(['/rolprivilege'])
  }
  
  // delete rol
  deleteRol(id) {

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
        this.rolService.deleteRols(id)
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

    // send to api backend delete rol for id

  }
  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.listExcelRol, 'Reporteroles');
  }
}
function getStatusIcon() {}
