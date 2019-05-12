import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
//service auth
import { RolService } from '../../../services/rol.service';

@Component({
  selector: 'app-listrol',
  templateUrl: './listrol.component.html',
  styleUrls: ['./listrol.component.css']
})
export class ListrolComponent implements OnInit {

  //list data ws rol 
  listRol: {};
  
  constructor(private http: Http, private formBuilder: FormBuilder, private rolService: RolService, private router: Router) {
    this.getAllData();
  }

  ngOnInit() {
  }

  //obtain all data from the register rols
  getAllData() {
    //send to search api backend all rols
    this.rolService.getAllDataRols()
      .subscribe(data => {
        //populate list json rol
        //console.log(data.rows[0]);
        this.listRol = data.rows[0];
      });
  }
  //redirect to create rol
  createRol() {
    this.router.navigate(['/createrols'])
  }
  //redirect to update rol
  updateRol(id) {
    //almacenamos el id
    localStorage.setItem('idRol', id);

    console.log(id);
    this.router.navigate(['/updaterols'])
  }
  //delete rol
  deleteRol(id) {
    //send to api backend delete rol for id
    this.rolService.deleteRols(id)
      .subscribe(data => {
        if (data.respuesta == "Success") {
          //redirect 
          location.reload();
        }
      });
  }
}
