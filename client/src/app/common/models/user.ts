import { IDepartment } from './department';
import { IManager } from '../interfaces/manager.interface';

export  class User {
  _id: any;
  firstName: string;
  lastName: string;
  position: string;
  manager?: IManager;
  teamlead: User;
  department?: IDepartment;
  email: string;
  phone: string;
  contacts: object;
  photoURL: string;
  hrID: number;
  dates: any;
  role: string;
}
