import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
// service auth
import { SaleService } from '../../../services/sale.service';

@Component({
  selector: 'app-updatesale',
  templateUrl: './updatesale.component.html',
  styleUrls: ['./updatesale.component.css']
})
export class UpdatesaleComponent implements OnInit {

  // vars msj
  msgerr: string = '';
  // var submitted
  submitted = false;
  // var form
  updateSaleForm: FormGroup;
  // list data auth 
  listSale: {};
  // id user
  idSale = '';
  // rows vacio
  rows = [];
  // vars form update user
  sale_id = '';
  name = '';

  viewInactiveChange: boolean = false;

  constructor(private http: Http, private formBuilder: FormBuilder, private saleService: SaleService, private router: Router) { }

  ngOnInit() {
    localStorage.setItem('printOn', '0');
    // init form
    this.updateSaleForm = this.formBuilder.group({
      sale_id: ['', Validators.required],
      date: ['', Validators.required],
      pod_name: ['', Validators.required],
      user_name: ['', Validators.required],
      client_name: ['', Validators.required],
    });
    // asign id sale to search data
    this.idSale = localStorage.getItem('idSale');
    console.log(this.idSale);

    // eject ws search user for id
    this.getSaleDataId();
    // console.log('Cargamos el formulario o_o');
  }
  // get form contsales
  get f() {
    // console.log('Llegue a la lectura el formulario');
    return this.updateSaleForm.controls;
  }
  onInactive() {
    this.viewInactiveChange = !this.viewInactiveChange;
  }
  onSubmit() {
    // console.log('Llegue al metodo');

    this.submitted = true;
    // error here if form is invalid
    if (this.updateSaleForm.invalid) {
      return;
    } else {
      this.saleService.updateSale(
        this.updateSaleForm.value.sale_id,
        this.updateSaleForm.value.user_id,
        this.updateSaleForm.value.password
      )
        .subscribe(data => {
          // tslint:disable-next-line: triple-equals
          if (data.respuesta == 'Success') {
            this.router.navigate(['/listsales']);
          } else {
            this.msgerr = 'error al actualizar sale';
          }
        })
    }

  }
  // obtain data sale for id
  getSaleDataId() {
    this.saleService.getDataSaleForId(this.idSale)
      .subscribe(data => {
        if (data != null) {
          // add values to the form
          console.log(data);

          this.updateSaleForm.get('sale_id').setValue(data.rows[0].sale_id);
          this.updateSaleForm.get('date').setValue(data.rows[0].date);
          this.updateSaleForm.get('pod_name').setValue(data.rows[0].pod_name);
          this.updateSaleForm.get('user_name').setValue(data.rows[0].user_name);
          this.updateSaleForm.get('client_name').setValue(data.rows[0].client_name);
        }
      });
  }
  // clear alert err
  closeAlertErr(): void {
    this.msgerr = '';
  }
}
