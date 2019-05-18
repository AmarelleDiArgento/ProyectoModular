import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
// service
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-updatecategory',
  templateUrl: './updatecategory.component.html',
  styleUrls: ['./updatecategory.component.css']
})
export class UpdatecategoryComponent implements OnInit {

  // vars msj
  msgerr = '';
  // var submitted
  submitted = false;
  // var form
  updateCategoryForm: FormGroup;
  // list data auth
  listRol: {};
  // id
  idCategory = '';
  // rows empty
  rows = [];
  // vars form update
  name = '';

  constructor(private http: Http, private formBuilder: FormBuilder, private categoryService: CategoryService, private router: Router) { }


  ngOnInit() {
    // init form
    this.updateCategoryForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
    // asign id category to search data
    this.idCategory = localStorage.getItem('idCategory');
    // eject ws search category for id
    this.getCategoryDataId();
  }
  // get form controls
  get f() { return this.updateCategoryForm.controls; }
  onSubmit() {
    this.submitted = true;
    // error here if form is invalid
    if (this.updateCategoryForm.invalid) {
      return;
    } else {
      this.categoryService.updateCategory(this.idCategory, this.updateCategoryForm.value.name)
        .subscribe(data => {
          if (data.respuesta === 'Success') {
            this.router.navigate(['/listcategorys']);
          } else {
            this.msgerr = 'error al actualizar la categoria';
          }
        });
    }
  }
  // obtain data category for id
  getCategoryDataId() {
    this.categoryService.getDataCategoryForId(this.idCategory)
      .subscribe(data => {
        if (data != null) {
          // add values to the form
          this.updateCategoryForm.get('name').setValue(data.rows[0].name);
        }
      });
  }
  // clear alert err
  closeAlertErr(): void {
    this.msgerr = '';
  }
}
