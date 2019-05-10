import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListrolComponent } from './listrol.component';

describe('ListrolComponent', () => {
  let component: ListrolComponent;
  let fixture: ComponentFixture<ListrolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListrolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
