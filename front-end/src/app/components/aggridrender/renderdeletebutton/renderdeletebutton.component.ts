import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import Swal from 'sweetalert2';
declare var $: any;


// service auth
import { CategoryService } from '../../../services/category.service';
import { ModuleService } from '../../../services/module.service';
import { PodService } from '../../../services/pod.service';
import { PrivilegeService } from '../../../services/privilege.service';
import { ProductService } from '../../../services/product.service';
import { RolService } from '../../../services/rol.service';
import { SaleService } from '../../../services/sale.service';
import { TaxService } from '../../../services/tax.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-renderdeletebutton',
  templateUrl: './renderdeletebutton.component.html',
  styleUrls: ['./renderdeletebutton.component.css']
})
export class RenderdeletebuttonComponent implements OnInit, ICellRendererAngularComp {
  cellvalue: any;
  private Name: string;
  private name: string;
  private Service;

  constructor(private router: Router,
    private categoryService: CategoryService,
    private moduleService: ModuleService,
    private podService: PodService,
    private privilegeService: PrivilegeService,
    private productService: ProductService,
    private rolService: RolService,
    private userService: UserService,
    private saleService: SaleService,
    private taxService: TaxService
  ) { }

  ngOnInit() {
  }

  refresh(params: any): boolean {
    this.cellvalue = params.value;
    return true;
  }
  agInit(params: any): void {
    this.Name = params.Name;
    this.name = params.name;
    this.cellvalue = params.value;
    this.Service = eval('this.' + this.name + 'Service');

  }
  delete() {
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
        console.log('this.' + this.name + 'Service');

        this.Service.delete(this.cellvalue)
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
                  location.reload(true);
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

    // send to api backend delete pod for id

  }
}
