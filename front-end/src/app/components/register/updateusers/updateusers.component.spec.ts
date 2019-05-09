import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateusersComponent } from './updateusers.component';

describe('UpdateusersComponent', () => {
  let component: UpdateusersComponent;
  let fixture: ComponentFixture<UpdateusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
