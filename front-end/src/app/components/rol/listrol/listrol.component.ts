import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
// service auth
import { RolService } from '../../../services/rol.service';

@Component({
  selector: 'app-listrol',
  templateUrl: './listrol.component.html',
  styleUrls: ['./listrol.component.css']
})
export class ListrolComponent implements OnInit {

  // list data ws rol 
  listRol: {};

  constructor(private http: Http, private formBuilder: FormBuilder, private rolService: RolService, private router: Router) {
    this.getAllData();
  }

  ngOnInit() {
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
                timer: 2000
              });
            }
          });
      }
    });

    // send to api backend delete rol for id

  }
}
