import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListpodsComponent } from './listpods.component';

describe('ListpodsComponent', () => {
  let component: ListpodsComponent;
  let fixture: ComponentFixture<ListpodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListpodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListpodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
