import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateprivilegeComponent } from './updateprivilege.component';

describe('UpdateprivilegeComponent', () => {
  let component: UpdateprivilegeComponent;
  let fixture: ComponentFixture<UpdateprivilegeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateprivilegeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateprivilegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
