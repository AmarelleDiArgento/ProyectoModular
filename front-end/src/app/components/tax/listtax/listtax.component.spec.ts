import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListtaxComponent } from './listtax.component';

describe('ListtaxComponent', () => {
  let component: ListtaxComponent;
  let fixture: ComponentFixture<ListtaxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListtaxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListtaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
