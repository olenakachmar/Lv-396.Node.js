import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateSideBarInfoComponent } from './create-update-side-bar-info.component';

describe('CreateSideBarInfoComponent', () => {
  let component: CreateSideBarInfoComponent;
  let fixture: ComponentFixture<CreateSideBarInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSideBarInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSideBarInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
