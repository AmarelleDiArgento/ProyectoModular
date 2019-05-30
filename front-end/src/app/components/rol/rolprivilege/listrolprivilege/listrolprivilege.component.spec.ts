import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListrolprivilegeComponent } from './listrolprivilege.component';

describe('ListrolprivilegeComponent', () => {
  let component: ListrolprivilegeComponent;
  let fixture: ComponentFixture<ListrolprivilegeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListrolprivilegeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListrolprivilegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
