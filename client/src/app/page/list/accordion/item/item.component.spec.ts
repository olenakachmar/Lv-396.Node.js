import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ItemComponent } from './item.component';
import { ModalComponent } from '../../../modal/modal.component';
import { AccordionComponent } from '../accordion.component';

import { Task } from '../../../common/task';

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;
  let item: Task;
  item = {
    id: 0,
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
      imports: [
        AccordionModule.forRoot(),
        ModalModule.forRoot()
        ],
      declarations: [
        ModalComponent,
        AccordionComponent,
        ItemComponent
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    component.item = item;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
