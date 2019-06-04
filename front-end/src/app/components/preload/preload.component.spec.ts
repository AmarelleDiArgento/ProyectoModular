import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreloadComponent } from './preload.component';

describe('PreloadComponent', () => {
  let component: PreloadComponent;
  let fixture: ComponentFixture<PreloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
