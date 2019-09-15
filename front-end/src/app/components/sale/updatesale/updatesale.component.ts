import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
declare var $: any;
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
  inactivechangeForm: FormGroup;
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
    localStorage.setItem('moduleSelected', 'UpdatedSale');
    localStorage.setItem('typeSale', 'Imprimir');
    localStorage.setItem('sendPrint', 'No');
    // init form
    this.updateSaleForm = this.formBuilder.group({
      sale_id: ['', Validators.required],
      date: ['', Validators.required],
      pod_name: ['', Validators.required],
      user_name: ['', Validators.required],
      client_name: ['', Validators.required],
    });
    // init form
    this.inactivechangeForm = this.formBuilder.group({
      user_id: ['', Validators.required],
      password: ['', Validators.required],
    });

    // asign id sale to search data
    this.idSale = localStorage.getItem('idSale');
    console.log(this.idSale);


    // eject ws search user for id
    this.getSaleDataId();
    // console.log('Cargamos el formulario o_o');
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
  // get form contsales
  get f() {
    // console.log('Llegue a la lectura el formulario');
    return this.updateSaleForm.controls;
  }
  // get form contsales
  get p() {
    // console.log('Llegue a la lectura el formulario');
    return this.inactivechangeForm.controls;
  }

  onInactive() {
    this.viewInactiveChange = !this.viewInactiveChange;
  }

  invoicePrint() {
    localStorage.setItem('typeSale', 'Imprimir');
    localStorage.setItem('sendPrint', 'Yes');
    this.router.navigate(['/invoiceprint']);
  }

  sendEmail() {
    localStorage.setItem('typeSale', 'Correo');
    localStorage.setItem('sendEmail', 'Yes');
    this.router.navigate(['/invoiceprint']);
  }

  onSubmit() {
    // console.log('Llegue al metodo');

    this.submitted = true;
    // error here if form is invalid
    if (this.inactivechangeForm.invalid) {
      return;
    } else {
      this.saleService.updateSale(
        this.idSale,
        this.inactivechangeForm.value.user_id,
        this.inactivechangeForm.value.password
      )
        .subscribe(data => {
          console.log(data);

          if (data.respuesta === 'Success') {
            Swal.fire({
              type: 'success',
              title: 'Factura inactivada! ',
              showConfirmButton: false,
              timer: 2000
            });
            this.msgerr = '';
            this.router.navigate(['/listsales']);

          } else if (data.respuesta === 'not allowed') {
            Swal.fire({
              type: 'error',
              title: 'Ups!, no tienes permisos para realizar esta acción',
              showConfirmButton: false,
              timer: 2000
            });
            this.msgerr = 'Permisos invalidos';

          } else {
            Swal.fire({
              type: 'error',
              title: 'Ups!, algo salio mal',
              showConfirmButton: false,
              timer: 2000
            });
            this.msgerr = 'error al actualizar password';
          }
        })
    }

  }
  // clear alert err
  closeAlertErr(): void {
    this.msgerr = '';
  }
}
