import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
// service auth
import { RolprivilegeService } from '../../../services/rolprivilege.service';

@Component({
  selector: 'app-rolprivilege',
  templateUrl: './rolprivilege.component.html',
  styleUrls: ['./rolprivilege.component.css']
})
export class RolprivilegeComponent implements OnInit {

  // list data ws rolprivilege 
  listRolPrivilege: {};

  idRol = '';

  constructor(private http: Http, private formBuilder: FormBuilder, private rolprivilegeService: RolprivilegeService, private router: Router) {
    this.getAllData();
  }

  ngOnInit() {
  }

  // obtain all data from the register rolprivileges
  getAllData() {
    // send to search api backend all rolprivileges

    this.idRol = localStorage.getItem('idRol');
    this.rolprivilegeService.getDataRolPrivilege(
      this.idRol

    )
      .subscribe(data => {
        // populate list json rolprivilege
        this.listRolPrivilege = data.rows;
        console.log(this.listRolPrivilege);

      });
  }
  // redirect to create rolprivilege
  createRolPrivilege() {
    this.router.navigate(['/createrolprivilege'])
  }
  // redirect to update rolprivilege
  updateRolPrivilege(id) {
    // almacenamos el id
    localStorage.setItem('idRolPrivilege', id);
    this.router.navigate(['/updaterolprivilege'])
  }
  // redirect to update rolprivilege
  updateRolPrivilegePrivilege(id) {
    // almacenamos el id
    localStorage.setItem('idRolPrivilege', id);
    this.router.navigate(['/rolprivilegeprivilege'])
  }

  // // delete rolprivilege
  // deleteRolPrivilege(id) {

  //   Swal.fire({
  //     title: 'Estas seguro?',
  //     text: 'No podras recuperar los cambios',
  //     type: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Si, eliminalo!'
  //   }).then((result) => {
  //     if (result.value) {
  //       this.rolprivilegeService.deleteRolPrivileges(id)
  //         .subscribe(data => {
  //           if (data.respuesta === 'Success') {
  //             Swal.fire({
  //               type: 'success',
  //               title: 'Eliminacion exitosa',
  //               toast: true,
  //               position: 'top-end',
  //               showConfirmButton: false,
  //               timer: 2000,
  //               onClose: () => {
  //                 // redirect 
  //                 location.reload();
  //               }
  //             });
  //           } else {
  //             Swal.fire({
  //               type: 'error',
  //               title: 'Ups!, algo salio mal: \n' + data.respuesta,
  //               toast: true,
  //               position: 'top-end',
  //               showConfirmButton: false,
  //               timer: 2000
  //             });
  //           }
  //         });
  //     }
  //   })

    // send to api backend delete rolprivilege for id

  }

