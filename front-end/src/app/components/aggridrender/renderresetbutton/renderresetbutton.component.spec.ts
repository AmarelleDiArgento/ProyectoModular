import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderresetbuttonComponent } from './renderresetbutton.component';

describe('RenderresetbuttonComponent', () => {
  let component: RenderresetbuttonComponent;
  let fixture: ComponentFixture<RenderresetbuttonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderresetbuttonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderresetbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
