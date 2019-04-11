import {IDepartment} from './department';

export  class User {
  _id: any;
  firstName: string;
  lastName: string;
  position: string;
  manager?: any;
  teamlead: object;
  department?: IDepartment;
  email: string;
  phone: string;
  contacts: object;
  photoURL: string;
  hrID: number;
  date: object;
}
