import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBarInfoComponent } from './user-bar-info.component';

describe('UserBarInfoComponent', () => {
  let component: UserBarInfoComponent;
  let fixture: ComponentFixture<UserBarInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserBarInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBarInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
