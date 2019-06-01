import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
// service auth
import { ModuleService } from '../../../services/module.service';

@Component({
  selector: 'app-updatemodules',
  templateUrl: './updatemodules.component.html',
  styleUrls: ['./updatemodules.component.css']
})
export class UpdatemodulesComponent implements OnInit {

  // vars msj
  msgerr: string = '';
  // var submitted
  submitted = false;
  // var form
  updateModuleForm: FormGroup;
  // list data auth 
  listModule: {};
  // id user
  idModule = '';
  // rows vacio
  rows = [];
  // vars form update user
  module_id = '';
  name = '';
  status = '';

  constructor(private http: Http, private formBuilder: FormBuilder, private moduleService: ModuleService, private router: Router) { }

  ngOnInit() {
    // init form
    this.updateModuleForm = this.formBuilder.group({
      module_id: ['', Validators.required],
      name: ['', Validators.required],
      status: ['', Validators.required],
    });
    // asign id module to search data
    this.idModule = localStorage.getItem('idModule');
    // eject ws search user for id
    this.getModuleDataId();
    // console.log('Cargamos el formulario o_o');
  }
  // get form contmodules
  get f() {
    // console.log('Llegue a la lectura el formulario');
    return this.updateModuleForm.controls;
  }

  onSubmit() {
    // console.log('Llegue al metodo');

    this.submitted = true;
    // error here if form is invalid
    if (this.updateModuleForm.invalid) {
      return;
    } else {
      this.moduleService.updateModule(
        this.updateModuleForm.value.module_id,
        this.updateModuleForm.value.name,
        this.updateModuleForm.value.status
      )
        .subscribe(data => {
          // tslint:disable-next-line: triple-equals
          if (data.respuesta == 'Success') {
            this.router.navigate(['/listmodules']);
          } else {
            this.msgerr = 'error al actualizar module';
          }
        })
    }

  }
  // obtain data module for id
  getModuleDataId() {
    this.moduleService.getDataModuleForId(this.idModule)
      .subscribe(data => {
        if (data != null) {
          // add values to the form
          this.updateModuleForm.get('module_id').setValue(data.rows[0].module_id);
          this.updateModuleForm.get('name').setValue(data.rows[0].name);
          this.updateModuleForm.get('status').setValue(data.rows[0].status);
        }
      });
  }
  // clear alert err
  closeAlertErr(): void {
    this.msgerr = '';
  }
}
