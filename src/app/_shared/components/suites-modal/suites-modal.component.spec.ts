import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuitesModalComponent } from './suites-modal.component';

describe('SuitesModalComponent', () => {
  let component: SuitesModalComponent;
  let fixture: ComponentFixture<SuitesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuitesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuitesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
