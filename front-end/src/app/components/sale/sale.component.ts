import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
// service auth
import { SaleService } from '../../services/sale.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

  // vars msj
  msgerr: string = '';
  // var submitted
  submitted = false;
  // var form
  registerSalesForm: FormGroup;
  // list data auth
  listSale: {};

  constructor(private http: Http, private formBuilder: FormBuilder,
    private saleService: SaleService, private router: Router) { }

  ngOnInit() {
    // init form
    this.registerSalesForm = this.formBuilder.group({
      date: ['', Validators.required],
      pod_id: ['', Validators.required],
      user_id: ['', Validators.required],
      client_id: ['', Validators.required],
    });
  }
  // get form contsales
  get f() { return this.registerSalesForm.controls; }

  // submit form
  onSubmit() {
    this.submitted = true;
    console.log('clic');

    // error here if form is invalid
    if (this.registerSalesForm.invalid) {
      return;
    } else {
      // send to api backend create user
      this.saleService.createSale(
        this.registerSalesForm.value.date,
        this.registerSalesForm.value.pod_id,
        this.registerSalesForm.value.user_id,
        this.registerSalesForm.value.client_id,
      )
        .subscribe(data => {
          if (data.respuesta === 'Success') {
            // redirect to home menu
            this.router.navigate(['/listsales'])
          } else {
            this.msgerr = 'Error al crear el sale';
          }
        });
    }

  }
}
