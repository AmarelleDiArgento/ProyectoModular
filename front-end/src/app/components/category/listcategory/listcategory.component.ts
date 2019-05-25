import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
// service category
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-listcategory',
  templateUrl: './listcategory.component.html',
  styleUrls: ['./listcategory.component.css']
})
export class ListcategoryComponent implements OnInit {

 // list data ws category
 listCategory: {};

 constructor(private http: Http, private formBuilder: FormBuilder, private categoryService: CategoryService, private router: Router) {
   
  }

 ngOnInit() {
  this.getAllData();
 }

 // obtain all data from the category
 getAllData() {
   // send to search api backend all category
   this.categoryService.getAllDataCategory()
   .subscribe(data => {
      // populate list json
       console.log(data);
      this.listCategory = data.rows;
   });
 }
 // redirect to create category
 createCategory() {
   this.router.navigate(['/createcategory']);
 }
 // redirect to update category
 updateCategory(id) {
   // almacenamos el id
   localStorage.setItem('idCategory', id);
   this.router.navigate(['/updatecategory']);
 }
 // delete category
 deleteCategory(id) {
   // send to api backend delete category for id
   this.categoryService.deleteCategory(id)
   .subscribe(data => {
     if (data.respuesta === 'Success') {
       // redirect
       this.ngOnInit();
     }
   });
 }
}

