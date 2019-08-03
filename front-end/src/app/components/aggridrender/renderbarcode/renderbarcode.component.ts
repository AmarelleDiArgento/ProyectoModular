import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-renderbarcode',
  templateUrl: './renderbarcode.component.html',
  styleUrls: ['./renderbarcode.component.css']
})
export class RenderbarcodeComponent implements OnInit, ICellRendererAngularComp {
  cellvalue: any;
  constructor() { }

  ngOnInit() {
  }

  refresh(params: any): boolean {

    return true;
  }
  agInit(params: any): void {
    this.cellvalue = params.value;
  }

}