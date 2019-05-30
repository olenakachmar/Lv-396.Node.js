import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateSideBarInfoComponent } from './create-update-side-bar-info.component';

describe('CreateSideBarInfoComponent', () => {
  let component: CreateUpdateSideBarInfoComponent;
  let fixture: ComponentFixture<CreateUpdateSideBarInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUpdateSideBarInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateSideBarInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
