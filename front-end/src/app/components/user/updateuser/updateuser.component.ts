import { Component, OnInit, EventEmitter } from '@angular/core';
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
  rol_id = '';
  status = '';
  pod_id = [];
  count = {};

  model: string;
  modelChange = new EventEmitter();

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

    this.getAllDataRol();

    this.getAllPodUser();

    this.getAllPod();



    // eject ws search user for id
    this.getUserDataId();
    // console.log('Cargamos el formulario o_o');
    // init form
    this.updateUserForm = this.formBuilder.group({
      user_id: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
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
    this.submitted = true;
    let pods = JSON.stringify(this.updateUserForm.value.pod_id);
    pods = pods.substring(1, pods.length - 1);
    
    // error here if form is invalid
    if (this.updateUserForm.invalid) {
      return;
    } else {
      this.userService.updateUsers(
        this.idUser,
        this.updateUserForm.value.user_id,
        this.updateUserForm.value.username,
        this.updateUserForm.value.email,
        this.updateUserForm.value.rol_id,
        this.updateUserForm.value.status,
        
      )
        .subscribe(data => {
          if (data.respuesta == 'Success') {
            //update en pod users
              //update pod users
            
              this.userService.updateUsersPod(this.updateUserForm.value.user_id, this.updateUserForm.value.pod_id)
                .subscribe(dataPod => {
                  if (dataPod.respuesta == 'Success') {
                    this.router.navigate(['/listusers']);
                  } else {
                    this.msgerr = 'error al actualizar el usuario-lugar';
                  }
                })
            //else user
          } else {
            this.msgerr = 'error al actualizar el usuario';
          }
        })
    }
  }
  // obtain data user for id
  getUserDataId() {
    this.userService.getDataUserForId(this.idUser)
      .subscribe(data => {
        if (data != null) {
          // add values to the form
          console.log(data.rows[0]);
          
          this.updateUserForm.patchValue({
            user_id: data.rows[0].user_id,
            username: data.rows[0].username,
            email: data.rows[0].email,
            status: data.rows[0].status,
            rol_id: data.rows[0].rol_id,
          })
        }
      });
  }

  getAllPod() {
    this.podService.getAllDataPod()
      .subscribe(data => {
        // populate list json module
        this.listPod = data.rows;
        console.log(this.listPod);
        
        //init validation checks
        $(function () {
          $('select').formSelect();
        });
        //vars
        var i = 0;
        var a = 0;
        //list checked
        var list = this.listPodCheck;
        $('#rol_id').ready(function () {
          for (i = 0; i < Object.keys(data.rows).length; i++) {
            //search name in select and add prop selected
            if (list[i] !== undefined) {
              var search = list[i].name;
              $('#pod_id option:contains(' + search + ')').prop('selected', true);
            }
          }
          $('#pod_id').formSelect();
        });
      });
  }

  getAllPodUser() {
    console.log(this.idUser);
    
    this.userService.getDataPodUserId(this.idUser)
      .subscribe(data => {
        // populate list json module
        this.listPodCheck = data.rows;
      });
  }

  getAllDataRol() {
    this.rolService.getAllDataRol()
      .subscribe(data => {
        // populate list json module
        this.listRol = data.rows;

      });
  }

}
