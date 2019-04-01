import { IUser } from '../app_interfaces/user.interface';

export class User implements IUser {
  firstName: string;
  lastName: string;
  position: string;
  manager: object;
  teamlead: object;
  department: object;
  email: string;
  phone: string;
  contacts: object;
  photoURL: string;
  hrID: number;
  date: object;
  constructor() {
    this.firstName = 'Test';
    this.lastName = 'Test';
    this.position = 'Test';
    this.manager = { field: 'Test' };
    this.teamlead = { field: 'Test' };
    this.department = { field: 'Test' };
    this.email = 'Test';
    this.phone = 'Test';
    this.contacts = { field: 'Test' };
    this.photoURL = 'Test';
    this.hrID = 0;
    this.date = { field: 'Test' };
  }
}
