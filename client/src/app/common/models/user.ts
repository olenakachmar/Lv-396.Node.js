import { IDepartment } from './department';

export  class User {
  _id: any;
  firstName: string;
  lastName: string;
  position: string;
  manager?: any;
  teamlead: any;
  department?: IDepartment;
  email: string;
  phone: string;
  contacts: object;
  photoURL: string;
  hrID: number;
  dates: any;
  role: string;
}
