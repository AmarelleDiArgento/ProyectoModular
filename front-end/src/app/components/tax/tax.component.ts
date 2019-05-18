import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
// service
import { TaxService } from '../../services/tax.service';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.css']
})
export class TaxComponent implements OnInit {

// vars msj
msgerr: string = '';
// var submitted
submitted = false;
// var form
registerTaxForm: FormGroup;
// list data
listTax: {};

constructor(private http: Http, private formBuilder: FormBuilder,
  private taxService: TaxService, private router: Router) { }

ngOnInit() {
  // init form
  this.registerTaxForm = this.formBuilder.group({
    name: ['', Validators.required],
    percent: ['', Validators.required],
  });
}
// get form controls
get f() { return this.registerTaxForm.controls; }
// submit form
onSubmit() {
  this.submitted = true;
  // error here if form is invalid
  if (this.registerTaxForm.invalid) {
    return;
  } else {
    // send to api backend create tax
    this.taxService.createTax(this.registerTaxForm.value.name, this.registerTaxForm.value.percent)
      .subscribe(data => {
        if (data.respuesta === 'Success') {
          // redirect
          this.router.navigate(['/listtaxs'])
        } else {
          this.msgerr = 'Error al crear el impuesto';
        }
      });
  }
}
// clear alert err
closeAlertErr(): void {
  this.msgerr = '';
}
}

