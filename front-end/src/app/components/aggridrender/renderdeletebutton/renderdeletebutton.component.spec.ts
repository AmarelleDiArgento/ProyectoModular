import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderdeletebuttonComponent } from './renderdeletebutton.component';

describe('RenderdeletebuttonComponent', () => {
  let component: RenderdeletebuttonComponent;
  let fixture: ComponentFixture<RenderdeletebuttonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderdeletebuttonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderdeletebuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
