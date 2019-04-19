import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDatesComponent } from './list-dates.component';

describe('ListDatesComponent', () => {
  let component: ListDatesComponent;
  let fixture: ComponentFixture<ListDatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
