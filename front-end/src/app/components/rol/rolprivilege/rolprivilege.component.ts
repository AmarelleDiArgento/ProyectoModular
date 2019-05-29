import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
declare var $: any;
// service rol privilege
import { RolprivilegeService } from '../../../services/rolprivilege.service';
//service rol
import { RolService } from '../../../services/rol.service';
// service privilege
import { PrivilegeService } from '../../../services/privilege.service';

@Component({
  selector: 'app-rolprivilege',
  templateUrl: './rolprivilege.component.html',
  styleUrls: ['./rolprivilege.component.css']
})
export class RolprivilegeComponent implements OnInit {

  // list data ws rol 
  listRol: {};
  // list data ws privilege
  listPrivileges: {};
  //init rol
  idRol = '';
  idRolPrivilege = '';
  // vars msj
  msgerr: string = '';
  // var submitted
  submitted = false;
  // var form
  registerRolsPrivilegeForm: FormGroup;
  //vars checks init in 0 = inactive
  viewCheck = 0;
  createCheck = 0;
  updateCheck = 0;
  deleteCheck = 0;

  constructor(private http: Http, private formBuilder: FormBuilder, private privilegeService: PrivilegeService, private rolService: RolService, private rolprivilegeService: RolprivilegeService, private router: Router) {
  }

  ngOnInit() {
    $(document).ready(function () {
      $('select').formSelect();
    });
    // init form
    this.registerRolsPrivilegeForm = this.formBuilder.group({
      privilege_id: ['', Validators.required],
      view: ['0', Validators.required],
      create: ['0', Validators.required],
      update: ['0', Validators.required],
      delete: ['0', Validators.required]
    });
    //asign rol variable
    this.idRolPrivilege = localStorage.getItem('idRolPrivilege');
    console.log(this.idRolPrivilege);
    //list privilege
    this.getAllDataPrivilege();
  }

  // get form controls
  get f() { return this.registerRolsPrivilegeForm.controls; }

  // obtain all data from the register rols
  getAllDataRol() {
    // send to search api backend all rols
    this.rolService.getAllDataRols()
      .subscribe(data => {
        // populate list json rol
        this.listRol = data.rows;
        console.log(this.listRol);
      });
  }
  // obtain all data from the register privileges
  getAllDataPrivilege() {
    // send to search api backend all privileges
    this.privilegeService.getAllDataprivileges()
      .subscribe(data => {
        // populate list json privilege
        this.listPrivileges = data.rows;
        console.log(this.listPrivileges);
      });
  }

  // submit form
  onSubmit() {
    this.submitted = true;
    // error here if form is invalid
    if (this.registerRolsPrivilegeForm.invalid) {
      return;
    } else {
      //validation checks if true asign 1 default 0
      if (this.registerRolsPrivilegeForm.value.view === true) {
        this.viewCheck = 1;
      }
      if (this.registerRolsPrivilegeForm.value.create === true) {
        this.createCheck = 1;
      }
      if (this.registerRolsPrivilegeForm.value.update === true) {
        this.updateCheck = 1;
      }
      if (this.registerRolsPrivilegeForm.value.delete === true) {
        this.deleteCheck = 1;
      }
      // send to api backend create rol privilege
      this.rolprivilegeService.createRolPrivilege(this.registerRolsPrivilegeForm.value.privilege_id,this.idRolPrivilege,this.viewCheck,this.createCheck,this.updateCheck,this.deleteCheck)
        .subscribe(data => {
          if (data.respuesta === 'Success') {
            Swal.fire({
              type: 'success',
              title: 'Registro exitoso',
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 2000
            });
            // redirect to home menu
            this.router.navigate(['/listrolprivileges'])
          } else {
            Swal.fire({
              type: 'error',
              title: 'Ups!, algo salio mal: \n' + data.respuesta,
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 2000
            });
            this.msgerr = 'Error al crear el privilegio del rol';
          }
        });
    }
  }


}

