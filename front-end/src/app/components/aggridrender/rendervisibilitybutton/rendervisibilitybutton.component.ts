import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-rendervisibilitybutton',
  templateUrl: './rendervisibilitybutton.component.html',
  styleUrls: ['./rendervisibilitybutton.component.css']
})
export class RendervisibilitybuttonComponent implements OnInit, ICellRendererAngularComp {
  private cellvalue: any;
  private Name: string;
  private name: string;

  constructor(private router: Router) { }



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

  // redirect to update pod
  setting() {
    // almacenamos el id
    localStorage.setItem('id' + this.Name, this.cellvalue);
    console.log('id' + this.Name, this.cellvalue);

    this.router.navigate(['/listrolprivileges']);
  }

}
