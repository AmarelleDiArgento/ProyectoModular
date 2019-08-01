import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RendermaterialiconComponent } from './rendermaterialicon.component';

describe('RendermaterialiconComponent', () => {
  let component: RendermaterialiconComponent;
  let fixture: ComponentFixture<RendermaterialiconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RendermaterialiconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RendermaterialiconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
