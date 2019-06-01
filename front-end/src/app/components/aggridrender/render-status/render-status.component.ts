import { Component, OnInit } from '@angular/core';
import { ICellEditorAngularComp, ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-render-status',
  templateUrl: './render-status.component.html',
  styleUrls: ['./render-status.component.css']
})
export class RenderStatusComponent implements OnInit, ICellRendererAngularComp {
  private cellvalue: any;
  constructor() { }

  ngOnInit() {
  }

  refresh(params: any): boolean {

    return true;
  }
  agInit(params: any): void {
    console.log('status ok!');
    this.cellvalue = params.value;
  }

}
