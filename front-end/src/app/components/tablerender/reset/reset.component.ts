import { Component, OnInit, Injectable } from '@angular/core';
import Swal from 'sweetalert2';
declare var $: any;
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class ResetComponent implements OnInit {

  constructor(private router: Router,
    private userService: UserService) { }

  ngOnInit() {
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

  resetPassword(name,user) {
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
        console.log('this.' + name + 'Service');
        let newPassword = this.newPassword();
        this.userService.resetUserPassword(user, newPassword)
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
}

}
