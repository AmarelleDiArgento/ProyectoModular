import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
// service category
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  // vars msj
  msgerr = '';
  // var submitted
  submitted = false;
  // var form
  registerCategoryForm: FormGroup;
  // list data
  listCategory: {};

  constructor(private http: Http, private formBuilder: FormBuilder,
    private categoryService: CategoryService, private router: Router) { }

  ngOnInit() {
    // init form
    this.registerCategoryForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }
  // get form controls
  get f() { return this.registerCategoryForm.controls; }
  // submit form
  onSubmit() {
    this.submitted = true;
    // error here if form is invalid
    if (this.registerCategoryForm.invalid) {
      return;
    } else {
      // send to api backend create category
      this.categoryService.createCategory(this.registerCategoryForm.value.name)
        .subscribe(data => {

          if (data.respuesta === 'Success') {
            Swal.fire({
              type: 'success',
              title: 'Registro exitoso',
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 2000
            });
            // redirect to home menu
            this.router.navigate(['/listcategorys'])
          } else {
            Swal.fire({
              type: 'error',
              title: 'Ups!, algo salio mal: \n' + data.respuesta,
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 2000
            });
            this.msgerr = 'Error al crear el categoria';
          }
        });
    }
  }
  // clear alert err
  closeAlertErr(): void {
    this.msgerr = '';
  }
}
