import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
declare var $: any;
// service user
import { UserService } from '../../services/user.service';
// service rol
import { RolService } from '../../services/rol.service';
// service pod
import { PodService } from '../../services/pod.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  // vars msj
  msgerr: string = '';
  // var submitted
  submitted = false;
  // var form
  registerUserForm: FormGroup;
  selectModule: FormGroup;
  // list data auth
  listUser: {};
  listRol: {};
  listPod: {};

  constructor(
    private http: Http,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private rolService: RolService,
    private podService: PodService,
    private router: Router) { }

  ngOnInit() {
    $(document).ready(function () {
      $('select').formSelect();
    });

    this.registerUserForm = this.formBuilder.group({
      user_id: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      rol_id: ['', Validators.required],
      pod_id: ['', Validators.required],
      status: ['', Validators.required]
    });

    // init select pod
    this.getAllDataPod();
    // init select rol
    this.getAllDataRol();

  }
  // get form controls
  get f() { return this.registerUserForm.controls; }

  // submit form
  onSubmit() {
    this.submitted = true;
    // error here if form is invalid
    if (this.registerUserForm.invalid) {
      return;
    } else {
      // send to api backend create user
      this.userService.createUsers(
        this.registerUserForm.value.user_id,
        this.registerUserForm.value.username,
        this.registerUserForm.value.email,
        this.registerUserForm.value.password,
        this.registerUserForm.value.rol_id,
        this.registerUserForm.value.status
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
          this.router.navigate(['/listuser']);
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

    // obtain all data from the pod
    getAllDataPod() {
      // send to search api backend all pod
      this.podService.getAllDataPod()
        .subscribe(data => {
          // populate list json
          this.listPod = data.rows;
          console.log(this.listPod);
        });
    }
    // obtain all data from the rol
    getAllDataRol() {
      // send to search api backend all rol
      this.rolService.getAllDataRol()
        .subscribe(data => {
          // populate list json
          console.log(data);
          this.listRol = data.rows;
        });
    }
}
