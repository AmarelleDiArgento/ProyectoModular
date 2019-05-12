import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
//service auth
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-updateusers',
  templateUrl: './updateusers.component.html',
  styleUrls: ['./updateusers.component.css']
})
export class UpdateusersComponent implements OnInit {

  //vars msj
  msgerr: string = '';
  //var submitted
  submitted = false;
  //var form
  updateUsersForm: FormGroup;
  //list data auth 
  listUser: {};
  //id user
  idUser = '';
  //rows vacio
  rows = [];
  //vars form update user
  user_id = '';
  username = '';
  email = '';
  password = '';
  rol = '';
  estado = '';

  constructor(private http: Http, private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    //init form
    this.updateUsersForm = this.formBuilder.group({
      user_id: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      rol: ['', Validators.required],
      estado: ['', Validators.required]
    });
    //asign id user to search data
    this.idUser = localStorage.getItem('idSesionUser');
    //eject ws search user for id
    this.getUserDataId();
  }
  //get form controls
  get f() { return this.updateUsersForm.controls; }
  //submit form
  onSubmit() {
    this.submitted = true;
    // error here if form is invalid
    if (this.updateUsersForm.invalid) {
      return;
    } else {
      //send to api backend update user
      this.userService.updateUsers(this.updateUsersForm.value.user_id, this.updateUsersForm.value.username, this.updateUsersForm.value.email, this.updateUsersForm.value.password, this.updateUsersForm.value.rol, this.updateUsersForm.value.estado)
        .subscribe(data => {
          if (data.respuesta == "Success") {
            //redirect to home menu
            this.router.navigate(['/listusers'])
          } else {
            this.msgerr = "Error al actualizar el usuario";
          }
        });
    }
  }
  //obtain data user for id
  getUserDataId() {
    //send to ws api mysql search data user for id
    this.userService.getDataUsersForId(this.idUser)
      .subscribe(data => {
        if (data != null) {
          //add values to the form
          this.updateUsersForm.get('user_id').setValue(data.rows[0].user_id);
          this.updateUsersForm.get('username').setValue(data.rows[0].username);
          this.updateUsersForm.get('email').setValue(data.rows[0].email);
        }
      });
  }
  //clear alert err
  closeAlertErr(): void {
    this.msgerr = '';
  }
}
