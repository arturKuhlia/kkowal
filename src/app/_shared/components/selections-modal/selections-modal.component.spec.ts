import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionsModalComponent } from './selections-modal.component';

describe('SelectionsModalComponent', () => {
  let component: SelectionsModalComponent;
  let fixture: ComponentFixture<SelectionsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
