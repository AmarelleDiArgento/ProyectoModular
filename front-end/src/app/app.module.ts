// generic libs
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExcelService } from './services/excel.service';
import { DataTablesModule } from 'angular-datatables';

// components
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { UserComponent } from './components/user/user.component';
import { ListuserComponent } from './components/user/listuser/listuser.component';
import { UpdateuserComponent } from './components/user/updateuser/updateuser.component';
import { ClientregisterComponent } from './components/user/clientregister/clientregister.component';

import { ListusersComponent } from './components/listusers/listusers.component';

import { RolComponent } from './components/rol/rol.component';
import { ListrolComponent } from './components/rol/listrol/listrol.component';
import { UpdaterolComponent } from './components/rol/updaterol/updaterol.component';
import { PrivilegeComponent } from './components/privilege/privilege.component';
import { ListprivilegeComponent } from './components/privilege/listprivilege/listprivilege.component';
import { UpdateprivilegeComponent } from './components/privilege/updateprivilege/updateprivilege.component';
import { ModuleComponent } from './components/module/module.component';
import { ListmodulesComponent } from './components/module/listmodules/listmodules.component';
import { UpdatemodulesComponent } from './components/module/updatemodules/updatemodules.component';
import { CategoryComponent } from './components/category/category.component';
import { ListcategoryComponent } from './components/category/listcategory/listcategory.component';
import { UpdatecategoryComponent } from './components/category/updatecategory/updatecategory.component';
import { TaxComponent } from './components/tax/tax.component';
import { ListtaxComponent } from './components/tax/listtax/listtax.component';
import { UpdatetaxComponent } from './components/tax/updatetax/updatetax.component';
import { ProductComponent } from './components/product/product.component';
import { ListproductComponent } from './components/product/listproduct/listproduct.component';
import { UpdateproductComponent } from './components/product/updateproduct/updateproduct.component';
import { SaleComponent } from './components/sale/sale.component';
import { ListsalesComponent } from './components/sale/listsales/listsales.component';
import { UpdatesaleComponent } from './components/sale/updatesale/updatesale.component';
import { PodComponent } from './components/pod/pod.component';
import { ListpodsComponent } from './components/pod/listpods/listpods.component';
import { UpdatepodComponent } from './components/pod/updatepod/updatepod.component';
import { RolprivilegeComponent } from './components/rol/rolprivilege/rolprivilege.component';
import { ListrolprivilegeComponent } from './components/rol/rolprivilege/listrolprivilege/listrolprivilege.component';
import { TablerenderComponent } from './components/tablerender/tablerender.component';
import { UpdateComponent } from './components/tablerender/update/update.component';
import { DeleteComponent } from './components/tablerender/delete/delete.component';
//service
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { RolService } from './services/rol.service';
import { PrivilegeService } from './services/privilege.service';
import { ModuleService } from './services/module.service';
import { CategoryService } from './services/category.service';
import { TaxService } from './services/tax.service';
import { ProductService } from './services/product.service';
import { SaleService } from './services/sale.service';
import { PodService } from './services/pod.service';
import { RolprivilegeService } from './services/rolprivilege.service';
import { PrintService } from './services/print.service';
import { InvoiceComponent } from './components/sale/invoice/invoice.component';
import { PreloadComponent } from './components/preload/preload.component';
import { ResetComponent } from './components/tablerender/reset/reset.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    InventoryComponent,
    HeaderComponent,
    FooterComponent,
    UserComponent,
    UpdateuserComponent,
    ListusersComponent,
    ListuserComponent,
    ClientregisterComponent,
    RolComponent,
    ListrolComponent,
    UpdaterolComponent,
    PrivilegeComponent,
    ListprivilegeComponent,
    UpdateprivilegeComponent,
    ModuleComponent,
    ListmodulesComponent,
    UpdatemodulesComponent,
    CategoryComponent,
    ListcategoryComponent,
    UpdatecategoryComponent,
    TaxComponent,
    ListtaxComponent,
    UpdatetaxComponent,
    ProductComponent,
    ListproductComponent,
    UpdateproductComponent,
    PodComponent,
    SaleComponent,
    ListsalesComponent,
    UpdatesaleComponent,
    ListpodsComponent,
    UpdatepodComponent,
    ListpodsComponent,
    RolprivilegeComponent,
    ListrolprivilegeComponent,
    PreloadComponent,
    InvoiceComponent,
    TablerenderComponent,
    UpdateComponent,
    DeleteComponent,
    ResetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    
  ],
  providers: [
    AuthService,
    UserService,
    RolService,
    CategoryService,
    TaxService,
    ProductService,
    PrivilegeService,
    ModuleService,
    SaleService,
    PodService,
    RolprivilegeService,
    ExcelService,
    PrintService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
