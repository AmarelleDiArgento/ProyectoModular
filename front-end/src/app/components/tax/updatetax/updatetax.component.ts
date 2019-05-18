import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
// service
import { TaxService } from '../../../services/tax.service';

@Component({
  selector: 'app-updatetax',
  templateUrl: './updatetax.component.html',
  styleUrls: ['./updatetax.component.css']
})
export class UpdatetaxComponent implements OnInit {

 // vars msj
 msgerr = '';
 // var submitted
 submitted = false;
 // var form
 updateTaxForm: FormGroup;
 // list data
 listTax: {};
 // id
 idTax = '';
 // rows empty
 rows = [];
 // vars form update
 name = '';
 percent = '';

 constructor(private http: Http, private formBuilder: FormBuilder, private taxService: TaxService, private router: Router) { }


 ngOnInit() {
   // init form
   this.updateTaxForm = this.formBuilder.group({
     name: ['', Validators.required],
     percent: ['', Validators.required]
   });
   // asign id tax to search data
   this.idTax = localStorage.getItem('idTax');
   // eject ws search tax for id
   this.getTaxDataId();
 }
 // get form controls
 get f() { return this.updateTaxForm.controls; }
 onSubmit() {
   this.submitted = true;
   // error here if form is invalid
   if (this.updateTaxForm.invalid) {
     return;
   } else {
     this.taxService.updateTax(this.idTax, this.updateTaxForm.value.name, this.updateTaxForm.value.percent)
       .subscribe(data => {
         if (data.respuesta === 'Success') {
           this.router.navigate(['/listtaxs']);
         } else {
           this.msgerr = 'error al actualizar el impuesto';
         }
       });
   }
 }
 // obtain data tax for id
 getTaxDataId() {
   this.taxService.getDataTaxForId(this.idTax)
     .subscribe(data => {
       if (data != null) {
         // add values to the form
         this.updateTaxForm.get('name').setValue(data.rows[0].name);
         this.updateTaxForm.get('percent').setValue(data.rows[0].percent);
       }
     });
 }
 // clear alert err
 closeAlertErr(): void {
   this.msgerr = '';
 }
}

