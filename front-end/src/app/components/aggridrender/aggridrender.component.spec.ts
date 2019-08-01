import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AggridrenderComponent } from './aggridrender.component';

describe('AggridrenderComponent', () => {
  let component: AggridrenderComponent;
  let fixture: ComponentFixture<AggridrenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AggridrenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AggridrenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
