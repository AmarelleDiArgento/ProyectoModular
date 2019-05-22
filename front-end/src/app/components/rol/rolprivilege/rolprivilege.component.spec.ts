import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolprivilegeComponent } from './rolprivilege.component';

describe('RolprivilegeComponent', () => {
  let component: RolprivilegeComponent;
  let fixture: ComponentFixture<RolprivilegeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolprivilegeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolprivilegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
