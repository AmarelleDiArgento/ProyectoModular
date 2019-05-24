import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
<<<<<<< Updated upstream
//service 
=======
import Swal from 'sweetalert2';
declare var $: any;
// service
>>>>>>> Stashed changes
import { ProductService } from '../../../services/product.service';
//service excel
import {ExcelService} from '../../../services/excel.service';

@Component({
  selector: 'app-listproduct',
  templateUrl: './listproduct.component.html',
  styleUrls: ['./listproduct.component.css']
})
export class ListproductComponent implements OnInit {

  // list data ws product
  listProduct: {};
  //array from excel data
  listExcelProduct: any[];

<<<<<<< Updated upstream
  constructor(private http: Http, private formBuilder: FormBuilder, private productService: ProductService, private excelService: ExcelService, private router: Router) {
    //get data
=======
  constructor(private http: Http, private formBuilder: FormBuilder, private productService: ProductService, private router: Router) {
    // get data
>>>>>>> Stashed changes
    this.getAllData();
  }

  ngOnInit() {
  }

  // obtain all data from the product
  getAllData() {
    // send to search api backend all product
    this.productService.getAllDataProduct()
      .subscribe(data => {
        // populate list json
        console.log(data);
        this.listProduct = data.rows;
        //populate excel data
        this.listExcelProduct = data.rows;
      });
  }
  // redirect to create product
  createProduct() {
    this.router.navigate(['/createproduct']);
  }
  // redirect to update product
  updateProduct(id) {
    // almacenamos el id
    localStorage.setItem('idProduct', id);
    this.router.navigate(['/updateproduct']);
  }
  // delete product
  deleteProduct(id) {


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

        // send to api backend delete product for id
        this.productService.deleteProduct(id)
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
                  location.reload();
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
    });
  }
  //export to file excel
  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.listExcelProduct, 'ReporteProductos');
 }
}