import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
declare var $: any;
// service auth
import { UserService } from '../../services/user.service';
import { PodService } from '../../services/pod.service';
import { RolService } from '../../services/rol.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // vars msj
  msgerr: string = '';
  // var submitted
  submitted = false;
  // var form
  registerUsersForm: FormGroup;
  // list data auth 
  listUser: {};
  // list pod user 
  listPod: {};
  // list rol 
  listRol: {};

  constructor(private http: Http, 
    private formBuilder: FormBuilder,
    private userService: UserService,
    private podService: PodService,
    private rolService: RolService, 
    private router: Router) { }

  ngOnInit() {
    $(document).ready(function () {
      $('select').formSelect();
    });
    // get data rol
    this.getAllDataRol();
    //get data pod
    this.getAllDataPod();
    // init form
    this.registerUsersForm = this.formBuilder.group({
      user_id: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      rol_id: ['', Validators.required],
      pod_id: ['', Validators.required],
      status: ['', Validators.required]
    });

  }
  
  // get form controls
  get f() { return this.registerUsersForm.controls; }

  // submit form
  onSubmit() {
    this.submitted = true;
    let ErrorP: string = '';
    // error here if form is invalid
    if (this.registerUsersForm.invalid) {
      return;
    } else {
      // send to api backend create user
      this.userService.createUsers(
        this.registerUsersForm.value.user_id,
        this.registerUsersForm.value.username,
        this.registerUsersForm.value.email,
        this.registerUsersForm.value.password,
        this.registerUsersForm.value.rol_id,
        this.registerUsersForm.value.status)
        .subscribe(dataU => {
          if (dataU.respuesta === 'Success') {
            for (const pod_id of this.registerUsersForm.value.pod_id) {

              this.userService.assignPodUser(
                this.registerUsersForm.value.user_id,
                pod_id
              ).subscribe(dataP => {
                if (dataU.respuesta != 'Success') {
                  ErrorP += dataP.respuesta;
                }
              });
            }
            if (ErrorP === '') {
              Swal.fire({
                type: 'success',
                title: 'Registro exitoso',
                showConfirmButton: false,
                timer: 2000
              });
              // redirect to home menu
              this.router.navigate(['/listusers']);
            } else {
              Swal.fire({
                type: 'error',
                title: 'Ups!, algo salio mal: \n' + ErrorP,
                showConfirmButton: false,
                timer: 2000
              });
              this.msgerr = 'Error al crear el usuario \n' + ErrorP;
            }
          } else {
            Swal.fire({
              type: 'error',
              title: 'Ups!, algo salio mal: \n' + dataU.respuesta.error,
              showConfirmButton: false,
              timer: 2000
            });
            this.msgerr = 'Error al crear el usuario \n' + dataU.respuesta;
          }
        });
    }
  }

  getAllDataRol(){
    // send to search api backend all rols
    this.rolService.getAllDataRol()
      .subscribe(data => {
        // populate list json rol
        console.log(data);
        this.listRol = data.rows;
      });
  }

  getAllDataPod(){
    // send to search api backend all pods
    this.podService.getAllDataPod()
      .subscribe(data => {
        // populate list json pod
        this.listPod = data.rows;

      });
  }

  // clear alert err
  closeAlertErr(): void {
    this.msgerr = '';
  }
}
