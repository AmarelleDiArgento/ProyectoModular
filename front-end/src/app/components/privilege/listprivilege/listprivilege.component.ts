import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
declare var $: any;
// service auth
import { PrivilegeService } from '../../../services/privilege.service';
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
  private components;
  private columnDefs;
  private autoGroupColumnDef;
  private defaultColDef;
  private rowSelection;
  private rowGroupPanelShow;
  private pivotPanelShow;
  private paginationPageSize;
  private paginationNumberFormatter;


  // list data ws privilege
  listPrivilege: [];
  // array from excel data
  listExcelPrivilege: any[];

  texto = 'hiddensearch';
  filtro = true;
  lineas = 10;
  private searchFilter;

  constructor(
    private http: Http,
    private formBuilder: FormBuilder,
    private privilegeService: PrivilegeService,
    private excelService: ExcelService,
    private router: Router) {
    this.columnDefs = [
      { headerName: 'ID', field: 'privilege_id', sortable: true },
      { headerName: 'Nombre', field: 'name', sortable: true },
      { headerName: 'Modulo', field: 'module_name', sortable: true },
      { headerName: 'Icono', field: 'icon', sortable: true },
      { headerName: 'Ruta', field: 'route', sortable: true },
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
      { headerName: 'Accion', field: 'privilege_id', sortable: true, width: 120 },
      { headerName: '', field: 'privilege_id', sortable: true, width: 48 }
    ];
    this.components = { statusIcon: MyCellRenderer() };

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
      return '' + params.value.toLocaleString() + '';
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


// function to act as a class
function MyCellRenderer() { }

// gets called once before the renderer is used
MyCellRenderer.prototype.init = function (params) {
  console.log(' 1 Hola');
  // create the cell
  this.eGui = document.createElement('div');
  this.eGui.innerHTML = '<span class="my-css-class"><button class="btn-simple">Push Me</button><span class="my-value"></span></span>';

  // get references to the elements we want
  this.eButton = this.eGui.querySelector('.btn-simple');
  this.eValue = this.eGui.querySelector('.my-value');

  // set value into cell
  this.eValue.innerHTML = params.valueFormatted ? params.valueFormatted : params.value;

  // add event listener to button
  this.eventListener = function () {
    console.log('button was clicked!!');
  };
  this.eButton.addEventListener('click', this.eventListener);
};

// gets called once when grid ready to insert the element
MyCellRenderer.prototype.getGui = function () {
  console.log(' 2 Hola');
  return this.eGui;
};

// gets called whenever the user gets the cell to refresh
MyCellRenderer.prototype.refresh = function (params) {
  console.log(' 3 Hola');
  // set value into cell again
  this.eValue.innerHTML = params.valueFormatted ? params.valueFormatted : params.value;
  // return true to tell the grid we refreshed successfully
  return true;
};

// gets called when the cell is removed from the grid
MyCellRenderer.prototype.destroy = function () {
  console.log(' 4 Hola');
  // do cleanup, remove event listener from button
  this.eButton.removeEventListener('click', this.eventListener);
};



// function getStatusIcon() {
//   function SimpleCellRenderer() {}

//   SimpleCellRenderer.prototype.init = function(params) {
//     var tempDiv = document.createElement("div");

//     if (params.value === 1) {

//       tempDiv.innerHTML = `
//       <span style="color: greenyellow;">
//         <i class="fas fa-circle"></i>
//       </span>`;
//     } else {

//       tempDiv.innerHTML = `
//       <span style="color: gray;">
//         <i class="fas fa-circle"></i>
//       </span>
//       `;
//     }
//     this.eGui = tempDiv.firstChild;
//   };

//   SimpleCellRenderer.prototype.getGui = function() {
//     return this.eGui;
//   };
//   return SimpleCellRenderer;
// }




// -----------------------------------------------------------------------------------------








// `<i class="material-icons" title="Modificar" (click)="updateUser(${params.value})">edit</i>&nbsp;`;
// <i class="material-icons" title="Modificar" (click)="updateUser(item.user_id)">edit</i>&nbsp;
// <i class="material-icons" title="Eliminar" (click)="deleteUser(item.user_id)">delete</i>
//   columnDefs = [
//     { headerName: 'ID', field: 'privilege_id', sortable: true },
//     { headerName: 'Nombre', field: 'name', sortable: true },
//     { headerName: 'Modulo', field: 'module_name', sortable: true },
//     { headerName: 'Icono', field: 'icon', sortable: true },
//     { headerName: 'Ruta', field: 'route', sortable: true },
//     { headerName: 'Estado', field: 'status', sortable: true }
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
