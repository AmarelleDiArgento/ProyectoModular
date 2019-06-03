import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderbarcodeComponent } from './renderbarcode.component';

describe('RenderbarcodeComponent', () => {
  let component: RenderbarcodeComponent;
  let fixture: ComponentFixture<RenderbarcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderbarcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderbarcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
