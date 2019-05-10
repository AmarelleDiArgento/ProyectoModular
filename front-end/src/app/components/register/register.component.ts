import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
//service auth
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //vars msj
  msgerr: string = '';
  //var submitted
  submitted = false;
  //var form
  registerUsersForm: FormGroup;
  //list data auth 
  listUser: {};

  constructor(private http: Http, private formBuilder: FormBuilder, 
    private userService: UserService, private router: Router) { }

  ngOnInit() {
    //init form
    this.registerUsersForm = this.formBuilder.group({
      user_id: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      rol: ['', Validators.required],
      estado: ['', Validators.required]
    });
  }
  //get form controls
  get f() { return this.registerUsersForm.controls; }

  //submit form
  onSubmit() {
    this.submitted = true;
    // error here if form is invalid
    if (this.registerUsersForm.invalid) {
      return;
    } else {
      //send to api backend create user
      this.userService.createUsers(this.registerUsersForm.value.user_id, this.registerUsersForm.value.username, this.registerUsersForm.value.email, this.registerUsersForm.value.password, this.registerUsersForm.value.rol, this.registerUsersForm.value.estado)
        .subscribe(data => {
          if (data.respuesta == "Success") {
            //redirect to home menu
            this.router.navigate(['/listusers'])
          } else {
            this.msgerr = "Error al crear el usuario";
          }
        });
    }
  }
  //clear alert err
  closeAlertErr(): void {
    this.msgerr = '';
  }
}
