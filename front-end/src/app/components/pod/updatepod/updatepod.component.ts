import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
// service auth
import { PodService } from '../../../services/pod.service';

@Component({
  selector: 'app-updatepod',
  templateUrl: './updatepod.component.html',
  styleUrls: ['./updatepod.component.css']
})
export class UpdatepodComponent implements OnInit {

  // vars msj
  msgerr: string = '';
  // var submitted
  submitted = false;
  // var form
  updatePodForm: FormGroup;
  // list data auth 
  listPod: {};
  // id user
  idPod = '';
  // rows vacio
  rows = [];
  // vars form update user
  pod_id = '';
  name = '';

  constructor(private http: Http, private formBuilder: FormBuilder, private podService: PodService, private router: Router) { }

  ngOnInit() {
    // init form
    this.updatePodForm = this.formBuilder.group({
      pod_id: ['', Validators.required],
      code: ['', Validators.required],
      costcenter: ['', Validators.required],
      warehouse: ['', Validators.required],
      nit: ['', Validators.required],
      rdian: ['', Validators.required],
      daterdian: ['', Validators.required],
      billing_limit: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      status: ['', Validators.required]
    });
    // asign id pod to search data
    this.idPod = localStorage.getItem('idPod');
    // eject ws search user for id
    this.getPodDataId();
    // console.log('Cargamos el formulario o_o');
  }
  // get form contpods
  get f() {
    // console.log('Llegue a la lectura el formulario');
    return this.updatePodForm.controls;
  }

  onSubmit() {
    // console.log('Llegue al metodo');

    this.submitted = true;
    // error here if form is invalid
    if (this.updatePodForm.invalid) {
      return;
    } else {
      this.podService.updatePod(
        this.updatePodForm.value.pod_id,
        this.updatePodForm.value.code,
        this.updatePodForm.value.nit,
        this.updatePodForm.value.rdian,
        this.updatePodForm.value.daterdian,
        this.updatePodForm.value.billing_limit,
        this.updatePodForm.value.warehouse,
        this.updatePodForm.value.costcenter,
        this.updatePodForm.value.name,
        this.updatePodForm.value.email,
        this.updatePodForm.value.address,
        this.updatePodForm.value.phone,
        this.updatePodForm.value.status
      )
        .subscribe(data => {
          // tslint:disable-next-line: triple-equals
          if (data.respuesta == 'Success') {
            this.router.navigate(['/listpods']);
          } else {
            this.msgerr = 'error al actualizar pod';
          }
        })
    }

  }
  // obtain data pod for id
  getPodDataId() {
    this.podService.getDataPodForId(this.idPod)
      .subscribe(data => {
        if (data != null) {
          // add values to the form
          // console.log(data);

          this.updatePodForm.get('pod_id').setValue(data.rows[0].pod_id);
          this.updatePodForm.get('code').setValue(data.rows[0].code);
          this.updatePodForm.get('nit').setValue(data.rows[0].nit);
          this.updatePodForm.get('rdian').setValue(data.rows[0].rdian);
          this.updatePodForm.get('daterdian').setValue(data.rows[0].daterdian);
          this.updatePodForm.get('billing_limit').setValue(data.rows[0].billing_limit);
          this.updatePodForm.get('warehouse').setValue(data.rows[0].warehouse);
          this.updatePodForm.get('costcenter').setValue(data.rows[0].costcenter);
          this.updatePodForm.get('name').setValue(data.rows[0].name);
          this.updatePodForm.get('email').setValue(data.rows[0].email);
          this.updatePodForm.get('address').setValue(data.rows[0].address);
          this.updatePodForm.get('phone').setValue(data.rows[0].phone);
          this.updatePodForm.get('status').setValue(data.rows[0].status);

        }
      });
  }
  // clear alert err
  closeAlertErr(): void {
    this.msgerr = '';
  }
}
