import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
declare var $: any;
// service user
import { UserService } from '../../services/user.service';
import { on } from 'cluster';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // vars msj
  msgerr: string = '';
  // var submitted
  submitted = false;
  // var form
  profileForm: FormGroup;
  passwordchangeForm: FormGroup;
  // list data rol 
  listRol: {};
  // list data pod 
  listPod: {};
  // list data user 
  listUser: {};
  // id rol
  idRol = '';
  // id rol
  idPod = '';
  listPodCheck = [];
  // id rol
  idUser = '';
  // rows vacio
  rows = [];
  // vars form update user
  user_id = '';
  username = '';
  email = '';
  rol_name = '';
  password_old = '';
  password_new = '';
  password_confirm = '';


  viewPasswordChange: boolean = false;

  model: string;
  modelChange = new EventEmitter();

  constructor(
    private http: Http,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    $(document).ready(function () {
      $('select').formSelect();
    });
    // asign id rol to search data
    this.idUser = localStorage.getItem('idSesionUser');




    // eject ws search user for id
    this.getUserDataId();
    // console.log('Cargamos el formulario o_o');
    // init form
    this.profileForm = this.formBuilder.group({
      user_id: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      rol_name: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.passwordchangeForm = this.formBuilder.group({

      password_old: ['', Validators.required],
      password_new: ['', Validators.required],
      password_confirm: ['', Validators.required],

    });
  }

  // get form controls
  get f() {
    return this.profileForm.controls;
  }

  // get form controls
  get p() {
    return this.passwordchangeForm.controls;
  }

  // obtain data user for id
  getUserDataId() {
    this.userService.getDataUserForId(this.idUser)
      .subscribe(data => {
        if (data != null) {
          // add values to the form
          console.log(data);
          this.profileForm.patchValue({
            user_id: data.rows[0].user_id,
            username: data.rows[0].username,
            email: data.rows[0].email,
            rol_name: data.rows[0].rol_name
          })
        }
      });
  }

  closeAlertErr() {
    this.msgerr = '';
  }

  onPassword() {
    this.viewPasswordChange = !this.viewPasswordChange;
  }
  onSubmit() {    // console.log('Llegue al metodo');

    this.submitted = true;
    // error here if form is invalid
    if (!this.passwordchangeForm.invalid) {
      if (this.passwordchangeForm.value.password_new === this.passwordchangeForm.value.password_confirm) {
        this.userService.updateUserPassword(
          this.idUser,
          this.passwordchangeForm.value.password_old,
          this.passwordchangeForm.value.password_new,
        ).subscribe(data => {
          console.log(data);

          if (data.respuesta === 'Success') {
            Swal.fire({
              type: 'success',
              title: 'Contraseña actualizada! ',
              showConfirmButton: false,
              timer: 2000
            });
            this.msgerr = '';
            this.ngOnInit;
          } else if (data.respuesta === 'without results') {
            Swal.fire({
              type: 'error',
              title: 'Ups!, informacion invalida',
              showConfirmButton: false,
              timer: 2000
            });
            this.msgerr = 'Informacion invalida';

          } else {
            Swal.fire({
              type: 'error',
              title: 'Ups!, algo salio mal',
              showConfirmButton: false,
              timer: 2000
            });
            this.msgerr = 'error al actualizar password';
          }

        })

      } else {
        Swal.fire({
          type: 'error',
          title: 'Ups!, el nuevo password no coincide',
          showConfirmButton: false,
          timer: 2000
        });
        this.msgerr = 'Nuevo password no coincide';
      }
    } else {

      return;

    }
  }
  closeAlertErrPass() {
    this.msgerr = '';
  }
}