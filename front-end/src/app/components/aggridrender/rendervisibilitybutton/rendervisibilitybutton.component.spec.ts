import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RendervisibilitybuttonComponent } from './rendervisibilitybutton.component';

describe('RendervisibilitybuttonComponent', () => {
  let component: RendervisibilitybuttonComponent;
  let fixture: ComponentFixture<RendervisibilitybuttonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RendervisibilitybuttonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RendervisibilitybuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
