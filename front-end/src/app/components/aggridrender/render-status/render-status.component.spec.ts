import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderStatusComponent } from './render-status.component';

describe('RenderStatusComponent', () => {
  let component: RenderStatusComponent;
  let fixture: ComponentFixture<RenderStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
