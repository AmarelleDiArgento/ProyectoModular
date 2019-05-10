import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdaterolComponent } from './updaterol.component';

describe('UpdaterolComponent', () => {
  let component: UpdaterolComponent;
  let fixture: ComponentFixture<UpdaterolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdaterolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdaterolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
