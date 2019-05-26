import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
declare var $: any;
// service auth
import { PrivilegeService } from '../../../services/privilege.service';

// service
import { ProductService } from '../../../services/product.service';
// service excel
import { ExcelService } from '../../../services/excel.service';

@Component({
  selector: 'app-listprivilege',
  templateUrl: './listprivilege.component.html',
  styleUrls: ['./listprivilege.component.css']
})
export class ListprivilegeComponent implements OnInit {


  private gridApi;
  private gridColumnApi;

  private columnDefs;
  private autoGroupColumnDef;
  private defaultColDef;
  private rowSelection;
  private rowGroupPanelShow;
  private pivotPanelShow;
  private paginationPageSize;
  private paginationNumberFormatter;
  private rowData: [];


  // list data ws privilege
  listPrivilege: [];
  // array from excel data
  listExcelPrivilege: any[];
  texto: string = 'hiddensearch';
  filtro: boolean = true;
  lineas: number = 10;

  constructor(
    private http: Http,
    private formBuilder: FormBuilder,
    private privilegeService: PrivilegeService,
    private excelService: ExcelService,
    private router: Router) {
    this.columnDefs = [
      { headerName: 'ID', field: 'privilege_id', sortable: true, filter: true, filterParams: { newRowsAction: 'keep' } },
      { headerName: 'Nombre', field: 'name', sortable: true, filter: true },
      { headerName: 'Modulo', field: 'module_name', sortable: true, filter: true },
      { headerName: 'Icono', field: 'icon', sortable: true, filter: true },
      { headerName: 'Ruta', field: 'route', sortable: true, filter: true },
      { headerName: 'Estado', field: 'status', sortable: true, filter: true },
      { headerName: 'Editar', field: 'privilege_id', sortable: true, filter: true },
      { headerName: 'Eliminar', field: 'privilege_id', sortable: true, filter: true }
    ];
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

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    // send to search api backend all privileges
    this.privilegeService.getAllDataprivileges()
      .subscribe(data => {
        // populate list json privilege
        console.log(data.rows);

        this.rowData = data.rows;
        this.listPrivilege = data.rows;

        this.listExcelPrivilege = data.rows;
      });
  }
}





//   columnDefs = [
//     { headerName: 'ID', field: 'privilege_id', sortable: true, filter: true },
//     { headerName: 'Nombre', field: 'name', sortable: true, filter: true },
//     { headerName: 'Modulo', field: 'module_name', sortable: true, filter: true },
//     { headerName: 'Icono', field: 'icon', sortable: true, filter: true },
//     { headerName: 'Ruta', field: 'route', sortable: true, filter: true },
//     { headerName: 'Estado', field: 'status', sortable: true, filter: true }
//   ];

//   rowData = [];

//   texto: string = 'hiddensearch';
//   filtro: boolean = true;
//   lineas: number = 10;


//   // list data ws privilege
//   listPrivilege: [];
//   // array from excel data
//   listExcelPrivilege: any[];

//   constructor(
//     private http: Http,
//     private formBuilder: FormBuilder,
//     private privilegeService: PrivilegeService,
//     private excelService: ExcelService,
//     private router: Router) {
//   }

//   ngOnInit() {
//     this.getAllData();

//   }
//   externalFilterChanged() {

//   }
//   cambiaEstado() {
//     this.texto = (this.filtro) ? '' : 'hiddensearch';
//     this.filtro = !this.filtro;
//   }
//   onChangeNumRows(value) {
//     this.lineas = value;
//   }
//   // obtain all data from the register privileges
//   getAllData() {
//     // send to search api backend all privileges
//     this.privilegeService.getAllDataprivileges()
//       .subscribe(data => {
//         // populate list json privilege
//         console.log(data.rows);

//         this.listPrivilege = data.rows;

//         this.listExcelPrivilege = data.rows;
//       });

//     $(document).ready(function () {
//       $('select').formSelect();
//     });

//   }
//   // redirect to create privilege
//   createPrivilege() {
//     this.router.navigate(['/createprivilege']);
//   }
//   // redirect to update privilege
//   updatePrivilege(id) {
//     // almacenamos el id
//     localStorage.setItem('idPrivilege', id);
//     this.router.navigate(['/updateprivilege']);
//   }
//   showModal() {

//   }
//   // delete privilege
//   deletePrivilege(id) {


//     Swal.fire({
//       title: 'Estas seguro?',
//       text: 'No podras recuperar los cambios',
//       type: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Si, eliminalo!'
//     }).then((result) => {
//       if (result.value) {
//         // send to api backend delete privilege for id
//         this.privilegeService.deleteprivileges(id)
//           .subscribe(data => {
//             if (data.respuesta === 'Success') {
//               Swal.fire({
//                 type: 'success',
//                 title: 'Eliminacion exitosa',
//                 toast: true,
//                 position: 'top-end',
//                 showConfirmButton: false,
//                 timer: 2000,
//                 onClose: () => {
//                   // redirect 
//                   this.ngOnInit();
//                 }
//               });
//             } else {
//               Swal.fire({
//                 type: 'error',
//                 title: 'Ups!, algo salio mal: \n' + data.respuesta,
//                 toast: true,
//                 position: 'top-end',
//                 showConfirmButton: false,
//                 timer: 3000
//               });
//             }
//           });
//       }
//     });
//   }
//   // export to file excel
//   exportAsXLSX(): void {
//     this.excelService.exportAsExcelFile(this.listExcelPrivilege, 'ReportePrivilegios');
//   }
// }
