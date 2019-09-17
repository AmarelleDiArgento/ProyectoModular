// generic libs
import { Component, OnInit, NgZone, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
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
// jquery
declare var $: any;
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
  selector: 'app-renderdeletebutton',
  templateUrl: './renderdeletebutton.component.html',
  styleUrls: ['./renderdeletebutton.component.css']
})
@Injectable()
export class RenderdeletebuttonComponent implements OnInit, ICellRendererAngularComp {
  cellvalue: any;
  private Name: string;
  private name: string;
  private Service;
  public Reload;
  public NameComponent;
  private Component;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private zone: NgZone,
    private categoryService: CategoryService,
    private moduleService: ModuleService,
    private podService: PodService,
    private privilegeService: PrivilegeService,
    private productService: ProductService,
    private rolService: RolService,
    private userService: UserService,
    private saleService: SaleService,
    private taxService: TaxService,
    private listcategoryComponent: ListcategoryComponent,
    private listrolComponent: ListrolComponent,
    private listrolprivilegeComponent: ListrolprivilegeComponent,
    private listprivilegeComponent: ListprivilegeComponent,
    private listmoduleComponent: ListmodulesComponent,
    private listtaxComponent: ListtaxComponent,
    private listproductComponent: ListproductComponent,
    private listpodComponent: ListpodsComponent,
    private listsaleComponent: ListsalesComponent,
    private listuserComponent: ListuserComponent
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
    this.Component = eval('this.list' + this.name + 'Component');
    this.NameComponent = eval('this.list' + this.name + 'Component');
    
    this.Reload = 'list' + this.name +'s';
  }
  delete() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás recuperar los cambios',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminalo!'
    }).then((result) => {
      if (result.value) {


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
                  // get method generic reload
                  console.log()
                  this.NameComponent.reload();
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
