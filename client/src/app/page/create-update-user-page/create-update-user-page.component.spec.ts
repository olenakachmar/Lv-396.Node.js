import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateUserPageComponent } from './create-update-user-page.component';

describe('CreateUserPageComponent', () => {
  let component: CreateUpdateUserPageComponent;
  let fixture: ComponentFixture<CreateUpdateUserPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUpdateUserPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateUserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
