import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// login
import { LoginComponent } from './components/login/login.component';
// home 
import { HomeComponent } from './components/home/home.component';
// inventory
import { InventoryComponent } from './components/inventory/inventory.component';
// profile
import { ProfileComponent } from './components/profile/profile.component';
// user
import { UserComponent } from './components/user/user.component';
import { ListuserComponent } from './components/user/listuser/listuser.component';
import { ListusersComponent } from './components/listusers/listusers.component';
import { UpdateuserComponent } from './components/user/updateuser/updateuser.component';
// rol
import { RolComponent } from './components/rol/rol.component';
import { ListrolComponent } from './components/rol/listrol/listrol.component';
import { UpdaterolComponent } from './components/rol/updaterol/updaterol.component';
import { RolprivilegeComponent } from './components/rol/rolprivilege/rolprivilege.component';
import { ListrolprivilegeComponent } from './components/rol/rolprivilege/listrolprivilege/listrolprivilege.component';

import { ListprivilegeComponent } from './components/privilege/listprivilege/listprivilege.component';
import { UpdateprivilegeComponent } from './components/privilege/updateprivilege/updateprivilege.component';
import { PrivilegeComponent } from './components/privilege/privilege.component';

import { ListmodulesComponent } from './components/module/listmodules/listmodules.component';
import { UpdatemodulesComponent } from './components/module/updatemodules/updatemodules.component';
import { ModuleComponent } from './components/module/module.component';

// category
import { CategoryComponent } from './components/category/category.component';
import { ListcategoryComponent } from './components/category/listcategory/listcategory.component';
import { UpdatecategoryComponent } from './components/category/updatecategory/updatecategory.component';
// tax
import { TaxComponent } from './components/tax/tax.component';
import { ListtaxComponent } from './components/tax/listtax/listtax.component';
import { UpdatetaxComponent } from './components/tax/updatetax/updatetax.component';
// product
import { ProductComponent } from './components/product/product.component';
import { ListproductComponent } from './components/product/listproduct/listproduct.component';
import { UpdateproductComponent } from './components/product/updateproduct/updateproduct.component';

import { PodComponent } from './components/pod/pod.component';
import { ListpodsComponent } from './components/pod/listpods/listpods.component';
import { UpdatepodComponent } from './components/pod/updatepod/updatepod.component';

import { SaleComponent } from './components/sale/sale.component';
import { InvoiceComponent } from './components/sale/invoice/invoice.component';
import { ListsalesComponent } from './components/sale/listsales/listsales.component';
import { UpdatesaleComponent } from './components/sale/updatesale/updatesale.component';


// const routes
const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'inventory',
        component: InventoryComponent,
    },
    {
        path: 'profile',
        component: ProfileComponent,
    },
    {
        path: 'createuser',
        component: UserComponent,
    },
    {
        path: 'updateuser',
        component: UpdateuserComponent,
    },
    {
        path: 'listusers',
        component: ListusersComponent,
    },
    {
        path: 'listuser',
        component: ListuserComponent,
    },
    {
        path: 'createrol',
        component: RolComponent,
    },
    {
        path: 'updaterol',
        component: UpdaterolComponent,
    },
    {
        path: 'listrols',
        component: ListrolComponent,
    },
    {
        path: 'createprivilege',
        component: PrivilegeComponent,
    },
    {
        path: 'updateprivilege',
        component: UpdateprivilegeComponent,
    },
    {
        path: 'listprivileges',
        component: ListprivilegeComponent,
    },
    {
        path: 'createmodule',
        component: ModuleComponent,
    },
    {
        path: 'updatemodule',
        component: UpdatemodulesComponent,
    },
    {
        path: 'listmodules',
        component: ListmodulesComponent,
    },
    {
        path: 'createcategory',
        component: CategoryComponent,
    },
    {
        path: 'updatecategory',
        component: UpdatecategoryComponent,
    },
    {
        path: 'listcategorys',
        component: ListcategoryComponent,

    },
    {
        path: 'createtax',
        component: TaxComponent,

    },
    {
        path: 'updatetax',
        component: UpdatetaxComponent,
    },
    {
        path: 'listtaxs',
        component: ListtaxComponent,
    },
    {
        path: 'createproduct',
        component: ProductComponent,

    },
    {
        path: 'updateproduct',

        component: UpdateproductComponent,
    },
    {
        path: 'listproducts',
        component: ListproductComponent,
    },
    {
        path: 'createsale',
        component: SaleComponent,

    },
    {
        path: 'invoiceprint',
        component: InvoiceComponent,

    },
    {
        path: 'updatesale',
        component: UpdatesaleComponent,
    },
    {
        path: 'listsales',
        component: ListsalesComponent,
    },
    {
        path: 'createpod',
        component: PodComponent,

    },
    {
        path: 'updatepod',
        component: UpdatepodComponent,
    },
    {
        path: 'listpods',
        component: ListpodsComponent,
    },
    {
        path: 'createrolprivilege',
        component: RolprivilegeComponent,
    },
    {
        path: 'listrolprivileges',
        component: ListrolprivilegeComponent,
    }








];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }
