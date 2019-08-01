import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import Swal from 'sweetalert2';
declare var $: any;

import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-renderresetbutton',
  templateUrl: './renderresetbutton.component.html',
  styleUrls: ['./renderresetbutton.component.css']
})
export class RenderresetbuttonComponent implements OnInit, ICellRendererAngularComp {
  private cellvalue: any;
  private Name: string;
  private name: string;
  constructor(private router: Router,
    private userService: UserService) { }

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

  }


  newPassword() {
    let caracteres = 'abcdefghijkmnpqrtuvwxyzABCDEFGHIJKLMNPQRTUVWXYZ012346789';
    let contraseña = '';
    for (let i = 0; i < 10; i++) {
      contraseña += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    console.log(contraseña);
    return contraseña;
  }


  resetPassword() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podras recuperar los cambios',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, resetealo!'
    }).then((result) => {
      if (result.value) {
        console.log('this.' + this.name + 'Service');
        let newPassword = this.newPassword();
        this.userService.resetUserPassword(this.cellvalue, newPassword)
          .subscribe(data => {
            if (data.respuesta === 'Success') {
              Swal.fire({
                type: 'success',
                title: 'Nuevo password: ' + newPassword,
                showConfirmButton: true
              });
            } else {
              Swal.fire({
                type: 'error',
                title: 'Ups!, algo salio mal: \n' + data.respuesta,
                showConfirmButton: false,
                timer: 2000
              });
            }

          });
      }
    });

    // send to api backend delete pod for id

  }

}