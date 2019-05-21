import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatepodComponent } from './updatepod.component';

describe('UpdatepodComponent', () => {
  let component: UpdatepodComponent;
  let fixture: ComponentFixture<UpdatepodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatepodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatepodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
