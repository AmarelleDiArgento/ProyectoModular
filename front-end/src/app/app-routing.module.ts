import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { ListusersComponent } from './components/register/listusers/listusers.component';
import { UpdateusersComponent } from './components/register/updateusers/updateusers.component';
import { RolComponent } from './components/rol/rol.component';
import { ListrolComponent } from './components/rol/listrol/listrol.component';
import { UpdaterolComponent } from './components/rol/updaterol/updaterol.component';
import { ListprivilegeComponent } from './components/privilege/listprivilege/listprivilege.component';
import { UpdateprivilegeComponent } from './components/privilege/updateprivilege/updateprivilege.component';
import { PrivilegeComponent } from './components/privilege/privilege.component';
import { ListmodulesComponent } from './components/module/listmodules/listmodules.component';
import { UpdatemodulesComponent } from './components/module/updatemodules/updatemodules.component';
import { ModuleComponent } from './components/module/module.component';

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
        path: 'createprivileges',
        component: PrivilegeComponent,
    },
    {
        path: 'updateprivileges',
        component: UpdateprivilegeComponent,
    },
    {
        path: 'listprivileges',
        component: ListprivilegeComponent,
    },
    {
        path: 'createmodules',
        component: ModuleComponent,
    },
    {
        path: 'updatmodules',
        component: UpdatemodulesComponent,
    },
    {
        path: 'listmodules',
        component: ListmodulesComponent,
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
