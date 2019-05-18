import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
// service auth
import { ModuleService } from '../../services/module.service';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent implements OnInit {

  // vars msj
  msgerr: string = '';
  // var submitted
  submitted = false;
  // var form
  registerModulesForm: FormGroup;
  // list data auth
  listModule: {};

  constructor(private http: Http, private formBuilder: FormBuilder,
    private moduleService: ModuleService, private router: Router) { }

  ngOnInit() {
    // init form
    this.registerModulesForm = this.formBuilder.group({
      name: ['', Validators.required],
      status: ['', Validators.required],
    });
  }
  // get form controls
  get f() { return this.registerModulesForm.controls; }

  // submit form
  onSubmit() {
    this.submitted = true;
    // error here if form is invalid
    if (this.registerModulesForm.invalid) {
      return;
    } else {
      // send to api backend create user
      this.moduleService.createModules(
        this.registerModulesForm.value.name,
        this.registerModulesForm.value.status
        )
        .subscribe(data => {
          if (data.respuesta === 'Success') {
            // redirect to home menu
            this.router.navigate(['/listmodules'])
          } else {
            this.msgerr = 'Error al crear el module \n ' + data.respuesta ;
            console.log(data.respuesta);
            
          }
        });
    }

  }
}
