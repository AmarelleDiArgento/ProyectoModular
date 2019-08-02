import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;

// service auth
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private http: Http,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  // rol user
  idSesionRol = '';
  // id user
  idSesionUser = '';
  // list data auth menu
  listMenuAuth: {};

  cont = 0;

  ngOnInit() {
    // asign rol user to search data from menu
    this.idSesionRol = localStorage.getItem('idSesionRol');
    this.getUserValidateMenuRol();
  }
  
  contador() {
    this.cont++;
  }

  // obtain data validate menu
  getUserValidateMenuRol() {
    // send to ws api mysql search data for rol user
    this.authService.menu(this.idSesionRol)
      .subscribe(data => {
        if (data != null) {
          // send json response to list
          this.listMenuAuth = data.rows;
        }
      });
  }

}
