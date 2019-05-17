import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
// service auth
import { PrivilegeService } from '../../../services/privilege.service';
// service auth
import { ModuleService } from '../../../services/module.service';

@Component({
  selector: 'app-updateprivilege',
  templateUrl: './updateprivilege.component.html',
  styleUrls: ['./updateprivilege.component.css']
})
export class UpdateprivilegeComponent implements OnInit {

  // vars msj
  msgerr: string = '';
  // var submitted
  submitted = false;
  // var form
  updatePrivilegeForm: FormGroup;
  // list data auth 
  listPrivilege: {};
  // id user
  idPrivilege = '';
  // rows vacio
  rows = [];
  // vars form update user

  listModule: {};

  privilege_id = '';
  name = '';
  module_id = '';
  icon = '';
  route = '';
  status = '';

  constructor(private http: Http, private formBuilder: FormBuilder, private privilegeService: PrivilegeService,
    private moduleService: ModuleService, private router: Router) { }

  ngOnInit() {
    // init form
    this.updatePrivilegeForm = this.formBuilder.group({
      privilege_id: ['', Validators.required],
      name: ['', Validators.required],
      module_id: ['', Validators.required],
      icon: ['', Validators.required],
      route: ['', Validators.required],
      status: ['', Validators.required],
    });

    this.moduleService.getAllDataModules()
      .subscribe(data => {
        // populate list json module
        this.listModule = data.rows;
        //console.log(this.listModule);

      });
    // asign id privilege to search data
    //console.log(localStorage);
    
    this.idPrivilege = localStorage.getItem('idPrivilege');
    // eject ws search user for id
    this.getPrivilegeDataId();
    // console.log('Cargamos el formulario o_o');
  }
  // get form contprivileges
  get f() {
    // console.log('Llegue a la lectura el formulario');
    return this.updatePrivilegeForm.controls;
  }

  onSubmit() {
    // console.log('Llegue al metodo');

    this.submitted = true;
    // error here if form is invalid
    if (this.updatePrivilegeForm.invalid) {
      return;
    } else {
      this.privilegeService.updateprivileges(
        this.updatePrivilegeForm.value.privilege_id,
        this.updatePrivilegeForm.value.name,
        this.updatePrivilegeForm.value.module_id,
        this.updatePrivilegeForm.value.icon,
        this.updatePrivilegeForm.value.route,
        this.updatePrivilegeForm.value.status
        )
        .subscribe(data => {
          // tslint:disable-next-line: triple-equals
          if (data.respuesta == 'Success') {
            this.router.navigate(['/listprivileges']);
          } else {
            this.msgerr = 'error al actualizar privilege';
          }
        })
    }

  }
  // obtain data privilege for id
  getPrivilegeDataId() {
    this.privilegeService.getDataprivilegesForId(this.idPrivilege)
      .subscribe(data => {
        if (data != null) {
          // add values to the form
          this.updatePrivilegeForm.get('privilege_id').setValue(data.rows[0].privilege_id);
          this.updatePrivilegeForm.get('name').setValue(data.rows[0].name);
          this.updatePrivilegeForm.get('module_id').setValue(data.rows[0].module_id);
          this.updatePrivilegeForm.get('icon').setValue(data.rows[0].icon);
          this.updatePrivilegeForm.get('route').setValue(data.rows[0].route);
          this.updatePrivilegeForm.get('status').setValue(data.rows[0].status);
          console.log(this.updatePrivilegeForm.get('status').value);
        }
      });
  }
  // clear alert err
  closeAlertErr(): void {
    this.msgerr = '';
  }
}
