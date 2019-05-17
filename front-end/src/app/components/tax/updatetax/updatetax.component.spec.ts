import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatetaxComponent } from './updatetax.component';

describe('UpdatetaxComponent', () => {
  let component: UpdatetaxComponent;
  let fixture: ComponentFixture<UpdatetaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatetaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatetaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
