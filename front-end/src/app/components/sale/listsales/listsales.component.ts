import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
// service auth
import { SaleService } from '../../../services/sale.service';

@Component({
  selector: 'app-listsales',
  templateUrl: './listsales.component.html',
  styleUrls: ['./listsales.component.css']
})
export class ListsalesComponent implements OnInit {

  // list data ws sale 
  listSale: {};

  constructor(private http: Http, private formBuilder: FormBuilder, private saleService: SaleService, private router: Router) {
    
  }

  ngOnInit() {
    this.getAllData();
  }

  // obtain all data from the register sales
  getAllData() {
    // send to search api backend all sales
    this.saleService.getAllDataSale()
      .subscribe(data => {
        // populate list json sale
        this.listSale = data.rows;
      });
  }
  // redirect to create sale
  createSale() {
    this.router.navigate(['/createsale'])
  }
  // redirect to update sale
  updateSale(id) {
    // almacenamos el id
    localStorage.setItem('idSale', id);
    this.router.navigate(['/updatesale'])
  }

  // delete sale
  deleteSale(id) {

    Swal.fire({
      title: 'Estas seguro?',
      text: 'No podras recuperar los cambios',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo!'
    }).then((result) => {
      if (result.value) {
        this.saleService.deleteSale(id)
          .subscribe(data => {
            if (data.respuesta === 'Success') {
              Swal.fire({
                type: 'success',
                title: 'Eliminacion exitosa',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                onClose: () => {
                  // redirect 
                  this.ngOnInit();
                }
              });
            } else {
              Swal.fire({
                type: 'error',
                title: 'Ups!, algo salio mal: \n' + data.respuesta,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000
              });
            }
          });
      }
    })

    // send to api backend delete sale for id

  }
}
