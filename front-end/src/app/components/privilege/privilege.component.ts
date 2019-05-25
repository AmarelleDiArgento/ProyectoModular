import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
declare var $: any;
// service auth
import { PrivilegeService } from '../../services/privilege.service';
// service auth
import { ModuleService } from '../../services/module.service';

@Component({
  selector: 'app-privilege',
  templateUrl: './privilege.component.html',
  styleUrls: ['./privilege.component.css']
})
export class PrivilegeComponent implements OnInit {

  // vars msj
  msgerr: string = '';
  // var submitted
  submitted = false;
  // var form
  registerPrivilegesForm: FormGroup;
  selectModule: FormGroup;
  // list data auth
  listPrivilege: {};
  listModule: {};

  constructor(private http: Http, private formBuilder: FormBuilder,
    private privilegeService: PrivilegeService, private moduleService: ModuleService, private router: Router) { }

  ngOnInit() {
    // init form
    console.log('entre');

    this.registerPrivilegesForm = this.formBuilder.group({
      name: ['', Validators.required],
      module_id: ['', Validators.required],
      icon: ['', Validators.required],
      route: ['', Validators.required],
      status: ['', Validators.required],
    });

    this.moduleService.getAllDataModules()
      .subscribe(data => {
        // populate list json module
        this.listModule = data.rows;
        console.log(this.listModule);

      });


    $(document).ready(function () {
      $('select').formSelect();
    });
  }
  // get form controls
  get f() { return this.registerPrivilegesForm.controls; }

  // submit form
  onSubmit() {
    this.submitted = true;
    // error here if form is invalid
    if (this.registerPrivilegesForm.invalid) {
      return;
    } else {
      // send to api backend create user
      this.privilegeService.createprivileges(
        this.registerPrivilegesForm.value.name,
        this.registerPrivilegesForm.value.module_id,
        this.registerPrivilegesForm.value.icon,
        this.registerPrivilegesForm.value.route,
        this.registerPrivilegesForm.value.status
      ).subscribe(data => {

        if (data.respuesta === 'Success') {
          Swal.fire({
            type: 'success',
            title: 'Registro exitoso',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000
          });
          // redirect to home menu
          this.router.navigate(['/listprivileges']);
        } else {
          Swal.fire({
            type: 'error',
            title: 'Ups!, algo salio mal: \n' + data.respuesta,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000
          });
          this.msgerr = 'Error al crear el provilegio \n' + data.respuesta;
        }
      });
    }



  }
}
