import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
// service auth
import { PrivilegeService } from '../../../services/privilege.service';

@Component({
  selector: 'app-listprivilege',
  templateUrl: './listprivilege.component.html',
  styleUrls: ['./listprivilege.component.css']
})
export class ListprivilegeComponent implements OnInit {

  columnDefs = [
    { headerName: 'privilege_id', field: 'privilege_id', sortable: true, filter: true },
    { headerName: 'name', field: 'name', sortable: true, filter: true },
    { headerName: 'module_id', field: 'module_id', sortable: true, filter: true },
    { headerName: 'icon', field: 'icon', sortable: true, filter: true },
    { headerName: 'route', field: 'route', sortable: true, filter: true },
    { headerName: 'status', field: 'status', sortable: true, filter: true }
  ];

  rowData = [];

  // list data ws privilege 
  listPrivilege: [];

  constructor(private http: Http, private formBuilder: FormBuilder, private privilegeService: PrivilegeService, private router: Router) {
    
  }

  ngOnInit() {
    this.getAllData();
  }

  // obtain all data from the register privileges
  getAllData() {
    // send to search api backend all privileges
    this.privilegeService.getAllDataprivileges()
      .subscribe(data => {
        // populate list json privilege
        console.log(data.rows);

        this.listPrivilege = data.rows;
      });
  }
  // redirect to create privilege
  createPrivilege() {
    this.router.navigate(['/createprivilege'])
  }
  // redirect to update privilege
  updatePrivilege(id) {
    // almacenamos el id
    localStorage.setItem('idPrivilege', id);
    this.router.navigate(['/updateprivilege'])
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
                timer: 3000
              });
            }
          });
      }
    })

    // send to api backend delete privilege for id

  }
}
