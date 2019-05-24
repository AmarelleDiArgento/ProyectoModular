import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

declare var $: any;

// service auth
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-listusers',
  templateUrl: './listusers.component.html',
  styleUrls: ['./listusers.component.css']
})
export class ListusersComponent implements OnInit {

  // list data ws user
  listUser: {};

  constructor(private http: Http, private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.getAllData();
  }

  ngOnInit() {
  }

  // obtain all data from the register users
  getAllData() {
    // send to search api backend all users
    this.userService.getAllDataUsers()
      .subscribe(data => {
        // populate list json users
        // console.log(data);
        this.listUser = data.rows;
      });


  }
  // redirect to create user
  createUser() {
    this.router.navigate(['/createuser']);
  }
  // redirect to update user
  updateUser(id) {
    // almacenamos el id
    localStorage.setItem('idUser', id);
    this.router.navigate(['/updateuser']);
  }
  // delete user
  deleteUser(id) {
    // send to api backend delete user for id
    localStorage.Id;
    this.userService.deleteUsers(id)
      .subscribe(data => {
        if (data.respuesta === 'Success') {
          // redirect
          location.reload();
        }
      });
  }
}
