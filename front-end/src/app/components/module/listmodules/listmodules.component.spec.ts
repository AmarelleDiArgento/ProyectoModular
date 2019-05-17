import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListmodulesComponent } from './listmodules.component';

describe('ListmodulesComponent', () => {
  let component: ListmodulesComponent;
  let fixture: ComponentFixture<ListmodulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListmodulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListmodulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
