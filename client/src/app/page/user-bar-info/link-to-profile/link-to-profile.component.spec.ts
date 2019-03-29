import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkToProfileComponent } from './link-to-profile.component';

describe('LinkToProfileComponent', () => {
  let component: LinkToProfileComponent;
  let fixture: ComponentFixture<LinkToProfileComponent>;
  const label = '';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkToProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkToProfileComponent);
    component = fixture.componentInstance;
    component.label = label;
    component.info = label;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
