import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
declare var $: any;
// service auth
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-clientregister',
  templateUrl: './clientregister.component.html',
  styleUrls: ['./clientregister.component.css']
})
export class ClientregisterComponent implements OnInit {

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
  noClient: string = '';

  constructor(private http: Http,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {

    // init form
    this.registerUsersForm = this.formBuilder.group({
      user_id: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required]
    });

    this.registerUsersForm.get('user_id').setValue(localStorage.getItem('noClient'));

    console.log("Registro:" + this.noClient);
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
      this.userService.createClient(
        this.registerUsersForm.value.user_id,
        this.registerUsersForm.value.username,
        this.registerUsersForm.value.email)
        .subscribe(data => {
          if (data.respuesta === 'Success') {
            
            this.modalClose();
            localStorage.setItem('idClient', this.registerUsersForm.value.user_id);

            Swal.fire({
              type: 'success',
              title: 'Registro exitoso',
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 2000
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
            this.msgerr = 'Error al crear el cliente';
          }

        });
    }
  }
  // clear alert err
  closeAlertErr(): void {
    this.msgerr = '';
  }
  modalClose() {
    // this.client_id = localStorage.getItem('idClient');
    $('#ClientRegister').modal('close');
    // this.getClient();
  }
}
