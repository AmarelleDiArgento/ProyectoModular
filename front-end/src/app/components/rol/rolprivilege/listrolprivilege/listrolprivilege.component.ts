import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
// service auth
import { RolprivilegeService } from '../../../../services/rolprivilege.service';

@Component({
  selector: 'app-listrolprivilege',
  templateUrl: './listrolprivilege.component.html',
  styleUrls: ['./listrolprivilege.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class ListrolprivilegeComponent implements OnInit {

// list data ws rolprivilege 
listRolPrivilege: {};
idRol = '';
// vars msj
msgerr: string = '';

constructor(private http: Http, private formBuilder: FormBuilder, private rolprivilegeService: RolprivilegeService, private router: Router) {
  
}

ngOnInit() {
  this.getAllData();
}

// obtain all data from the register rolprivileges
getAllData() {
  // send to search api backend all rolprivileges

  this.idRol = localStorage.getItem('idRol');
  this.rolprivilegeService.getDataRolPrivilege(
    this.idRol

  )
    .subscribe(data => {
      // populate list json rolprivilege
      this.listRolPrivilege = data.rows;

    });
}
// redirect to create rolprivilege
createRolPrivilege() {
  // almacenamos el id
  localStorage.setItem('idRolPrivilege', this.idRol);
  this.router.navigate(['/createrolprivilege'])
}
// redirect to update rolprivilege
updateRolPrivilege(rp_privilege_id,rp_rol_id,viewrol,createrol,updaterol,deleterol) {

  // send to api backend update rol privilege
  this.rolprivilegeService.updateRolPrivilege(rp_privilege_id,rp_rol_id,viewrol,createrol,updaterol,deleterol)
  .subscribe(data => {
    if (data.respuesta === 'Success') {
      Swal.fire({
        type: 'success',
        title: 'Actualizacion exitosa',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000
      });
      // reload data
      this.ngOnInit();

    } else {
      Swal.fire({
        type: 'error',
        title: 'Ups!, algo salio mal: \n' + data.respuesta,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000
      });
      this.msgerr = 'Error al actualizar el privilegio del rol';
    }
  });



}
// redirect to update rolprivilege
updateRolPrivilegePrivilege(id) {
  // almacenamos el id
  localStorage.setItem('idRolPrivilege', id);
  this.router.navigate(['/rolprivilegeprivilege'])
}

 // delete rolprivilege
 deleteRolPrivilege(privilege,rol) {

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
       this.rolprivilegeService.deleteRolPrivilege(privilege,rol)
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
                /// reload data
                this.ngOnInit();
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
