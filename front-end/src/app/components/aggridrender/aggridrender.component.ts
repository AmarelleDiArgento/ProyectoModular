import { Component, OnInit } from '@angular/core';
import { ICellRenderer } from 'ag-grid-community';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-aggridrender',
  templateUrl: './aggridrender.component.html',
  styleUrls: ['./aggridrender.component.css']
})
export class AggridrenderComponent implements OnInit, ICellRendererAngularComp {
  refresh(params: any): boolean {
    throw new Error('Method not implemented.');
  }
  agInit(params: import('ag-grid-community').ICellRendererParams): void {
    throw new Error('Method not implemented.');
  }
  afterGuiAttached?(params?: import('ag-grid-community').IAfterGuiAttachedParams): void {
    throw new Error('Method not implemented.');
  }

  constructor() { }

  ngOnInit() {
  }

}
