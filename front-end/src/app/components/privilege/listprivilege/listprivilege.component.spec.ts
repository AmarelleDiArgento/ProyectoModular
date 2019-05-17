import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListprivilegeComponent } from './listprivilege.component';

describe('ListprivilegeComponent', () => {
  let component: ListprivilegeComponent;
  let fixture: ComponentFixture<ListprivilegeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListprivilegeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListprivilegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
