import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
// service auth
import { RolService } from '../../../services/rol.service';

@Component({
  selector: 'app-updaterol',
  templateUrl: './updaterol.component.html',
  styleUrls: ['./updaterol.component.css']
})
export class UpdaterolComponent implements OnInit {

  // vars msj
  msgerr: string = '';
  // var submitted
  submitted = false;
  // var form
  updateRolForm: FormGroup;
  // list data auth 
  listRol: {};
  // id user
  idRol = '';
  // rows vacio
  rows = [];
  // vars form update user
  rol_id = '';
  name = '';

  constructor(private http: Http, private formBuilder: FormBuilder, private rolService: RolService, private router: Router) { }

  ngOnInit() {
    // init form
    this.updateRolForm = this.formBuilder.group({
      rol_id: ['', Validators.required],
      name: ['', Validators.required],
    });
    // asign id rol to search data
    this.idRol = localStorage.getItem('idRol');
    // eject ws search user for id
    this.getRolDataId();
    // console.log('Cargamos el formulario o_o');
  }
  // get form controls
  get f() {
    // console.log('Llegue a la lectura el formulario');
    return this.updateRolForm.controls;
  }

  onSubmit() {
    // console.log('Llegue al metodo');

    this.submitted = true;
    // error here if form is invalid
    if (this.updateRolForm.invalid) {
      return;
    } else {
      this.rolService.updateRol(
        this.updateRolForm.value.rol_id,
        this.updateRolForm.value.name
        )
        .subscribe(data => {
          // tslint:disable-next-line: triple-equals
          if (data.respuesta == 'Success') {
            this.router.navigate(['/listrols']);
          } else {
            this.msgerr = 'error al actualizar rol';
          }
        })
    }

  }
  // obtain data rol for id
  getRolDataId() {
    this.rolService.getDataRolForId(this.idRol)
      .subscribe(data => {
        if (data != null) {
          // add values to the form
          console.log(data);

          this.updateRolForm.get('rol_id').setValue(data.rows[0].rol_id);
          this.updateRolForm.get('name').setValue(data.rows[0].name);
        }
      });
  }
  // clear alert err
  closeAlertErr(): void {
    this.msgerr = '';
  }
}
