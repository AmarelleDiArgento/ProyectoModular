import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RendereditbuttonComponent } from './rendereditbutton.component';

describe('RendereditbuttonComponent', () => {
  let component: RendereditbuttonComponent;
  let fixture: ComponentFixture<RendereditbuttonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RendereditbuttonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RendereditbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
