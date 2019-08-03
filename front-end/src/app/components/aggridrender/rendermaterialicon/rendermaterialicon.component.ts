import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-rendermaterialicon',
  templateUrl: './rendermaterialicon.component.html',
  styleUrls: ['./rendermaterialicon.component.css']
})
export class RendermaterialiconComponent implements OnInit, ICellRendererAngularComp {
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