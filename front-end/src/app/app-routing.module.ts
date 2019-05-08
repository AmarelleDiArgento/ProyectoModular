import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ProfileComponent } from './components/profile/profile.component';

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
