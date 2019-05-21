import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsalesComponent } from './listsales.component';

describe('ListsalesComponent', () => {
  let component: ListsalesComponent;
  let fixture: ComponentFixture<ListsalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListsalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
