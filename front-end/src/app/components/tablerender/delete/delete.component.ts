import { Component, OnInit, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// jquery
declare var $: any;
// alerts
import Swal from 'sweetalert2';

// list uses to charge oninit components
import { ListrolComponent } from '../../../components/rol/listrol/listrol.component';
import { ListrolprivilegeComponent } from '../../../components/rol/rolprivilege/listrolprivilege/listrolprivilege.component';
import { ListprivilegeComponent } from '../../../components/privilege/listprivilege/listprivilege.component';
import { ListmodulesComponent } from '../../../components/module/listmodules/listmodules.component';
import { ListcategoryComponent } from '../../../components/category/listcategory/listcategory.component';
import { ListtaxComponent } from '../../../components/tax/listtax/listtax.component';
import { ListproductComponent } from '../../../components/product/listproduct/listproduct.component';
import { ListpodsComponent } from '../../../components/pod/listpods/listpods.component';
import { ListsalesComponent } from '../../../components/sale/listsales/listsales.component';
import { ListuserComponent } from '../../../components/user/listuser/listuser.component';
// charge  services
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
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})

export class DeleteComponent  {

  private Service;
  private Component;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    //components
    private listuserComponent: ListuserComponent,
    private listcategoryComponent: ListcategoryComponent,
    private listrolComponent: ListrolComponent,
    private listrolprivilegeComponent: ListrolprivilegeComponent,
    private listprivilegeComponent: ListprivilegeComponent,
    private listmoduleComponent: ListmodulesComponent,
    private listtaxComponent: ListtaxComponent,
    private listproductComponent: ListproductComponent,
    private listpodComponent: ListpodsComponent,
    private listsaleComponent: ListsalesComponent,
    //services
    private userService: UserService,
    private categoryService: CategoryService,
    private moduleService: ModuleService,
    private podService: PodService,
    private privilegeService: PrivilegeService,
    private productService: ProductService,
    private rolService: RolService,
    private saleService: SaleService,
    private taxService: TaxService,
    ) {
      this.listuserComponent = listuserComponent;
      }

  

  delete(name, id) {
    this.Service = 'this.' + name + 'Service';
    this.Component = 'this.list' + name + 'Component';
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podras recuperar los cambios',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminalo!'
    }).then((result) => {
      if (result.value) {
        console.log('this.' + name + 'Service');
        this.Service.delete(id).subscribe(data => {
            if (data.respuesta === 'Success') {
              Swal.fire({
                type: 'success',
                title: 'Eliminacion exitosa',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                onClose: () => {
                  // get oninit component to recharge info
                  let component = this.Component;
                  // recharge component init (redirection)
                  component.getAllData();
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
}

}
