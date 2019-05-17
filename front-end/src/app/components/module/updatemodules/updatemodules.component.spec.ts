import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatemodulesComponent } from './updatemodules.component';

describe('UpdatemodulesComponent', () => {
  let component: UpdatemodulesComponent;
  let fixture: ComponentFixture<UpdatemodulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatemodulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatemodulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
