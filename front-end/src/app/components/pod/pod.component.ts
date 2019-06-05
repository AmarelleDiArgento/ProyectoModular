import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
declare var $: any;
// service auth
import { PodService } from '../../services/pod.service';

@Component({
  selector: 'app-pod',
  templateUrl: './pod.component.html',
  styleUrls: ['./pod.component.css']
})
export class PodComponent implements OnInit {

  // vars msj
  msgerr: string = '';
  // var submitted
  submitted = false;
  // var form
  registerPodsForm: FormGroup;
  // list data auth
  listPod: {};

  constructor(private http: Http, private formBuilder: FormBuilder,
    private podService: PodService, private router: Router) { }

  ngOnInit() {
    // init form
    this.registerPodsForm = this.formBuilder.group({
      code: ['', Validators.required],
      nit: ['', Validators.required],
      rdian: ['', Validators.required],
      daterdian: ['', Validators.required],
      billing_limit: ['', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      status: ['', Validators.required]
    });

    $('.datepicker').datepicker();
  }
  // get form contpods
  get f() { return this.registerPodsForm.controls; }

  // submit form
  onSubmit() {
    this.submitted = true;
    // error here if form is invalid
    if (this.registerPodsForm.invalid) {
      return;
    } else {
      // send to api backend create user
      this.podService.createPod(
        this.registerPodsForm.value.code,
        this.registerPodsForm.value.nit,
        this.registerPodsForm.value.rdian,
        this.registerPodsForm.value.daterdian,
        this.registerPodsForm.value.billing_limit,
        this.registerPodsForm.value.name,
        this.registerPodsForm.value.address,
        this.registerPodsForm.value.phone,
        this.registerPodsForm.value.status
      )
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
            this.router.navigate(['/listpods']);
          } else {
            Swal.fire({
              type: 'error',
              title: 'Ups!, algo salio mal: \n' + data.respuesta,
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 2000
            });
            this.msgerr = 'Error al crear el pod';
          }
        });
    }

  }
}
