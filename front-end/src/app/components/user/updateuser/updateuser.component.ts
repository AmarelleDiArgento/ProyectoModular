import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
declare var $: any;
// service user
import { UserService } from '../../../services/user.service';
// service rol
import { RolService } from '../../../services/rol.service';
// service pod
import { PodService } from '../../../services/pod.service';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {

  // vars msj
  msgerr: string = '';
  // var submitted
  submitted = false;
  // var form
  updateUserForm: FormGroup;
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
  password = '';
  rol_id = '';
  status = '';
  pod_id = [];

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

    // asign id rol to search data
    this.idUser = localStorage.getItem('idUser');


    this.rolService.getAllDataRol()
      .subscribe(data => {
        // populate list json module
        this.listRol = data.rows;

      });


    // eject ws search user for id
    this.getUserDataId();
    // console.log('Cargamos el formulario o_o');
    // init form
    this.updateUserForm = this.formBuilder.group({
      user_id: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      rol_id: ['', Validators.required],
      pod_id: ['', Validators.required],
      status: ['', Validators.required],
    });




  }
  // get form controls
  get f() {
    return this.updateUserForm.controls;
  }

  onSubmit() {
    // console.log('Llegue al metodo');

    this.submitted = true;
    // error here if form is invalid
    if (this.updateUserForm.invalid) {
      return;
    } else {
      this.userService.updateUsers(
        this.updateUserForm.value.user_id,
        this.updateUserForm.value.username,
        this.updateUserForm.value.email,
        this.updateUserForm.value.password,
        this.updateUserForm.value.rol_id,
        this.updateUserForm.value.status
      )
        .subscribe(data => {
          // tslint:disable-next-line: triple-equals
          if (data.respuesta == 'Success') {
            this.router.navigate(['/listuser']);
          } else {
            this.msgerr = 'error al actualizar rol';
          }
        })
    }

  }
  // obtain data rol for id
  getUserDataId() {
    this.userService.getDataUserForId(this.idUser)
      .subscribe(data => {
        if (data != null) {
          // add values to the form
          console.log(data);

          this.updateUserForm.patchValue({
            user_id: data.rows[0].user_id,
            username: data.rows[0].username,
            email: data.rows[0].email,
            password: data.rows[0].password,
            status: data.rows[0].status,
            rol_id: data.rows[0].rol_id,
          })
        }

        this.podService.getAllDataPod()
          .subscribe(data => {
            // populate list json module
            this.listPod = data.rows;
            console.log(this.listPod);

          });

        this.userService.getDataPodUserId(this.idUser)
          .subscribe(data => {
            // populate list json module
            this.listPodCheck = data.rows;
            console.log(this.listPodCheck);

          });

      });
  }

  

}
