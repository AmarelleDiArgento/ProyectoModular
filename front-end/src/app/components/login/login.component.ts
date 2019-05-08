import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
//service auth
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //vars msj
  msgerr: string = '';
  //var submitted
  submitted = false;
  //var form
  loginForm: FormGroup;
  //list data auth 
  listUser: {};

  constructor(private http: Http, private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    //init form
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  //get form controls
  get f() { return this.loginForm.controls; }
  //submit form
  onSubmit() {
    this.submitted = true;
    // error here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      //send to search api backend email and password return msj
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe(data => {
          if (data.respuesta == "Success") {
            //redirect to home menu
            this.router.navigate(['/home'])
          } else {
            this.msgerr = "Error email o contraseña erronea";
          }
        });
    }
  }
  //clear alert err
  closeAlertErr(): void {
    this.msgerr = '';
  }

  //redirection to login
  close() {
    this.router.navigate(["/"]);
  }


}
