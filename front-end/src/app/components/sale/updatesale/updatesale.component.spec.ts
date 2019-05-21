import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatesaleComponent } from './updatesale.component';

describe('UpdatesaleComponent', () => {
  let component: UpdatesaleComponent;
  let fixture: ComponentFixture<UpdatesaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatesaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatesaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
