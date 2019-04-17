import { IDepartment } from './department';

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
  manager?: any;
  teamlead: object;
  department?: IDepartment;
  email: string;
  phone: string;
  contacts: Contact[];
  photoURL: string;
  hrID: number;
  dates: any;
  role: string;
  type: string;
}
