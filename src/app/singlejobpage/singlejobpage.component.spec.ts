import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglejobpageComponent } from './singlejobpage.component';

describe('SinglejobpageComponent', () => {
  let component: SinglejobpageComponent;
  let fixture: ComponentFixture<SinglejobpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinglejobpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglejobpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
