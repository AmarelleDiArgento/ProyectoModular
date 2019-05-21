import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
// service auth
import { PodService } from '../../../services/pod.service';

@Component({
  selector: 'app-listpods',
  templateUrl: './listpods.component.html',
  styleUrls: ['./listpods.component.css']
})
export class ListpodsComponent implements OnInit {

  // list data ws pod 
  listPod: {};

  constructor(private http: Http, private formBuilder: FormBuilder, private podService: PodService, private router: Router) {
    this.getAllData();
  }

  ngOnInit() {
  }

  // obtain all data from the register pods
  getAllData() {
    // send to search api backend all pods
    this.podService.getAllDataPod()
      .subscribe(data => {
        // populate list json pod
        this.listPod = data.rows;
      });
  }
  // redirect to create pod
  createPod() {
    this.router.navigate(['/createpod'])
  }
  // redirect to update pod
  updatePod(id) {
    // almacenamos el id
    localStorage.setItem('idPod', id);
    this.router.navigate(['/updatepod'])
  }

  // delete pod
  deletePod(id) {

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
        this.podService.deletePod(id)
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
                  // redirect 
                  location.reload();
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
