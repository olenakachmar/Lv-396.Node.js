import { IDepartment } from './department';
import { IUser } from '../interfaces/user.interface';
import { IManager } from '../interfaces/manager.interface';
import { DatesItem } from '../../page/common/dates-item';

export class Contact {
  constructor(
    contact_name?: string,
    contact_value?: string
  ){}
}

export  class User {
  _id: any;
  firstName: string;
  lastName: string;
  position: string;
  manager?: IManager;
  teamlead: IUser;
  department?: IDepartment;
  email: string;
  phone: string;
  contacts: Contact[];
  photoURL: string;
  hr: object;
  dates: DatesItem[];
  watched_issues?: string[];
  roles: string[];
  type: string;
}
