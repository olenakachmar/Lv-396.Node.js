import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let item: any;
  item = {
    id: '0',
    name: 'Upcoming task name',
    excerpt: 'This content is straight in the template.',
    status: { name: 'LOW', value: 2 },
    type: { name: 'issue', value: 1 },
    date: '22/03/2019',
    author: 'Alex Somename',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ' +
      'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ' +
      'ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ModalModule.forRoot() ],
      declarations: [ ModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    component.item = item;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
