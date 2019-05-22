import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
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

  constructor(private http: Http, private formBuilder: FormBuilder,
    private userService: UserService,
    private podService: PodService,
    private rolService: RolService,  private router: Router) { }

  ngOnInit() {

    // obtain all data from the register pods
    this.getAllDataPodandRol();
    // init form
    this.registerUsersForm = this.formBuilder.group({
      user_id: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      rol: ['', Validators.required],
      pod_id: ['', Validators.required],
      estado: ['', Validators.required]
    });
  }
  getAllDataPodandRol() {

    // send to search api backend all pods
    this.podService.getAllDataPod()
      .subscribe(data => {
        // populate list json pod
        this.listPod = data.rows;
        console.log(data.rows);

      });
      // send to search api backend all rols
      this.rolService.getAllDataRols()
        .subscribe(data => {
          // populate list json rol
          this.listRol = data.rows;
        });

    $(document).ready(function () {
      $('select').formSelect();
    });
  }
  // get form controls
  get f() { return this.registerUsersForm.controls; }

  // submit form
  onSubmit() {
    this.submitted = true;
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
        this.registerUsersForm.value.rol,
        this.registerUsersForm.value.estado)
        .subscribe(data => {
          if (data.respuesta === 'Success') {
            // redirect to home menu
            this.router.navigate(['/listusers']);
          } else {
            this.msgerr = 'Error al crear el usuario';
          }
        });
    }
  }
  // clear alert err
  closeAlertErr(): void {
    this.msgerr = '';
  }
}
