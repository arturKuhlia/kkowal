import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionsListComponent } from './selections-list.component';

describe('SelectionsListComponent', () => {
  let component: SelectionsListComponent;
  let fixture: ComponentFixture<SelectionsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
