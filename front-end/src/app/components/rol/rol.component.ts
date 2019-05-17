import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
// service auth
import { RolService } from '../../services/rol.service';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {

  // vars msj
  msgerr: string = '';
  // var submitted
  submitted = false;
  // var form
  registerRolsForm: FormGroup;
  // list data auth
  listRol: {};

  constructor(private http: Http, private formBuilder: FormBuilder,
    private rolService: RolService, private router: Router) { }

  ngOnInit() {
    // init form
    this.registerRolsForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }
  // get form controls
  get f() { return this.registerRolsForm.controls; }

  // submit form
  onSubmit() {
    this.submitted = true;
    // error here if form is invalid
    if (this.registerRolsForm.invalid) {
      return;
    } else {
      // send to api backend create user
      this.rolService.createRols(this.registerRolsForm.value.name)
        .subscribe(data => {
          if (data.respuesta === 'Success') {
            // redirect to home menu
            this.router.navigate(['/listrols'])
          } else {
            this.msgerr = 'Error al crear el rol';
          }
        });
    }

  }
}
