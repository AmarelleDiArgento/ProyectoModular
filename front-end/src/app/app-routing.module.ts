import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
//login
import { LoginComponent } from './components/login/login.component';
//home 
import { HomeComponent } from './components/home/home.component';
//inventory
import { InventoryComponent } from './components/inventory/inventory.component';
//profile
import { ProfileComponent } from './components/profile/profile.component';
//register
import { RegisterComponent } from './components/register/register.component';
import { ListusersComponent } from './components/register/listusers/listusers.component';
import { UpdateusersComponent } from './components/register/updateusers/updateusers.component';
//rol
import { RolComponent } from './components/rol/rol.component';
import { ListrolComponent } from './components/rol/listrol/listrol.component';
import { UpdaterolComponent } from './components/rol/updaterol/updaterol.component';
//category
import { CategoryComponent } from './components/category/category.component';
import { ListcategoryComponent } from './components/category/listcategory/listcategory.component';
import { UpdatecategoryComponent } from './components/category/updatecategory/updatecategory.component';
//tax
import { TaxComponent } from './components/tax/tax.component';
import { ListtaxComponent } from './components/tax/listtax/listtax.component';
import { UpdatetaxComponent } from './components/tax/updatetax/updatetax.component';
//product
import { ProductComponent } from './components/product/product.component';
import { ListproductComponent } from './components/product/listproduct/listproduct.component';
import { UpdateproductComponent } from './components/product/updateproduct/updateproduct.component';
//const routes
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
            path: 'createusers',
            component: RegisterComponent,
        },
        {
            path: 'updateusers',
            component: UpdateusersComponent,
        },
        {
            path: 'listusers',
            component: ListusersComponent,
        },
        {
            path: 'createrols',
            component: RolComponent,
        },
        {
            path: 'updaterols',
            component: UpdaterolComponent,
        },
        {
            path: 'listrols',
            component: ListrolComponent,
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
            path: 'listcategory',
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
            path: 'listtax',
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
            path: 'listproduct',
            component: ListproductComponent,
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
