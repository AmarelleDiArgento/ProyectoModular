import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RendersettingbuttonComponent } from './rendersettingbutton.component';

describe('RendersettingbuttonComponent', () => {
  let component: RendersettingbuttonComponent;
  let fixture: ComponentFixture<RendersettingbuttonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RendersettingbuttonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RendersettingbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
