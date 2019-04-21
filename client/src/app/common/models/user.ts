import { IDepartment } from './department';
import { IUser } from '../interfaces/user.interface';
import { IManager } from '../interfaces/manager.interface';
import { DatesItem } from '../../page/common/dates-item';

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
  contacts: object;
  photoURL: string;
  hrID: number;
  dates: DatesItem[];
  role: string;
}
