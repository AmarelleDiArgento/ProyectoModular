import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
//service auth
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  //rol user
  idSesionRol = '';
  //list data auth menu
  listMenuAuth: {};

  constructor(private http: Http, private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    //asign rol user to search data from menu
    this.idSesionRol = localStorage.getItem('idSesionRol');
    //init service validation menu
    this.getUserValidateMenuRol();
  }

  //obtain data validate menu
  getUserValidateMenuRol() {
    //send to ws api mysql search data for rol user
    this.authService.menu(this.idSesionRol)
      .subscribe(data => {
        if (data != null) {
          //send json response to list
          this.listMenuAuth = data.rows;
          console.log(this.listMenuAuth);
        }
      });
  }

}
