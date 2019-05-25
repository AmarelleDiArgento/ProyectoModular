import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
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

  columnDefs = [
    { headerName: 'ID', field: 'privilege_id', sortable: true, filter: true },
    { headerName: 'Nombre', field: 'name', sortable: true, filter: true }, // , , valueGetter: "'zz' + data.c.name"},
    // or use the object value, so value passed around is an object
    // {
    //     headerName: 'D',
    //     field: 'd',
    //     cellRenderer: 'boldRenderer',
    //     // this is needed to avoid toString=[object,object] result with objects
    //     getQuickFilterText: function(params) {
    //         return params.value.name;
    //     }
    // }, },
    { headerName: 'Modulo', field: 'module_name', sortable: true, filter: true },
    { headerName: 'Icono', field: 'icon', sortable: true, filter: true },
    { headerName: 'Ruta', field: 'route', sortable: true, filter: true },
    { headerName: 'Estado', field: 'status', sortable: true, filter: true }
  ];

  rowData = [];

  texto: string = 'hiddensearch';
  estadoPositivo: boolean = true;


  // list data ws privilege
  listPrivilege: [];
  // array from excel data
  listExcelPrivilege: any[];

  constructor(
    private http: Http,
    private formBuilder: FormBuilder,
    private privilegeService: PrivilegeService,
    private excelService: ExcelService,
    private router: Router) {
    this.getAllData();
  }

  ngOnInit() {
  }
  externalFilterChanged() {

  }
  cambiaEstado() {
    this.texto = (this.estadoPositivo) ? '' : 'hiddensearch';
    this.estadoPositivo = !this.estadoPositivo;
  }
  // obtain all data from the register privileges
  getAllData() {
    // send to search api backend all privileges
    this.privilegeService.getAllDataprivileges()
      .subscribe(data => {
        // populate list json privilege
        console.log(data.rows);

        this.listPrivilege = data.rows;

        this.listExcelPrivilege = data.rows;
      });
  }
  // redirect to create privilege
  createPrivilege() {
    this.router.navigate(['/createprivilege']);
  }
  // redirect to update privilege
  updatePrivilege(id) {
    // almacenamos el id
    localStorage.setItem('idPrivilege', id);
    this.router.navigate(['/updateprivilege']);
  }
  showModal() {

  }
  // delete privilege
  deletePrivilege(id) {


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
        // send to api backend delete privilege for id
        this.privilegeService.deleteprivileges(id)
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
                  location.reload();
                }
              });
            } else {
              Swal.fire({
                type: 'error',
                title: 'Ups!, algo salio mal: \n' + data.respuesta,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
              });
            }
          });
      }
    });
  }
  // export to file excel
  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.listExcelPrivilege, 'ReportePrivilegios');
  }
}
