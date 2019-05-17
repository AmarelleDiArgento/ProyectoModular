import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
//service 
import { TaxService } from '../../../services/tax.service';

@Component({
  selector: 'app-listtax',
  templateUrl: './listtax.component.html',
  styleUrls: ['./listtax.component.css']
})
export class ListtaxComponent implements OnInit {

  //list data ws tax 
  listTax: {};

  constructor(private http: Http, private formBuilder: FormBuilder, private taxService: TaxService, private router: Router) {
    //get data
    this.getAllData();
  }

  ngOnInit() {
  }

  //obtain all data from the tax
  getAllData() {
    //send to search api backend all tax
    this.taxService.getAllDataTax()
      .subscribe(data => {
        //populate list json 
        console.log(data);
        this.listTax = data.rows;
      });
  }
  //redirect to create tax
  createTax() {
    this.router.navigate(['/createtax'])
  }
  //redirect to update tax
  updateTax(id) {
    //almacenamos el id
    localStorage.setItem('idTax', id);
    this.router.navigate(['/updatetax'])
  }
  //delete tax
  deleteTax(id) {
    //send to api backend delete tax for id
    this.taxService.deleteTax(id)
      .subscribe(data => {
        if (data.respuesta == "Success") {
          //redirect 
          location.reload();
        }
      });
  }
}
