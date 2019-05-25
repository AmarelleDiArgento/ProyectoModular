import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;

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
  //id user
  idSesionUser = '';
  //list data auth menu
  listMenuAuth: {};

  constructor(private http: Http, private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    $(document).ready(function () {
      $(".dropdown-trigger").dropdown();
      $('.slider').slider({
        indicators: false
      });
    });
    //asign rol user to search data from menu
    this.idSesionRol = localStorage.getItem('idSesionRol');
    //init service validation menu
    this.getUserValidateMenuRol();
    //validate session
    this.validateSession();
  }

  //obtain data validate menu
  getUserValidateMenuRol() {
    //send to ws api mysql search data for rol user
    this.authService.menu(this.idSesionRol)
      .subscribe(data => {
        if (data != null) {
          //send json response to list
          this.listMenuAuth = data.rows;
        }
      });
  }
  //validate session user
  validateSession() {
    //asign rol user to search data from menu
    this.idSesionRol = localStorage.getItem('idSesionRol');
    //asign rol user to search data from menu
    this.idSesionUser = localStorage.getItem('idSesionUser');
    if (this.idSesionRol == null || this.idSesionUser == null) {
      this.router.navigate(['/'])
    }
  }
  //close user session
  closeSession() {
    //remove items
    localStorage.removeItem('idSesionRol');
    localStorage.removeItem('idSesionUser');
    localStorage.removeItem('idCategory');
    localStorage.removeItem('idModule');
    localStorage.removeItem('idPod');
    localStorage.removeItem('idPrivilege');
    localStorage.removeItem('idProduct');
    localStorage.removeItem('idRol');
    localStorage.removeItem('idSale');
    localStorage.removeItem('idTax');
    //redirect to login
    this.router.navigate(['/'])
  }

}
