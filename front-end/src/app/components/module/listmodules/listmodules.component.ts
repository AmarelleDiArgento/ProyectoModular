import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
// service auth
import { ModuleService } from '../../../services/module.service';

@Component({
  selector: 'app-listmodules',
  templateUrl: './listmodules.component.html',
  styleUrls: ['./listmodules.component.css']
})
export class ListmodulesComponent implements OnInit {

  // list data ws module 
  listModule: {};

  constructor(private http: Http, private formBuilder: FormBuilder, private moduleService: ModuleService, private router: Router) {
    this.getAllData();
  }

  ngOnInit() {
  }

  // obtain all data from the register modules
  getAllData() {
    // send to search api backend all modules
    this.moduleService.getAllDataModules()
      .subscribe(data => {
        // populate list json module
        this.listModule = data.rows;
      });
  }
  // redirect to create module
  createModule() {
    this.router.navigate(['/createmodules'])
  }
  // redirect to update module
  updateModule(id) {
    // almacenamos el id
    localStorage.setItem('idModule', id);
    this.router.navigate(['/updatemodules'])
  }
  
  // delete module
  deleteModule(id) {


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
        this.moduleService.deleteModules(id)
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
    })

    // send to api backend delete module for id

  }
}
